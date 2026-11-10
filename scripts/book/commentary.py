"""Editable, private Markdown between the semantic objects of a lecture.

PPTX extraction stays in generate.py. This module never interprets Markdown as
Python/TeX and never replaces a manually edited section during synchronization.
"""
from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha256
import json
from pathlib import Path
import re
from typing import Callable

from presentation import CodeBlock, Diagram, Table, Text

FORMAT = "<!-- commentary-format: 1 -->"
SECTION = re.compile(r"<!-- slide: (\{[^\n]+\}) -->\n(.*?)<!-- /slide -->", re.S)
MATERIAL = re.compile(r"^<!-- material: (\d+) -->[ \t]*$", re.M)


def digest(text: str) -> str:
    # A checkout/editor changing CRLF or the final newline is not a prose edit.
    return sha256(text.replace("\r\n", "\n").strip().encode("utf-8")).hexdigest()


@dataclass
class Section:
    number: int
    part: str
    visual: str
    notes: str
    imported: str
    title: str
    body: str

    def dump(self) -> str:
        metadata = {key: getattr(self, key) for key in ("number", "part", "visual", "notes", "imported")}
        return ("<!-- slide: " + json.dumps(metadata, ensure_ascii=False) + " -->\n"
                + f"## {self.number:03} — {self.title}\n\n{self.body.strip()}\n\n<!-- /slide -->\n")


