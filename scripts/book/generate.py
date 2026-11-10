"""Local, dependency-free course -> LaTeX pipeline. Never writes into web/static.

PPTX supplies public content; private Markdown supplies interleaved explanations.
Worksheets are read from Astro's rendered HTML, not scraped from the network.
Presentation/worksheet inputs are read only; private prose imports are synced.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass, field
from hashlib import sha256
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import posixpath
import re
import shutil
import subprocess
import sys
from urllib.parse import urljoin, urlsplit
from xml.etree import ElementTree as ET
from zipfile import ZipFile
from presentation import Text, Table, Diagram, CodeBlock, read_slide, native_table, native_diagram
from commentary import Section, digest, initial_body, material_markers, prose_source, read as read_commentary, synchronize, render as render_commentary
from terminology import Terminology

ROOT = Path(__file__).resolve().parents[2]
TERMS = Terminology(ROOT / "book/terms.json")
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
REL = "{http://schemas.openxmlformats.org/package/2006/relationships}"
TEXT_EXTENSIONS = {".py", ".sql", ".json", ".md", ".txt", ".toml", ".yaml", ".yml", ".html"}
EXCLUDED_DIRS = {"__pycache__", ".venv", "venv", "node_modules", ".git", ".pytest_cache", "output"}


def tex(value: str) -> str:
    replacements = {"\\": r"\textbackslash{}", "{": r"\{", "}": r"\}", "&": r"\&",
                    "%": r"\%", "$": r"\$", "#": r"\#", "_": r"\_", "~": r"\textasciitilde{}",
                    "^": r"\textasciicircum{}", "→": r"\ensuremath{\rightarrow}",
                    "←": r"\ensuremath{\leftarrow}", "↔": r"\ensuremath{\leftrightarrow}",
                    "↓": r"\ensuremath{\downarrow}", "↑": r"\ensuremath{\uparrow}",
                    "≤": r"\ensuremath{\leq}", "≥": r"\ensuremath{\geq}",
                    "≠": r"\ensuremath{\neq}", "✓": "[OK]", "✔": "[OK]", "✗": "[X]", "❌": "[X]",
                    "\u200b": "", "\u00a0": "~"}
    return "".join(replacements.get(char, char) for char in str(value))


def prose_escape(value: str) -> str:
    escaped = tex(value).replace("/", r"/\allowbreak{}").replace(r"\_", r"\_\allowbreak{}")
    escaped = escaped.replace("(", r"(\allowbreak{}")
    return escaped.replace("=", r"=\allowbreak{}")


def prose(value: str) -> str:
    """Apply the editable lexicon to prose; preserve URLs, paths and literals."""
    protected = re.compile(r'''https?://[^\s<>]+|(?:[\w./\\-]+\.(?:py|sql|json|csv|txt|md|toml|ya?ml|html|pptx|pdf))\b|"[ \t]*"|'[ \t]*' ''', re.X)
    result, end = [], 0
    for match in protected.finditer(value):
        result.append(TERMS.render(value[end:match.start()], prose_escape))
        token = match[0]
        result.append(inline_code(token) if token[0] in "\"'" else prose_escape(token))
        end = match.end()
    result.append(TERMS.render(value[end:], prose_escape))
    return "".join(result)


def inline(value: str) -> str:
    """Small, escaped Markdown inline subset; no arbitrary TeX from source text."""
    pattern = r"(`[^`\n]+`|\*\*[^*\n]+\*\*|\[[^\]\n]+\]\(https?://[^)\s]+\)|https?://[^\s]+)"
    result = []
    for part in re.split(pattern, value):
        if part.startswith("`") and part.endswith("`"):
            result.append(inline_code(part[1:-1]))
        elif part.startswith("**") and part.endswith("**"):
            result.append(r"\textbf{" + prose(part[2:-2]) + "}")
        elif match := re.fullmatch(r"\[([^]]+)\]\((https?://[^)]+)\)", part):
            result.append(r"\href{" + tex(match[2]) + "}{" + prose(match[1]) + "}")
        elif part.startswith(("https://", "http://")):
            result.append(r"\url{" + part.replace("%", r"\%") + "}")
        else:
            result.append(prose(part))
    return "".join(result)


def inline_code(value: str) -> str:
    # Inline API names can wrap at camel-case boundaries without inserting a
    # hyphen into the identifier. Block listings retain their literal source.
    if re.fullmatch(r'''"[ \t]*"|'[ \t]*' ''', value, re.X):
        quote = r"\textquotedbl{}" if value[0] == '"' else r"\textquotesingle{}"
        spaces = "".join(r"\textvisiblespace{}" if char == " " else r"\textvisiblespace{}" * 4 for char in value[1:-1])
        return r"\texttt{" + quote + spaces + quote + "}"
    escaped = "".join((r"\allowbreak{}" if index and char.isupper() and value[index - 1].islower() else "")
                      + tex(char) + (r"\allowbreak{}" if char in ";/._,=:-?&[]{}()" else "")
                      for index, char in enumerate(value))
    return r"\texttt{" + escaped + "}"


def table_inline(value: str) -> str:
    # Technical tokens must wrap at their actual separators rather than using
    # hyphenation intended for Slovak words (or changing straight code quotes).
    tokens = re.compile(r'''"[ \t]*"|'[ \t]*'|https?://[^\s]+|[^\s]*[_\[\]{}=][^\s]*|\?[^\s]+|\w+(?:\.\w+)+''')
    output, end = [], 0
    for match in tokens.finditer(value):
        output.append(inline(value[end:match.start()]))
        token = match[0]
        output.append(inline(token) if token.startswith(("http://", "https://")) else inline_code(token))
        end = match.end()
    output.append(inline(value[end:]))
    return "".join(output)


def listing_language(value: str, hint: str = "") -> str:
    """Use source language metadata when available; leave output unhighlighted.

    PPTX fragments have no formal language metadata. Recognize only clear
    Python, SQL and shell constructs there, without parsing or executing code.
    Only fixed names from this function can become LaTeX listing options.
    """
    languages = {"python": "Python", "py": "Python", "sql": "SQL",
                 "bash": "bash", "sh": "bash", "shell": "bash", "console": "bash",
                 "html": "HTML", "xml": "XML", "json": "bookjson"}
    if hint:
        return languages.get(hint.strip().lower(), "")
    if re.search(r"^\s*(?:SELECT\b.*\bFROM\b|INSERT INTO\b|UPDATE\b.*\bSET\b|DELETE FROM\b|CREATE TABLE\b)", value, re.M):
        return "SQL"
    if re.search(r"^\s*(?:python3?|pip3?|uv|git|curl|pytest)\s+", value, re.M):
        return "bash"
    if re.search(r"^\s*(?:(?:async\s+)?def\s|class\s|from\s+\S+\s+import\b|import\s|"
                 r"(?:if|elif|for|while|with|except)\b[^\n]*:|(?:print\(|assert\s|raise\s|return\s)|"
                 r"[A-Za-z_]\w*(?:\[[^\n]*?\]|\.\w+)*\s*=(?!=))", value, re.M):
        return "Python"
    return ""


def code(value: str, caption: str = "", label: str = "", language: str = "", numbered: bool = True) -> str:
    # Raw data belongs to a verbatim environment, never to the LaTeX parser.
    if r"\end{Code}" in value:
        raise ValueError("Zdroj obsahuje vyhradený terminátor \\end{Code}.")
    # The visible-space notation in worksheet 04 is a printed marker, not an
    # actual input byte. Use an explicit label supported by portable code fonts.
    heading = ""
    if caption:
        heading = "\n\\begingroup\n\\needspace{4\\baselineskip}\n\\captionof{listing}{" + inline(caption) + "}"
        if label:
            heading += "\\label{" + label + "}"
        heading += "\n\\nopagebreak\n"
    options = "[language={" + listing_language(value, language) + "}" + ("" if numbered else ",numbers=none") + "]"
    ending = "\\endgroup\n" if caption else ""
    return heading + "\n\\begin{Code}" + options + "\n" + value.rstrip().replace("␠", "[SPACE]") + "\n\\end{Code}\n" + ending


def markdown(value: str, level: int = 2, omit_title: bool = False, omit_intro_headings: bool = False) -> str:
    lines = value.splitlines()
    if omit_title:
        first = next((index for index, line in enumerate(lines) if line.strip()), None)
        if first is not None and re.match(r"^#\s+", lines[first]):
            del lines[first]
    if omit_intro_headings:
        while True:
            first = next((index for index, line in enumerate(lines) if line.strip()), None)
            if first is None or not re.match(r"^#{1,6}\s+", lines[first]):
                break
            del lines[first]
    output, paragraph, listing = [], [], []
    in_code, language, list_kind = False, "", None

    def flush():
        if paragraph:
            output.append(inline(" ".join(paragraph)) + "\n\n")
            paragraph.clear()

    def end_list():
        nonlocal list_kind
        if list_kind:
            output.append(f"\\end{{{list_kind}}}\n")
            list_kind = None

    for line in lines:
        if line.strip().startswith("```"):
            flush()
            end_list()
            if in_code:
                output.append(code("\n".join(listing), language=language))
                listing.clear()
            else:
                language = line.strip()[3:]
            in_code = not in_code
        elif in_code:
            listing.append(line)
        elif not line.strip():
            flush()
            end_list()
        elif heading := re.match(r"^(#{1,6})\s+(.+)$", line):
            flush()
            end_list()
            command = ["section", "subsection", "subsubsection"][min(level + len(heading[1]) - 2, 2)]
            output.append(f"\\{command}*{{{inline(heading[2])}}}\n")
        elif item := re.match(r"^\s*(?:[-*]|\d+\.)\s+(.+)$", line):
            flush()
            kind = "enumerate" if re.match(r"\s*\d+\.", line) else "itemize"
            if kind != list_kind:
                end_list()
                output.append(f"\\begin{{{kind}}}\n")
                list_kind = kind
            output.append(r"\item " + inline(item[1]) + "\n")
        elif re.match(r"^\s*---+\s*$", line):
            flush()
            end_list()
        else:
            paragraph.append(line.strip())
    if in_code:
        raise ValueError(f"Neukončený Markdown blok kódu ({language}).")
    flush()
    end_list()
    return "".join(output)


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Node | str] = field(default_factory=list)

    def text(self) -> str:
        return "".join(child if isinstance(child, str) else child.text() for child in self.children)

    def find(self, tag: str) -> list[Node]:
        found = [self] if self.tag == tag else []
        for child in self.children:
            if isinstance(child, Node):
                found.extend(child.find(tag))
        return found


class PageParser(HTMLParser):
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self, source: str):
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def visible(node: Node) -> bool:
    return node.attrs.get("data-lang", "sk") != "en" and node.tag not in {"script", "style", "nav", "button", "svg"}


def visible_text(node: Node) -> str:
    if not visible(node):
        return ""
    if node.tag == "br":
        return "\n"
    content = "".join(child if isinstance(child, str) else visible_text(child) for child in node.children)
    # highlightedCode() renders separate display:block spans, without literal
    # newline bytes between them. Preserve those lines and their indentation.
    return content + ("\n" if "code-line" in node.attrs.get("class", "").split() else "")


def html_tex(node: Node | str, base_url: str) -> str:
    if isinstance(node, str):
        parts = re.split(r'''("[ \t]*"|'[ \t]*')''', node)
        return prose("".join(part if index % 2 else re.sub(r"\s+", " ", part) for index, part in enumerate(parts)))
    if not visible(node) or "back-inline" in node.attrs.get("class", "") or node.attrs.get("data-book-skip-heading") == "true":
        return ""
    content = lambda: "".join(html_tex(child, base_url) for child in node.children)
    if node.tag == "h1":
        return ""  # Chapter title already comes from shared metadata.
    if node.tag in {"h2", "h3", "h4", "h5", "h6"}:
        if "data-book-exercise" in node.attrs:
            title = re.sub(r"^Úloha\s+\d+\s*(?:[—–-]\s*)?", "", visible_text(node).strip())
            return "\n\\exerciseheading{" + node.attrs["data-book-exercise"] + "}{" + inline(title) + "}\n"
        command = "subsection" if node.tag == "h2" else "subsubsection"
        return f"\n\\{command}*{{{inline(visible_text(node).strip())}}}\n"
    if node.tag == "pre":
        hint = node.attrs.get("aria-label", "")
        for element in [node, *node.find("code")]:
            for name in element.attrs.get("class", "").split():
                if name.startswith("language-"):
                    hint = name.removeprefix("language-")
        if "expected-output" in node.attrs.get("class", "").split():
            hint = "text"
        return code(visible_text(node), node.attrs.get("data-book-caption", ""), node.attrs.get("data-book-label", ""), hint)
    if node.tag == "code":
        return inline_code(visible_text(node))
    if node.tag in {"strong", "b", "em", "i"}:
        return (r"\textbf{" if node.tag in {"strong", "b"} else r"\emph{") + content() + "}"
    if node.tag == "a":
        href = node.attrs.get("href", "")
        label = content()
        if not href or href.startswith("#"):
            return label
        if href.startswith("/"):
            prefix = urlsplit(base_url).path.rstrip("/")
            if prefix and href.startswith(prefix + "/"):
                href = href[len(prefix):]
            href = href.lstrip("/")
        return r"\href{" + tex(urljoin(base_url.rstrip("/") + "/", href)) + "}{" + label + "}"
    if node.tag in {"ul", "ol"}:
        kind = "itemize" if node.tag == "ul" else "enumerate"
        return f"\n\\begin{{{kind}}}\n" + content() + f"\n\\end{{{kind}}}\n"
    if node.tag == "li":
        return r"\item " + content() + "\n"
    if node.tag == "table":
        rows = [row for row in node.find("tr") if visible(row)]
        cells = [[cell for cell in row.children if isinstance(cell, Node) and cell.tag in {"td", "th"} and visible(cell)] for row in rows]
        cells = [row for row in cells if row]
        if not cells:
            return ""
        count = max(sum(int(cell.attrs.get("colspan", "1")) for cell in row) for row in cells)
        width = f"\\dimexpr(\\linewidth-{2 * (count - 1)}\\tabcolsep)/{count}\\relax"
        spec = "@{}" + (r">{\raggedright\arraybackslash}p{" + width + "}") * count + "@{}"
        output = ["\n{\\small\n\\begin{longtable}{" + spec + "}\n"]
        if node.attrs.get("data-book-caption"):
            output.append("\\caption{" + inline(node.attrs["data-book-caption"]) + "}\\label{" + node.attrs["data-book-label"] + r"}\\" + "\n")
        output.append("\\toprule\n")
        for index, row in enumerate(cells):
            entries = []
            for cell in row:
                entries.append(html_tex(Node("span", children=cell.children), base_url).strip())
                entries.extend([""] * (int(cell.attrs.get("colspan", "1")) - 1))
            entries.extend([""] * (count - len(entries)))
            output.append(" & ".join("{" + entry + "}" for entry in entries) + r" \\" + "\n")
            if index == 0 and any(cell.tag == "th" for cell in row):
                output.append("\\midrule\n\\endfirsthead\n\\toprule\n")
                output.append(" & ".join("{" + entry + "}" for entry in entries) + r" \\" + "\n\\midrule\n\\endhead\n")
        output.append("\\bottomrule\n\\end{longtable}\n}\n")
        return "".join(output)
    if node.tag == "br":
        return r"\newline{}"
    if node.tag == "hr":
        return "\n\\medskip\n"
    if node.tag == "dt":
        return "\n\\par\\textbf{" + content() + "} "
    if node.tag in {"p", "section", "div", "article", "dd", "details", "summary"}:
        return "\n" + content() + "\n\n"
    return content()


def page_content(source: Path, base_url: str, expected_tasks: int | None = None) -> str:
    parser = PageParser(source.read_text(encoding="utf-8"))
    mains = parser.root.find("main")
    if len(mains) != 1:
        raise ValueError(f"Očakávaný jeden main v {source}, nájdené {len(mains)}.")
    main = mains[0]
    caption = ""
    counters = {"pre": 0, "table": 0, "exercise": 0}
    slug = re.sub(r"[^a-z0-9-]", "-", source.parent.name)

    def annotate(node: Node):
        nonlocal caption
        if not visible(node):
            return
        if node.tag in {"h2", "h3", "h4"}:
            caption = visible_text(node).strip()
        if node.tag == "section" and "worksheet-task" in node.attrs.get("class", "").split():
            counters["exercise"] += 1
            heading = next(iter(node.find("h2")), None)
            if heading is not None:
                heading.attrs["data-book-exercise"] = f"exercise-{slug}-{counters['exercise']}"
        if node.tag in {"pre", "table"}:
            counters[node.tag] += 1
            node.attrs["data-book-caption"] = caption
            node.attrs["data-book-label"] = f"{node.tag}-{slug}-{counters[node.tag]}"
        for child in node.children:
            if isinstance(child, Node):
                annotate(child)

    annotate(main)
    if expected_tasks is not None:
        tasks = [node for node in main.find("section") if "worksheet-task" in node.attrs.get("class", "").split()]
        if len(tasks) != expected_tasks:
            raise ValueError(f"{source}: očakávaných {expected_tasks} úloh, nájdených {len(tasks)}.")
    if expected_tasks is not None:
        # Each task already has its own numbered heading within the named
        # practical section. A generic group heading only stacks another title.
        for heading in main.find("h2"):
            if "data-book-exercise" not in heading.attrs and visible_text(heading).strip() == "Úlohy":
                heading.attrs["data-book-skip-heading"] = "true"
    return html_tex(main, base_url)


def relationships(archive: ZipFile, part: str) -> dict[str, str]:
    relpath = posixpath.join(posixpath.dirname(part), "_rels", posixpath.basename(part) + ".rels")
    if relpath not in archive.namelist():
        return {}
    root = ET.fromstring(archive.read(relpath))
    return {rel.attrib["Id"]: posixpath.normpath(posixpath.join(posixpath.dirname(part), rel.attrib["Target"]))
            if not rel.attrib["Target"].startswith("/") else rel.attrib["Target"].lstrip("/")
            for rel in root if rel.attrib.get("TargetMode") != "External"}


def slide_order(archive: ZipFile) -> list[str]:
    rels = relationships(archive, "ppt/presentation.xml")
    doc = ET.fromstring(archive.read("ppt/presentation.xml"))
    return [rels[item.attrib[f"{{{NS['r']}}}id"]] for item in doc.findall("p:sldIdLst/p:sldId", NS)]


def paragraphs(element: ET.Element) -> list[str]:
    result = []
    for paragraph in element.findall(".//a:p", NS):
        parts = []
        for item in paragraph.iter():
            if item.tag == f"{{{NS['a']}}}t":
                parts.append(item.text or "")
            elif item.tag == f"{{{NS['a']}}}br":
                parts.append("\n")
        result.append("".join(parts))
    return result


def speaker_notes(archive: ZipFile, slide: str) -> str:
    target = next((part for part in relationships(archive, slide).values() if "/notesSlides/" in part), None)
    if not target:
        return ""
    note = ET.fromstring(archive.read(target))
    result = []
    for shape in note.findall(".//p:sp", NS):
        placeholder = shape.find(".//p:ph", NS)
        if placeholder is not None and placeholder.attrib.get("type") == "body":
            result.extend(paragraphs(shape))
    return "\n\n".join(line for line in result if line.strip())


def matching_notes(public: ZipFile, private: ZipFile) -> bool:
    # Check order and all visual resources, not merely slide count or file name.
    visual = ("ppt/slides/slide", "ppt/media/", "ppt/slideLayouts/slideLayout", "ppt/slideMasters/slideMaster", "ppt/theme/")
    names = {name for name in public.namelist() if name.startswith(visual)}
    other = {name for name in private.namelist() if name.startswith(visual)}
    return slide_order(public) == slide_order(private) and names == other and all(visual_bytes(public, name) == visual_bytes(private, name) for name in names)


def matching_note_slides(public: ZipFile, private: ZipFile) -> set[str]:
    slides = slide_order(public)
    if slides != slide_order(private):
        return set()
    resources = ("ppt/media/", "ppt/slideLayouts/slideLayout", "ppt/slideMasters/slideMaster", "ppt/theme/")
    names = {name for name in public.namelist() if name.startswith(resources)}
    if names != {name for name in private.namelist() if name.startswith(resources)}:
        return set()
    if any(visual_bytes(public, name) != visual_bytes(private, name) for name in names):
        return set()
    return {slide for slide in slides if visual_bytes(public, slide) == visual_bytes(private, slide)}


def visual_bytes(archive: ZipFile, name: str) -> bytes:
    data = archive.read(name)
    if not name.endswith(".xml"):
        return data
    doc = ET.fromstring(data)
    # PptxGenJS previously renumbered shape IDs when adding notes. IDs themselves
    # do not change a picture; preserve connector references through the same map.
    ids = {shape.attrib["id"]: str(index) for index, shape in enumerate(doc.findall(".//p:cNvPr", NS))}
    for item in doc.iter():
        if item.tag == f"{{{NS['p']}}}cNvPr" or item.tag in {f"{{{NS['a']}}}stCxn", f"{{{NS['a']}}}endCxn"}:
            if item.attrib.get("id") in ids:
                item.set("id", ids[item.attrib["id"]])
    return ET.tostring(doc)


def slide_fingerprints(archive: ZipFile) -> dict[str, str]:
    """Bind editable prose to visual content, order and shared visual resources."""
    slides = slide_order(archive)
    resources = ("ppt/media/", "ppt/slideLayouts/slideLayout", "ppt/slideMasters/slideMaster", "ppt/theme/")
    context = json.dumps({"slides": slides, "resources": {
        name: sha256(visual_bytes(archive, name)).hexdigest()
        for name in sorted(archive.namelist()) if name.startswith(resources)
    }}, sort_keys=True).encode()
    return {slide: sha256(context + visual_bytes(archive, slide)).hexdigest() for slide in slides}


def lecture_sections(profile: dict, titles: list[str]) -> dict[int, str]:
    """Resolve editorial boundaries by unique source title, never slide number."""
    if not isinstance(profile, dict):
        raise ValueError("Knižné členenie kapitoly musí byť objekt.")
    result, previous = {}, -1
    entries = profile.get("lectureSections", [])
    if not isinstance(entries, list):
        raise ValueError("lectureSections musí byť zoznam tematických častí.")
    for entry in entries:
        if not isinstance(entry, dict) or any(not isinstance(entry.get(key), str) or not entry[key].strip() for key in ("before", "title")):
            raise ValueError("Tematická časť potrebuje neprázdny názov a kotvu before.")
        matches = [index for index, title in enumerate(titles) if title == entry["before"]]
        if len(matches) != 1:
            raise ValueError(f"Kotva tematickej časti {entry['before']!r}: očakávaná jedna snímka, nájdených {len(matches)}. Aktualizujte knižné členenie.")
        position = matches[0]
        if position <= previous:
            raise ValueError("Tematické časti musia nasledovať v poradí prezentácie bez opakovania kotiev.")
        result[position + 1] = entry["title"]
        previous = position
    return result


class Book:
    def __init__(self, metadata: dict, config: dict, output: Path, student: bool):
        self.metadata, self.config, self.output, self.student = metadata, config, output, student
        self.sources: dict[str, dict] = {}
        self.issues: list[str] = []
        self.stats: list[dict] = []
        self.coverage: dict[str, dict] = {}
        self.references: dict[str, dict] = {}
        self.commentaries: dict[int, tuple[Path, dict[int, Section]]] = {}
        self.reviews = {}
        self.chapter_profiles = {}
        if structure_source := config.get("chapterStructure"):
            structure_path = (ROOT / structure_source).resolve()
            self.source(structure_path, "chapter-structure")
            self.chapter_profiles = json.loads(structure_path.read_text(encoding="utf-8-sig"))
            if not isinstance(self.chapter_profiles, dict):
                raise ValueError("Knižné členenie musí byť objekt s číslami kapitol.")
        review_path = ROOT / "book/local/review.json"
        if review_path.exists():
            self.reviews = json.loads(review_path.read_text(encoding="utf-8"))
        self.base_url = config.get("sourceBaseUrl", "https://marek-horvath.github.io/python/")

    def source(self, path: Path, category: str) -> str:
        relative = path.relative_to(ROOT).as_posix()
        data = path.read_bytes()
        self.sources[relative] = {"sha256": sha256(data).hexdigest(), "bytes": len(data), "category": category}
        return relative

    def reviewed(self, key: str, paths: list[Path]) -> bool:
        fingerprint = sha256("\n".join(f"{path.relative_to(ROOT).as_posix()}:{sha256(path.read_bytes()).hexdigest()}"
                                      for path in sorted(paths)).encode()).hexdigest()
        record = self.reviews.get(key, {})
        if record.get("sha256") == fingerprint and record.get("reviewed") is True:
            return True
        self.issues.append(f"{key}: obsah potrebuje redakčnú kontrolu; aktuálny sha256 = {fingerprint}")
        return False

    def text_files(self, directory: Path) -> list[Path]:
        if not directory.exists():
            return []
        return [path for path in sorted(directory.rglob("*")) if path.is_file() and not path.is_symlink()
                and path.suffix.lower() in TEXT_EXTENSIONS and not set(path.relative_to(directory).parts) & EXCLUDED_DIRS
                and path.name not in {"requirements.txt", "package-lock.json"} and not path.name.startswith(".")]

    def listings(self, paths: list[Path], category: str) -> str:
        result = []
        for path in paths:
            relative = self.source(path, category)
            # The path and numbered listing caption already identify the file.
            # A separate filename heading only stacks another title above it.
            result.append("\\sourcefile{" + relative + "}\n")
            text = path.read_text(encoding="utf-8-sig")
            label = "listing-" + sha256(relative.encode()).hexdigest()[:12]
            result.append(markdown(text, 3, omit_intro_headings=True) if path.suffix == ".md" else code(text, path.name, label, path.suffix.lstrip(".")))
        return "".join(result)

    def add_references(self, text: str) -> None:
        # Only metadata actually present in the teaching sources is recorded.
        # No publication dates, access dates or authors are fabricated.
        for line in text.splitlines():
            for match in re.finditer(r"https?://[^\s<>]+", line):
                url = match[0].rstrip(").,;")
                prefix = line[:match.start()].strip(" -*\t—–")
                markdown_label = re.search(r"\[([^]]+)\]\($", prefix)
                title = markdown_label[1] if markdown_label else prefix.rstrip(" —–-:")
                title = title.replace("`", "").strip() or url
                key = "ref-" + sha256(url.encode()).hexdigest()[:16]
                self.references.setdefault(key, {"title": title, "url": url})

    def prepare_commentary(self, week: dict, presentation: dict) -> tuple[Path, dict[int, Section]]:
        number = week["number"]
        if number in self.commentaries:
            return self.commentaries[number]
        path = ROOT / presentation["source"]["sk"]
        private_path = path.with_name(path.stem + "-commented.pptx")
        text_path = ROOT / "book/local/commentary" / f"{number:02}commentary.md"
        # Once extracted, the Markdown works on another computer without the
        # private PPTX. Missing input must never erase an existing explanation.
        if text_path.exists() and not private_path.exists():
            result = read_commentary(text_path)[1]
            incoming = []
            with ZipFile(path) as public:
                fingerprints = slide_fingerprints(public)
                slides = slide_order(public)
                for index, section in result.items():
                    if index <= len(slides) and section.visual == fingerprints[slides[index - 1]]:
                        converted = read_slide(public, slides[index - 1])
                        if len(material_markers(section.body)) != len(converted.items):
                            body = initial_body(prose_source(section.body), converted.items)
                            incoming.append(Section(section.number, section.part, section.visual, section.notes,
                                                    digest(body), section.title, body))
                            continue
                    incoming.append(section)
            result, issues = synchronize(text_path, f"{number:02}: {week['title']}", incoming)
            self.issues.extend(issues)
        else:
            incoming = []
            with ZipFile(path) as public:
                public_slides = slide_order(public)
                public_hashes = slide_fingerprints(public)
                private = ZipFile(private_path) if private_path.exists() else None
                try:
                    private_slides = slide_order(private) if private else []
                    private_hashes = slide_fingerprints(private) if private else {}
                    for index in range(max(len(public_slides), len(private_slides))):
                        part = public_slides[index] if index < len(public_slides) else private_slides[index]
                        converted = read_slide(public if index < len(public_slides) else private, part)
                        note_part = private_slides[index] if index < len(private_slides) else None
                        notes = speaker_notes(private, note_part) if note_part else ""
                        # Retain even stale notes in Markdown, but their old
                        # visual fingerprint prevents attaching them to new code.
                        visual = private_hashes[note_part] if notes else public_hashes.get(part, private_hashes.get(part))
                        body = initial_body(notes, converted.items)
                        incoming.append(Section(index + 1, note_part if notes else part, visual,
                                                digest(notes), digest(body), converted.title, body))
                finally:
                    if private:
                        private.close()
            result, issues = synchronize(text_path, f"{number:02}: {week['title']}", incoming)
            self.issues.extend(issues)
        self.commentaries[number] = (text_path, result)
        return text_path, result

    def lecture(self, week: dict, presentation: dict) -> tuple[str, int, int]:
        path = ROOT / presentation["source"]["sk"]
        self.source(path, "presentation")
        prose = ROOT / "book/local/chapters" / f"{week['number']:02}.md"
        if prose.exists():
            self.source(prose, "edited-chapter")
            self.reviewed(f"chapter-{week['number']:02}", [path, prose])
            with ZipFile(path) as public:
                count = len(slide_order(public))
            return markdown(prose.read_text(encoding="utf-8"), 2), count, 0
        output, notes_count = [], 0
        commentary_path, sections = None, {}
        if self.config.get("notes", True) and (not self.student or self.config.get("studentCommentary", True)):
            commentary_path, sections = self.prepare_commentary(week, presentation)
            self.source(commentary_path, "lecture-commentary")
            private_path = path.with_name(path.stem + "-commented.pptx")
            if private_path.exists():
                self.source(private_path, "speaker-notes-origin")
        with ZipFile(path) as public:
            slides = slide_order(public)
            converted_slides = [read_slide(public, slide) for slide in slides]
            profile = self.chapter_profiles.get(str(week["number"]), {})
            try:
                boundaries = lecture_sections(profile, [slide.title for slide in converted_slides])
            except ValueError as error:
                raise ValueError(f"Kapitola {week['number']:02}: {error}") from error
            fingerprints = slide_fingerprints(public) if sections else {}
            missing, stale = [], []
            for index, (slide, converted) in enumerate(zip(slides, converted_slides), 1):
                key = f"{week['number']:02}-{index:03}"
                self.coverage[key] = converted.coverage()
                if index in boundaries:
                    label = sha256(converted.title.encode()).hexdigest()[:10]
                    output.append("\\section{" + inline(boundaries[index]) + "}\n" + f"\\label{{topic-{week['number']:02}-{label}}}\n")
                    self.coverage[key]["heading_merged_into"] = boundaries[index]
                # The source title is already the book chapter's title. Keep
                # its note/content and anchor, without printing it a second time.
                duplicate_title = index == 1 and converted.title == week.get("title")
                if not duplicate_title and index not in boundaries:
                    output.append(r"\subsection*{" + inline(converted.title) + "}\n")
                output.append(f"\\label{{slide-{week['number']:02}-{index}}}\n")
                materials = []
                for item_index, item in enumerate(converted.items):
                    label = f"material-{key}-{item_index}"
                    if isinstance(item, Table):
                        materials.append(native_table(item, table_inline, inline(converted.title), label))
                    elif isinstance(item, Diagram):
                        materials.append(native_diagram(item, table_inline, inline(converted.title), label))
                    elif isinstance(item, CodeBlock):
                        caption = converted.title + (" — " + item.caption if item.caption else " — výstup" if item.output else "")
                        materials.append(code(item.text, caption, label, "text" if item.output else "", not item.output))
                    elif item.role == "code" or (item.mono and "\n" in item.text):
                        materials.append(code(item.text, converted.title, label))
                    elif item.role == "label":
                        materials.append("\n{\\small\\itshape " + tex(item.text) + "}\\par\n")
                    elif any(paragraph.bullet for paragraph in item.paragraphs):
                        materials.append("\\begin{itemize}\n" + "".join("\\item " + inline(paragraph.text) + "\n" for paragraph in item.paragraphs if paragraph.text.strip()) + "\\end{itemize}\n")
                    else:
                        render = inline_code if item.mono else inline
                        if item.mono:
                            content = render(item.text).replace("\n", "\\newline{}\n")
                        else:
                            content = render(" ".join(item.text.splitlines()))
                            if item.bold:
                                content = r"\textbf{" + content + "}"
                        materials.append(content + "\n\n")
                section = sections.get(index)
                if section and section.part == slide and section.visual == fingerprints[slide]:
                    try:
                        content, has_prose = render_commentary(section.body, materials, markdown)
                    except ValueError as error:
                        raise ValueError(f"{commentary_path.name}, slajd {index}: {error}") from error
                    output.append(content)
                    if has_prose:
                        notes_count += 1
                    else:
                        missing.append(index)
                else:
                    output.extend(materials)
                    (stale if section else missing).append(index)
            if commentary_path:
                if missing:
                    self.issues.append(f"Prednáška {week['number']:02}: chýba výklad pre slajdy {', '.join(map(str, missing))}; doplňte {commentary_path.name}.")
                if stale:
                    self.issues.append(f"Prednáška {week['number']:02}: výklad pre slajdy {', '.join(map(str, stale))} nezodpovedá aktuálnym snímkam; text zostal v {commentary_path.name}, do knihy sa neimportoval.")
        paths = [path] + ([commentary_path] if commentary_path else [])
        self.reviewed(f"chapter-{week['number']:02}", paths)
        return "".join(output), len(slides), notes_count

    def chapter(self, week: dict) -> str:
        number = week["number"]
        presentation = next(item for item in self.metadata["presentations"] if item["weekNumber"] == number)
        exercise = next(item for item in self.metadata["exercises"] if item["weekNumber"] == number)
        profile = self.chapter_profiles.get(str(number), {})
        if not isinstance(profile, dict):
            raise ValueError(f"Kapitola {number:02}: knižné členenie musí byť objekt.")
        subtitles = {
            "exercise": "Úlohy: " + exercise.get("subtitle", week["title"]),
            "solutions": "Implementácie k téme: " + week["title"],
            "examples": "Programové ukážky: " + week["title"],
            "resources": "Čítanie k téme: " + week["title"],
        }
        for key, default in subtitles.items():
            title = profile.get(key, default)
            if not isinstance(title, str) or not title.strip():
                raise ValueError(f"Kapitola {number:02}: nadpis {key} musí byť neprázdny text.")
            subtitles[key] = "\\section{" + inline(title) + "}\n"
        output = ["\\chapter{" + tex(week["title"]) + "}\n", f"\\label{{chapter-{number:02}}}\n", tex(week["description"]) + "\n\n"]
        output.append("\\subsection*{Po preštudovaní kapitoly}\n\\begin{itemize}\n")
        output.extend("\\item " + inline(item) + "\n" for item in week["learningOutcomes"])
        output.append("\\end{itemize}\n")
        lecture, slide_count, notes_count = self.lecture(week, presentation)
        output.append(lecture)
        html = ROOT / "dist/web/cvicenia" / exercise["slug"] / "index.html"
        self.source(html, "worksheet-render")
        exercise_source = ROOT / "web/src/pages/cvicenia" / (exercise["slug"] + ".astro")
        self.source(exercise_source, "worksheet-source")
        self.source(ROOT / week["folder"] / "week.config.ts", "metadata")
        local_worksheet = ROOT / week["folder"] / "worksheet.ts"
        if local_worksheet.exists():
            self.source(local_worksheet, "worksheet-source")
        output.extend([subtitles["exercise"], page_content(html, self.base_url, exercise.get("taskCount", 10))])
        starter = ROOT / exercise.get("starterPath", f"exercises/exercise-{number:02}")
        for source in self.text_files(starter):
            self.source(source, "starter")
        archive = ROOT / f"web/static/downloads/exercise-{number:02}-starter.zip"
        if archive.exists():
            self.source(archive, "starter-archive")
        # These are reference materials, never executed by the generator.
        solutions = self.text_files(ROOT / exercise.get("solutionPath", f"solutions/exercise-{number:02}"))
        if not self.student and self.config.get("solutions", True):
            output.append(subtitles["solutions"])
            if not solutions:
                self.issues.append(f"Cvičenie {number:02}: chýbajú referenčné implementácie.")
                output.append(r"\editorial{Referenčné riešenie zatiaľ nie je doplnené.}" + "\n")
            else:
                # The worksheet is part of the digest: changes invalidate an old review.
                reviewed = self.reviewed(f"solutions-{number:02}", solutions + self.text_files(starter) + [exercise_source] + ([local_worksheet] if local_worksheet.exists() else []))
                if not reviewed:
                    output.append(r"\editorial{Nasledujúce lokálne implementácie neboli overené voči aktuálnemu zadaniu. Môžu pochádzať zo staršej verzie cvičenia a nie sú označené ako vzorové riešenia aktuálnych úloh.}" + "\n")
                output.append(self.listings(solutions, "solution"))
        examples = self.text_files(ROOT / week["folder"] / "examples")
        if examples and self.config.get("examples", True):
            output.extend([subtitles["examples"], self.listings(examples, "example")])
        resources = ROOT / week["folder"] / "resources.md"
        if resources.exists():
            self.source(resources, "references")
            output.extend([subtitles["resources"], markdown(resources.read_text(encoding="utf-8"), 3, omit_intro_headings=True)])
            self.add_references(resources.read_text(encoding="utf-8"))
        self.source(ROOT / week["folder"] / "outline.md", "outline")
        self.stats.append({"week": number, "slides": slide_count, "notes": notes_count,
                           "tasks": exercise.get("taskCount", 10), "solution_files": len(solutions) if not self.student else 0})
        return "".join(output)

    def generate(self, selected: list[int] | None, release: bool) -> None:
        chapters, appendices = [], []
        for week in self.metadata["weeks"]:
            if selected is None or week["number"] in selected:
                print(f"Kapitola {week['number']:02}: {week['title']}", flush=True)
                content = self.chapter(week)
                chapter_dir = self.output / "chapters"
                chapter_dir.mkdir(exist_ok=True)
                (chapter_dir / f"{week['number']:02}.tex").write_text(content, encoding="utf-8")
                chapters.append(f"\\input{{chapters/{week['number']:02}.tex}}\n")
        for appendix in self.config.get("appendices", []):
            route = appendix["route"]
            if not re.fullmatch(r"[a-z0-9-]+", route):
                raise ValueError(f"Neplatná cesta prílohy: {route}")
            source = ROOT / "dist/web" / route / "index.html"
            self.source(source, "appendix")
            appendices.extend(["\\chapter{" + tex(appendix["title"]) + "}\n", page_content(source, self.base_url)])
        course = self.metadata["course"]
        git = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=False)
        revision = git.stdout.strip() if git.returncode == 0 else "bez-git"
        dirty = subprocess.run(["git", "diff", "--quiet"], cwd=ROOT, check=False, capture_output=True)
        revision += "+local" if dirty.returncode else ""
        template_path = ROOT / "book/template.tex"
        self.source(template_path, "template")
        self.source(ROOT / "shared/course.config.ts", "metadata")
        self.source(ROOT / "shared/exercises.ts", "metadata")
        self.source(ROOT / "scripts/book/presentation.py", "generator")
        self.source(ROOT / "scripts/book/generate.py", "generator")
        self.source(ROOT / "scripts/book/commentary.py", "generator")
        self.source(ROOT / "scripts/book/terminology.py", "generator")
        self.source(ROOT / "book/terms.json", "terminology")
        template = template_path.read_text(encoding="utf-8")
        vendor_path = ROOT / "book/vendor/classicthesis"
        vendor_manifest = vendor_path / "manifest.json"
        self.source(vendor_manifest, "typesetting-dependency")
        for filename, expected in json.loads(vendor_manifest.read_text(encoding="utf-8"))["files"].items():
            if sha256((vendor_path / filename).read_bytes()).hexdigest() != expected:
                raise ValueError(f"Pôvodný ClassicThesis sa zmenil: {filename}. Úpravy patria do book/compat alebo konfigurácie.")
        values = {"TITLE": self.config.get("title", course["title"]), "AUTHOR": self.config.get("author", course["lecturer"]["name"]),
                  "UNIVERSITY": self.config.get("university", course["university"]), "FACULTY": self.config.get("faculty", course["faculty"]),
                  "SUBTITLE": self.config["subtitle"], "YEAR": self.config["year"], "PLACE": self.config["place"],
                  "EDITION": self.config["edition"], "REVISION": revision,
                  "VARIANT": "študentský bez referenčných riešení" if self.student else "autorský s lokálnym výkladom a implementáciami"}
        for key, value in values.items():
            template = template.replace(f"@@{key}@@", tex(value))
        # Keep a complete, portable typesetting source directory. The version of
        # ClassicThesis is pinned in the repository, not the local TeX install.
        for source_path in [ROOT / "book/vendor/classicthesis/classicthesis.sty",
                            ROOT / "book/vendor/classicthesis/COPYING", ROOT / "book/compat/scrpage2.sty", ROOT / "book/compat/unicode-spacing.tex"]:
            self.source(source_path, "typesetting-dependency")
            shutil.copyfile(source_path, self.output / source_path.name)
        for filename in ["classicthesis-config.tex", "code-listings.tex", "titlepage.tex"]:
            config_path = ROOT / "book" / filename
            self.source(config_path, "template")
            style_config = config_path.read_text(encoding="utf-8")
            for key, value in values.items():
                style_config = style_config.replace(f"@@{key}@@", tex(value))
            (self.output / filename).write_text(style_config, encoding="utf-8")
        bibliography = []
        for key, reference in self.references.items():
            title = tex(reference["title"])
            url = reference["url"].replace("%", r"\%")
            bibliography.append(f"@online{{{key},\n  title = {{{title}}},\n  url = {{{url}}}\n}}\n")
        (self.output / "references.bib").write_text("\n".join(bibliography), encoding="utf-8")
        explanation = (" Dostupný výklad z komentárov je priebežne zaradený medzi ukážky."
                       if self.config.get("notes", True) and (not self.student or self.config.get("studentCommentary", True)) else "")
        template = template.replace("@@PREFACE@@", ("Študentský variant obsahuje študijné podklady a zadania bez referenčných riešení." if self.student else
                                    "Autorský variant zahŕňa aj lokálne implementácie. Je určený na redakčnú prípravu.") + explanation)
        biography = ""
        if biography_source := self.config.get("authorBiography"):
            biography_path = (ROOT / biography_source).resolve()
            self.source(biography_path, "author-biography")
            biography = ("\\addchap{O autorovi}\n\\noindent\\textbf{" + tex(values["AUTHOR"]) + "}\\par\n"
                         + markdown(biography_path.read_text(encoding="utf-8-sig"), 2) + "\\cleardoublepage\n")
        template = template.replace("@@AUTHOR_BIO@@", biography)
        template = template.replace("@@CHAPTERS@@", "".join(chapters)).replace("@@APPENDICES@@", "".join(appendices))
        (self.output / "main.tex").write_text(template, encoding="utf-8")
        report = ["# Stav rukopisu\n", f"Zdrojová revízia: {revision}\n", "| Kapitola | Snímky | Poznámky | Úlohy | Súbory implementácií |", "|---|---:|---:|---:|---:|"]
        report.extend(f"| {item['week']:02} | {item['slides']} | {item['notes']} | {item['tasks']} | {item['solution_files']} |" for item in self.stats)
        report.extend(["\n## Redakčná kontrola\n", *[f"- {issue}" for issue in self.issues]])
        if not self.issues:
            report.append("Všetky zahrnuté kapitoly majú aktuálne redakčné záznamy.")
        report.append("\nKontrola hashov nenahrádza odbornú recenziu ani testovanie referenčných programov.")
        (self.output / "report.md").write_text("\n".join(report) + "\n", encoding="utf-8")
        (self.output / "content-coverage.json").write_text(json.dumps(self.coverage, ensure_ascii=False, indent=2), encoding="utf-8")
        manifest = {"revision": revision, "variant": "student" if self.student else "author", "chapters": self.stats, "sources": self.sources, "issues": self.issues,
                    "typesetting": "ClassicThesis 4.1 (f7ff17a17ab62abe24ce9434c4930b350aef91f2)",
                    "native_tables": sum(item["tables"] for item in self.coverage.values()),
                    "native_code_blocks": sum(item["code_blocks"] for item in self.coverage.values()),
                    "native_diagrams": sum(item["diagrams"] for item in self.coverage.values()),
                    "bibliography_entries": len(self.references)}
        (self.output / "sources.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Vygenerované: {self.output / 'main.tex'}", flush=True)
        print(f"Redakčné položky: {len(self.issues)}; detaily v report.md.", flush=True)
        if release and self.issues:
            raise ValueError("Rukopis má nevyriešené redakčné položky. Pracovný build je dostupný bez --release.")


def compile_pdf(output: Path) -> None:
    compiler = os.environ.get("XELATEX", "xelatex")
    if not shutil.which(compiler):
        raise RuntimeError("Chýba XeLaTeX. Nainštalujte TeX Live/MiKTeX alebo použite book:generate pre zdrojové .tex.")
    biber = os.environ.get("BIBER", "biber")
    if not shutil.which(biber):
        raise RuntimeError("Chýba Biber pre bibliografiu. Nainštalujte ho cez TeX Live/MiKTeX.")
    # Native LaTeX/TikZ only; no slide rendering, external tools or shell escape
    # during typesetting. Extra passes are conditional on actual rerun requests.
    log = ""
    for number in range(1, 6):
        print(f"XeLaTeX: priechod {number}", flush=True)
        result = subprocess.run([compiler, "-no-shell-escape", "-interaction=nonstopmode", "-halt-on-error", "-file-line-error", "main.tex"],
                                cwd=output, capture_output=True, encoding="utf-8", errors="replace", check=False)
        (output / f"xelatex-{number}.txt").write_text(result.stdout + result.stderr, encoding="utf-8")
        if result.returncode:
            print("\n".join((result.stdout + result.stderr).splitlines()[-45:]), file=sys.stderr)
            raise RuntimeError(f"Kompilácia zlyhala. Podrobnosti: {output / f'xelatex-{number}.txt'}")
        if number == 1:
            print("Biber: bibliografia", flush=True)
            bibliography = subprocess.run([biber, "main"], cwd=output, capture_output=True, encoding="utf-8", errors="replace", check=False)
            (output / "biber.txt").write_text(bibliography.stdout + bibliography.stderr, encoding="utf-8")
            if bibliography.returncode:
                raise RuntimeError("Biber zlyhal:\n" + bibliography.stdout + bibliography.stderr)
        log = (output / "main.log").read_text(encoding="utf-8", errors="replace")
        rerun = any(message in log for message in ["Rerun to get", "There were undefined references", "Please rerun LaTeX", "Please (re)run Biber"])
        if number >= 3 and not rerun:
            break
    missing = sorted(set(re.findall(r"Missing character:.*", log)))
    if missing:
        raise RuntimeError("PDF obsahuje chýbajúce znaky písma:\n" + "\n".join(missing[:20]))
    if rerun:
        raise RuntimeError("PDF má nevyriešené odkazy; pozrite main.log.")
    if "multiply-defined labels" in log or re.search(r"Citation .* undefined", log):
        raise RuntimeError("PDF má duplicitné odkazy alebo chýbajúce citácie; pozrite main.log.")
    target = output / "programovanie-v-pythone.pdf"
    # Last successful PDF is replaced only after all passes and checks succeed.
    shutil.copyfile(output / "main.pdf", target)
    warnings = [line for line in log.splitlines() if "Overfull \\hbox" in line or "Overfull \\vbox" in line]
    (output / "layout-warnings.txt").write_text("\n".join(warnings), encoding="utf-8")
    print(f"PDF: {target}\nKontrola rozloženia: {len(warnings)} upozornení.", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--metadata", required=True, type=Path)
    parser.add_argument("--config", default="book/book.config.json", type=Path)
    parser.add_argument("--student", action="store_true")
    parser.add_argument("--generate-only", action="store_true")
    parser.add_argument("--commentary-only", action="store_true")
    parser.add_argument("--skip-web", action="store_true")
    parser.add_argument("--release", action="store_true")
    parser.add_argument("--weeks")
    args = parser.parse_args()
    config_path = (ROOT / args.config).resolve()
    config = json.loads(config_path.read_text(encoding="utf-8"))
    if config.get("language") != "sk":
        raise ValueError("Prvá verzia generátora podporuje slovenské skriptá (language=sk).")
    metadata = json.loads(args.metadata.read_text(encoding="utf-8"))
    selected = None
    if args.weeks:
        selected = [int(value) for value in args.weeks.split(",")]
        known = {week["number"] for week in metadata["weeks"]}
        if not selected or not set(selected) <= known:
            raise ValueError("--weeks obsahuje neznámy týždeň.")
    output = ROOT / "dist/book" / ("student" if args.student else "author")
    output.mkdir(parents=True, exist_ok=True)
    book = Book(metadata, config, output, args.student)
    if config_path.is_relative_to(ROOT):
        book.source(config_path, "configuration")
    if args.commentary_only:
        for week in metadata["weeks"]:
            if selected is None or week["number"] in selected:
                presentation = next(item for item in metadata["presentations"] if item["weekNumber"] == week["number"])
                path, sections = book.prepare_commentary(week, presentation)
                print(f"{path.relative_to(ROOT)}: {len(sections)} sekcií.", flush=True)
        for issue in book.issues:
            print(f"Poznámka: {issue}", flush=True)
        return
    book.generate(selected, args.release)
    if not args.generate_only:
        compile_pdf(output)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, RuntimeError, OSError) as error:
        print(f"Chyba: {error}", file=sys.stderr)
        sys.exit(1)