def read(path: Path) -> tuple[str, dict[int, Section]]:
    source = path.read_text(encoding="utf-8-sig").replace("\r\n", "\n")
    if FORMAT not in source:
        raise ValueError(f"{path.name}: chýba hlavička {FORMAT}.")
    matches = list(SECTION.finditer(source))
    if not matches:
        raise ValueError(f"{path.name}: chýbajú sekcie <!-- slide: ... -->.")
    header, sections, end = source[:matches[0].start()], {}, matches[0].start()
    for match in matches:
        if source[end:match.start()].strip():
            raise ValueError(f"{path.name}: text mimo sekcie slajdu; presuňte ho medzi značky slide a /slide.")
        try:
            meta = json.loads(match[1])
            if type(meta["number"]) is not int or meta["number"] < 1:
                raise ValueError("neplatné číslo slajdu")
            if not re.fullmatch(r"ppt/slides/slide\d+\.xml", meta["part"]):
                raise ValueError("neplatný identifikátor slajdu")
            if any(not re.fullmatch(r"[0-9a-f]{64}", meta[key]) for key in ("visual", "notes", "imported")):
                raise ValueError("neplatný kontrolný súčet")
            heading, body = match[2].split("\n", 1)
            title = re.fullmatch(r"## \d+ — (.*)", heading)[1]
            section = Section(**meta, title=title, body=body.strip())
        except (KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
            raise ValueError(f"{path.name}: poškodená sekcia komentára ({error}).") from error
        if section.number in sections:
            raise ValueError(f"{path.name}: duplicitný slajd {section.number}.")
        sections[section.number] = section
        end = match.end()
    if source[end:].strip():
        raise ValueError(f"{path.name}: text za poslednou sekciou slajdu.")
    return header, sections


def prose_paragraphs(notes: str) -> list[str]:
    """Keep all original words; break single spoken paragraphs for book reading.

    Existing paragraph boundaries are retained. Very long paragraphs are split
    only at sentence endings, never at a decimal or an inline code expression.
    This is an initial placement, not an automatic rewrite of the explanation.
    """
    result = []
    for paragraph in re.split(r"\n\s*\n", notes.strip()):
        if not paragraph.strip():
            continue
        sentences = re.split(r"(?<=[.!?])\s+(?=[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ„])", paragraph.strip())
        chunk = []
        for sentence in sentences:
            chunk.append(sentence)
            if len(" ".join(chunk).split()) >= 35 and len(chunk) >= 2:
                result.append(" ".join(chunk))
                chunk = []
        if chunk:
            result.append(" ".join(chunk))
    return result


def initial_body(notes: str, items: list[Text | Table | Diagram | CodeBlock]) -> str:
    paragraphs = prose_paragraphs(notes)
    # Prefer the boundaries after real examples, tables and diagrams. Labels
    # belong to the next object, so no prose is inserted after a label alone.
    boundaries = [0] + [index + 1 for index, item in enumerate(items)
                        if isinstance(item, (Table, Diagram, CodeBlock)) or
                        isinstance(item, Text) and (item.role == "code" or item.mono and "\n" in item.text)]
    if len(items) not in boundaries:
        boundaries.append(len(items))
    slots: dict[int, list[str]] = {}
    for index, paragraph in enumerate(paragraphs):
        position = min(index, len(boundaries) - 1)
        slots.setdefault(boundaries[position], []).append(paragraph)
    output = []
    for index in range(len(items) + 1):
        output.extend(slots.get(index, []))
        if index < len(items):
            output.append(f"<!-- material: {index + 1} -->")
    if not paragraphs:
        output.insert(0, "<!-- Výklad zatiaľ nie je dostupný. Vlastný text môžete doplniť sem. -->")
    return "\n\n".join(output)


def synchronize(path: Path, title: str, incoming: list[Section]) -> tuple[dict[int, Section], list[str]]:
    """Refresh untouched imports; manual changes and removed sections survive."""
    header = (f"# {title}\n\n{FORMAT}\n\n"
              "Súkromný výklad pre skriptá. Text medzi značkami `material` možno upravovať.\n"
              "Každá značka vkladá jeden pôvodný objekt slajdu; zachovajte všetky práve raz.\n"
              "Metadata `slide` a kontrolné súčty sa používajú na kontrolu aktuálnosti.\n\n")
    existing = {}
    if path.exists():
        header, existing = read(path)
    result, issues = {}, []
    for section in incoming:
        previous = existing.pop(section.number, None)
        if previous is None or digest(previous.body) == previous.imported:
            result[section.number] = section
        else:
            result[section.number] = previous
            if previous.notes != section.notes or previous.visual != section.visual or previous.part != section.part or previous.imported != section.imported:
                incoming_path = path.with_name(path.stem + ".incoming-" + digest(section.dump())[:12] + ".md")
                if not incoming_path.exists():
                    incoming_path.write_text(header + section.dump(), encoding="utf-8")
                issues.append(f"{path.name}, slajd {section.number}: zdroj sa zmenil; ručne upravený výklad zostal zachovaný. Nový import na porovnanie: {incoming_path.name}.")
    for number, section in existing.items():
        result[number] = section
        issues.append(f"{path.name}, slajd {number}: v aktuálnej prezentácii už nie je; pôvodný text zostal zachovaný.")
    value = header + "\n".join(section.dump() for section in result.values())
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.read_text(encoding="utf-8-sig") != value:
        path.write_text(value, encoding="utf-8")
    return result, issues


def material_markers(body: str) -> list[re.Match]:
    markers, offset, in_code = [], 0, False
    for line in body.splitlines(keepends=True):
        if line.strip().startswith("```"):
            in_code = not in_code
        elif not in_code and line.startswith("<!-- material:"):
            marker = MATERIAL.match(body, offset)
            if not marker:
                raise ValueError("Neplatná značka materiálu; použite samostatný riadok <!-- material: N -->.")
            markers.append(marker)
        offset += len(line)
    return markers


def prose_source(body: str) -> str:
    """Recover the editable source when only the saved Markdown is available."""
    return render(body, [""] * len(material_markers(body)), lambda value: value + "\n\n")[0].strip()


def render(body: str, materials: list[str], markdown: Callable[[str], str]) -> tuple[str, bool]:
    """Render explicit prose/material order; reject silent code duplication/loss."""
    markers = material_markers(body)
    numbers = [int(match[1]) for match in markers]
    if sorted(numbers) != list(range(1, len(materials) + 1)):
        raise ValueError("Každá značka <!-- material: N --> musí byť uvedená práve raz (1 až " + str(len(materials)) + ").")
    output, has_prose, start = [], False, 0
    for match in [*markers, None]:
        end = match.start() if match else len(body)
        chunk = body[start:end]
        # Strip metadata/instructions, but never inside a fenced code block.
        chunks = re.split(r"(^```[^\n]*\n.*?^```[ \t]*$)", chunk, flags=re.M | re.S)
        chunk = "".join(part if index % 2 else re.sub(r"<!--.*?-->", "", part, flags=re.S)
                        for index, part in enumerate(chunks)).strip()
        if chunk:
            has_prose = True
            output.append(markdown(chunk))
        if match:
            output.append(materials[int(match[1]) - 1])
            start = match.end()
    return "".join(output), has_prose
