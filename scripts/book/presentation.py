"""Read semantic book content from PPTX, without rendering any slide images.

The XML remains authoritative. Tables become actual rows and cells; arrows and
their labels become a small graph. Every text object is accounted for, including
text in tables (which is not a p:sp). Unknown embedded graphics fail explicitly.
"""
from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, field
from hashlib import sha256
import math
import re
from typing import Callable
from xml.etree import ElementTree as ET
from zipfile import ZipFile

NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
EMU = 914400
MONO = {"consolas", "courier new", "dejavu sans mono", "cascadia code"}


@dataclass(frozen=True)
class Box:
    x: float = 0
    y: float = 0
    w: float = 0
    h: float = 0

    @property
    def cx(self):
        return self.x + self.w / 2

    @property
    def cy(self):
        return self.y + self.h / 2

    def contains(self, other: Box, tolerance=0.04):
        return self.x - tolerance <= other.cx <= self.x + self.w + tolerance and self.y - tolerance <= other.cy <= self.y + self.h + tolerance


@dataclass
class Paragraph:
    text: str
    bullet: bool = False


@dataclass
class Text:
    id: str
    paragraphs: list[Paragraph]
    box: Box
    size: int
    mono: bool
    bold: bool
    order: int
    role: str = "prose"

    @property
    def text(self):
        return "\n".join(item.text for item in self.paragraphs)


@dataclass
class Shape:
    id: str
    kind: str
    box: Box
    fill: str
    rotation: float = 0


@dataclass
class Table:
    id: str
    headers: list[str]
    rows: list[list[str]]
    source_ids: list[str]
    box: Box
    order: int


@dataclass
class GraphNode:
    id: str
    texts: list[Text]
    box: Box


@dataclass
class Diagram:
    id: str
    nodes: list[GraphNode]
    edges: list[tuple[str, str]]
    source_ids: list[str]
    order: int
    annotations: list[Text] = field(default_factory=list)
    links: list[tuple[str, str]] = field(default_factory=list)


@dataclass
class Slide:
    title: str
    title_id: str
    items: list[Text | Table | Diagram]
    excluded: dict[str, str]
    source_text: dict[str, str]

    def coverage(self):
        ids = [self.title_id] if self.title_id else []
        for item in self.items:
            ids.extend([item.id] if isinstance(item, Text) else item.source_ids)
        counted = Counter(ids)
        missing = set(self.source_text) - set(counted) - set(self.excluded)
        duplicated = [key for key, count in counted.items() if count != 1]
        if missing or duplicated:
            raise ValueError(f"Neúplný prevod prezentácie: chýbajú {sorted(missing)}, duplicitné {duplicated}.")
        return {"title": self.title, "objects": len(self.source_text), "converted": len(counted),
                "excluded": self.excluded, "hashes": {key: sha256(value.encode()).hexdigest() for key, value in self.source_text.items()},
                "tables": sum(isinstance(item, Table) for item in self.items),
                "diagrams": sum(isinstance(item, Diagram) for item in self.items)}


def box(element: ET.Element, frame=False) -> Box:
    transform = element.find("p:xfrm", NS) if frame else element.find("p:spPr/a:xfrm", NS)
    if transform is None:
        return Box()
    offset, extent = transform.find("a:off", NS), transform.find("a:ext", NS)
    if offset is None or extent is None:
        return Box()
    return Box(int(offset.get("x", 0)) / EMU, int(offset.get("y", 0)) / EMU,
               int(extent.get("cx", 0)) / EMU, int(extent.get("cy", 0)) / EMU)


def paragraphs(element: ET.Element) -> list[Paragraph]:
    result = []
    for paragraph in element.findall(".//a:p", NS):
        text = []
        for node in paragraph.iter():
            if node.tag == f"{{{NS['a']}}}t":
                text.append(node.text or "")
            elif node.tag == f"{{{NS['a']}}}br":
                text.append("\n")
            elif node.tag == f"{{{NS['a']}}}tab":
                text.append("\t")
        result.append(Paragraph("".join(text), paragraph.find("a:pPr/a:buChar", NS) is not None))
    return result


def identity(element: ET.Element, fallback: str):
    properties = element.find(".//p:cNvPr", NS)
    return properties.get("id", fallback) if properties is not None else fallback


def read_slide(archive: ZipFile, part: str) -> Slide:
    doc = ET.fromstring(archive.read(part))
    if doc.findall(".//p:pic", NS):
        raise ValueError(f"{part}: vložený obrázok potrebuje knižný ekvivalent; snímky sa do knihy nevkladajú.")
    texts, shapes, tables, excluded, source_text = [], [], [], {}, {}
    for order, element in enumerate(doc.findall(".//p:sp", NS)):
        identifier = "text-" + identity(element, str(order))
        geometry = element.find("p:spPr/a:prstGeom", NS)
        color = element.find("p:spPr/a:solidFill/a:srgbClr", NS)
        transform = element.find("p:spPr/a:xfrm", NS)
        if geometry is not None:
            shapes.append(Shape(identifier, geometry.get("prst", "rect"), box(element), color.get("val", "") if color is not None else "",
                                int(transform.get("rot", "0")) / 60000 if transform is not None else 0))
        lines = paragraphs(element)
        value = "\n".join(item.text for item in lines)
        if not value.strip():
            continue
        source_text[identifier] = value
        sizes = [int(node.get("sz", 0)) for node in element.findall(".//a:rPr", NS)]
        size = max(sizes, default=0)
        fonts = {node.get("typeface", "").lower() for node in element.findall(".//a:latin", NS)}
        bold = any(node.get("b") == "1" for node in element.findall(".//a:rPr", NS))
        item = Text(identifier, lines, box(element), size, bool(fonts & MONO), bold, order)
        if value.startswith(("PROGRAMOVANIE V PYTHONE", "PREDNÁŠKA ")) or value == "TUKE FEI" or re.fullmatch(r"\d+\s*/\s*\d+", value.strip()):
            excluded[identifier] = "running-slide-metadata"
        elif re.fullmatch(r"0[1-9]", value.strip()) and size == 1900 and item.box.y < 1.6:
            excluded[identifier] = "section-counter"
        elif item.box.y < 1 and size < 1200:
            excluded[identifier] = "running-slide-metadata"
        else:
            if size <= 1100 and item.mono:
                item.role = "label"
            texts.append(item)
    if not texts:
        raise ValueError(f"{part}: snímka nemá textový nadpis.")
    title = max(texts, key=lambda item: item.size)
    texts.remove(title)

    consumed = set()
    for frame_index, frame in enumerate(doc.findall(".//p:graphicFrame", NS)):
        table = frame.find(".//a:tbl", NS)
        if table is None:
            raise ValueError(f"{part}: nepodporovaný grafický objekt; doplňte sémantický adaptér.")
        bounds = box(frame, True)
        widths = [int(column.get("w", "0")) / EMU for column in table.findall("a:tblGrid/a:gridCol", NS)]
        if not widths:
            raise ValueError(f"{part}: tabuľka nemá stĺpce.")
        header_candidates = [item for item in texts if item.id not in consumed and bounds.y - 0.8 <= item.box.y < bounds.y and bounds.x - 0.1 <= item.box.cx <= bounds.x + bounds.w + 0.1]
        headers, source_ids, left = [], [], bounds.x
        for width in widths:
            candidates = [item for item in header_candidates if left - 0.05 <= item.box.cx < left + width + 0.05]
            candidates.sort(key=lambda item: (item.box.y, item.box.x))
            headers.append("\n".join(item.text for item in candidates))
            source_ids.extend(item.id for item in candidates)
            left += width
        rows = []
        for row_index, row in enumerate(table.findall("a:tr", NS)):
            cells = []
            for column_index, cell in enumerate(row.findall("a:tc", NS)):
                value = "\n".join(line.text for line in paragraphs(cell))
                identifier = f"table-{frame_index}-r{row_index}-c{column_index}"
                source_text[identifier] = value
                source_ids.append(identifier)
                cells.append(value)
            rows.append(cells)
        if not any(headers):
            # Native tables can carry their own first row rather than separate
            # PptxGenJS header shapes.
            if table.find("a:tblPr", NS) is not None and table.find("a:tblPr", NS).get("firstRow") == "1":
                headers = rows.pop(0)
            else:
                headers = []
        consumed.update(source_ids)
        tables.append(Table(f"table-{frame_index}", headers, rows, source_ids, bounds,
                            min((item.order for item in header_candidates), default=10000 + frame_index)))

    remaining = [item for item in texts if item.id not in consumed]
    mark_code(remaining, shapes)
    views = view_tables(remaining, shapes)
    tables.extend(views)
    consumed.update(identifier for view in views for identifier in view.source_ids)
    remaining = [item for item in remaining if item.id not in consumed]
    diagram = build_diagram(remaining, shapes)
    if diagram:
        consumed.update(diagram.source_ids)
    items = [item for item in texts if item.id not in consumed] + tables + ([diagram] if diagram else [])
    items.sort(key=lambda item: item.order)
    slide = Slide(title.text.replace("\n", " "), title.id, items, excluded, source_text)
    slide.coverage()
    return slide


def view_tables(texts: list[Text], shapes: list[Shape]) -> list[Table]:
    """Turn native UI mock-ups into compact, readable state tables.

    This adapts the window component used in the course, not a screenshot. The
    window title, controls, task rows and counters remain literal source text.
    """
    headers = [item for item in texts if item.size < 1100 and item.text == "Moje úlohy"]
    windows = {}
    for header in headers:
        candidates = [shape for shape in shapes if shape.kind == "rect" and shape.box.contains(header.box)
                      and 0.8 < shape.box.h < 5.5 and 2 < shape.box.w < 7
                      and header.box.y - shape.box.y < 0.35 and shape.fill not in {"17212B", "223044"}]
        if candidates:
            window = min(candidates, key=lambda shape: shape.box.w * shape.box.h)
            windows[window.id] = (window, header)
    if not windows:
        return []
    all_inside = {item.id for window, _ in windows.values() for item in texts if window.box.contains(item.box)}
    ordered_windows = sorted(windows.values(), key=lambda pair: (round(pair[0].box.y, 1), pair[0].box.x))
    bands = []
    for window, header in ordered_windows:
        band = next((band for band in bands if abs(band[0][0].box.y - window.box.y) < 0.1), None)
        if band is None:
            bands.append([(window, header)])
        else:
            band.append((window, header))
    if len(bands) > 1 and all(len(band) == 2 for band in bands):
        # Repeated before/after pairs retain their operation and column meaning.
        columns = []
        ids, rows = [], []
        for window, _ in bands[0]:
            possible = [item for item in texts if item.id not in all_inside and abs(item.box.cx - window.box.cx) < 0.3
                        and 0 < window.box.y - item.box.y < 0.4]
            column = min(possible, key=lambda item: abs(item.box.cx - window.box.cx), default=None)
            columns.append(column.text if column else "")
            if column:
                ids.append(column.id)
        for band in bands:
            possible = [item for item in texts if item.id not in all_inside and item.id not in ids
                        and item.box.cx < band[0][0].box.x and abs(item.box.cy - band[0][0].box.cy) < 0.5]
            action = min(possible, key=lambda item: abs(item.box.cy - band[0][0].box.cy), default=None)
            values = [action.text if action else ""]
            if action:
                ids.append(action.id)
            for window, _ in band:
                members = [item for item in texts if window.box.contains(item.box) and item.id not in ids]
                values.append("\n".join(item.text for item in members))
                ids.extend(item.id for item in members)
            rows.append(values)
        return [Table("view-transitions", ["Operácia", *columns], rows, ids, Box(), min(item.order for item in texts if item.id in ids))]
    ids, rows, order = [], [], 100000
    for window, header in ordered_windows:
        group = sorted([item for item in texts if window.box.contains(item.box)], key=lambda item: item.order)
        # A source caption immediately above/below a miniature belongs to its
        # state. Long explanatory prose spanning multiple windows stays outside.
        captions = [item for item in texts if item.id not in all_inside
                    and item.box.w <= window.box.w + 0.5 and abs(item.box.cx - window.box.cx) < 0.4
                    and (0 < window.box.y - item.box.y < 0.55 or 0 < item.box.y - window.box.y - window.box.h < 0.65)
                    and item.role != "code"]
        group.extend(captions)
        group = [item for item in group if item.id not in ids]
        if not group:
            continue
        primary = next((item for item in captions if re.match(r"\d+\.", item.text)), header)
        first = primary.text
        body = "\n".join(item.text for item in group if item.id != primary.id)
        rows.append([first, body])
        ids.extend(item.id for item in group)
        order = min(order, *(item.order for item in group))
    return [Table("view-states", ["Stav / okno", "Zobrazenie"], rows, ids, Box(), order)]


def mark_code(texts: list[Text], shapes: list[Shape]) -> None:
    # The presentation theme uses a dark code panel and a much smaller label.
    # Also recognize light panels and standalone expressions; diagram labels
    # remain prose until the arrow graph is assembled.
    labels = [item for item in texts if item.role == "label"]
    code_panels = []
    for shape in shapes:
        if shape.kind != "rect" or shape.box.w < 3 or shape.box.h < 0.6:
            continue
        if shape.fill in {"17212B", "223044"} or any(shape.box.contains(label.box) for label in labels):
            code_panels.append(shape)
    for item in texts:
        if item.role == "label":
            continue
        if item.mono:
            panel = next((shape for shape in code_panels if shape.box.contains(item.box)), None)
            expression = re.search(r"(?:^|\n)\s*(?:def |class |from |import |if |for |return |print\(|python |[a-zA-Z_]\w*(?:\[.*\])?\s*=)", item.text)
            if panel or expression or ("\n" in item.text and any(char in item.text for char in "=[]{}()")):
                item.role = "code"


def build_diagram(texts: list[Text], shapes: list[Shape]) -> Diagram | None:
    arrows = [shape for shape in shapes if shape.kind in {"chevron", "rightArrow", "leftArrow", "downArrow", "upArrow"}]
    if not arrows:
        return None
    nodes, edges = {}, []
    candidates = [item for item in texts if item.role != "code" and item.size >= 1100]

    def node_for(text: Text) -> GraphNode:
        carriers = [shape for shape in shapes if shape.kind == "rect" and shape.box.contains(text.box)
                    and shape.box.w >= text.box.w * 0.75 and shape.box.h >= text.box.h * 0.75
                    and shape.box.w * shape.box.h < 13 and shape.fill not in {"17212B", "223044"}]
        carrier = min(carriers, key=lambda shape: shape.box.w * shape.box.h, default=None)
        identifier = "node-" + (carrier.id if carrier else text.id)
        if identifier not in nodes:
            group = [item for item in candidates if carrier.box.contains(item.box)] if carrier else [text]
            group = [item for item in group if item.role != "label"]
            nodes[identifier] = GraphNode(identifier, group or [text], carrier.box if carrier else text.box)
        return nodes[identifier]

    def gap(item, x, y):
        dx = max(item.box.x - x, 0, x - item.box.x - item.box.w)
        dy = max(item.box.y - y, 0, y - item.box.y - item.box.h)
        return math.hypot(dx, dy)

    for arrow in arrows:
        pairs = []
        for vertical in [False, True]:
            if vertical:
                before = [item for item in candidates if item.box.cy < arrow.box.cy and abs(item.box.cx - arrow.box.cx) < max(0.7, item.box.w / 2)]
                after = [item for item in candidates if item.box.cy > arrow.box.cy and abs(item.box.cx - arrow.box.cx) < max(0.7, item.box.w / 2)]
                score = lambda item: gap(item, arrow.box.cx, arrow.box.cy) + .1 * abs(item.box.cx - arrow.box.cx)
            else:
                before = [item for item in candidates if item.box.cx < arrow.box.cx and abs(item.box.cy - arrow.box.cy) < 1.8]
                after = [item for item in candidates if item.box.cx > arrow.box.cx and abs(item.box.cy - arrow.box.cy) < 1.8]
                score = lambda item: gap(item, arrow.box.cx, arrow.box.cy) + .1 * abs(item.box.cy - arrow.box.cy)
            if before and after:
                a, b = min(before, key=score), min(after, key=score)
                pairs.append((score(a) + score(b), a, b))
        if not pairs:
            # Mixed code -> UI layouts are represented by the code plus its
            # textual view state. Do not invent an absent graph endpoint.
            continue
        _, a, b = min(pairs, key=lambda pair: pair[0])
        start, end = node_for(a), node_for(b)
        if start.id == end.id:
            continue
        if arrow.kind in {"leftArrow", "upArrow"}:
            start, end = end, start
        edges.append((start.id, end.id))
    links = []
    connection_candidates = [item for item in candidates if item.box.h < 1.1]
    for line in [shape for shape in shapes if shape.kind == "line" and abs(shape.box.h) > 0.2]:
        a = min(connection_candidates, key=lambda item: gap(item, line.box.x, line.box.y), default=None)
        b = min(connection_candidates, key=lambda item: gap(item, line.box.x + line.box.w, line.box.y + line.box.h), default=None)
        if a and b and a.id != b.id and gap(a, line.box.x, line.box.y) < 0.85 and gap(b, line.box.x + line.box.w, line.box.y + line.box.h) < 0.85:
            start, end = node_for(a), node_for(b)
            if start.id != end.id:
                links.append((start.id, end.id))
    if not edges and not links:
        return None
    used = {key for edge in edges + links for key in edge}
    nodes = {key: node for key, node in nodes.items() if key in used}
    source_ids = [item.id for node in nodes.values() for item in node.texts]
    # Overlapping visual containers must not consume the same text twice.
    if len(set(source_ids)) != len(source_ids):
        return None
    left, right = min(node.box.x for node in nodes.values()), max(node.box.x + node.box.w for node in nodes.values())
    top, bottom = min(node.box.y for node in nodes.values()), max(node.box.y + node.box.h for node in nodes.values())
    annotations = [item for item in texts if item.id not in source_ids and item.role == "label"
                   and left <= item.box.cx <= right and top - 1.2 <= item.box.y <= bottom + 0.1]
    source_ids.extend(item.id for item in annotations)
    return Diagram("diagram", list(nodes.values()), list(dict.fromkeys(edges)), source_ids,
                   min(item.order for node in nodes.values() for item in node.texts), annotations, links)


def native_table(table: Table, inline: Callable[[str], str], caption: str, label: str) -> str:
    count = max([len(table.headers)] + [len(row) for row in table.rows])
    width = f"\\dimexpr(\\linewidth-{2 * (count - 1)}\\tabcolsep)/{count}\\relax"
    spec = "@{}" + (r">{\raggedright\arraybackslash}p{" + width + "}") * count + "@{}"
    output = ["\n{\\small\n\\begin{longtable}{" + spec + "}\n",
              r"\caption{" + caption + r"}\label{" + label + r"}\\" + "\n\\toprule\n"]

    def row(cells):
        return " & ".join("{" + inline(cell).replace("\n", r"\newline{}") + "}" for cell in cells + [""] * (count - len(cells))) + r" \\" + "\n"

    if table.headers:
        output.extend([row(table.headers), "\\midrule\n\\endfirsthead\n", row(table.headers), "\\midrule\n\\endhead\n"])
    output.extend(row(cells) for cells in table.rows)
    output.append("\\bottomrule\n\\end{longtable}\n}\n")
    return "".join(output)


def native_diagram(diagram: Diagram, inline: Callable[[str], str], caption: str, label: str) -> str:
    nodes = diagram.nodes
    names = {node.id: f"n{index}" for index, node in enumerate(nodes)}
    # A long horizontal slideshow process becomes a vertical book diagram.
    # The direction and every endpoint are retained, while labels remain legible.
    chain = len(diagram.edges) == len(nodes) - 1 and max(node.box.cy for node in nodes) - min(node.box.cy for node in nodes) < 0.9 and not diagram.annotations and not diagram.links
    content = ["\n\\begin{figure}[htbp]\n\\centering\n\\begin{tikzpicture}\n"]

    def text(node):
        return r"\\".join(inline(item.text).replace("\n", r"\\") for item in node.texts)

    if chain:
        ordered = sorted(nodes, key=lambda node: node.box.cx)
        for index, node in enumerate(ordered):
            position = "" if index == 0 else f",below=4mm of {names[ordered[index - 1].id]}"
            content.append(f"\\node[book node,text width=0.72\\linewidth{position}] ({names[node.id]}) {{{text(node)}}};\n")
        for start, end in diagram.edges:
            content.append(f"\\draw[book edge] ({names[start]}.south) -- ({names[end]}.north);\n")
    else:
        left = min(node.box.x for node in nodes)
        right = max(node.box.x + node.box.w for node in nodes)
        top = min(node.box.cy for node in nodes)
        span = max(right - left, 1)
        x_scale = 11.0 / span
        for node in nodes:
            x, y = (node.box.cx - left) * x_scale, -(node.box.cy - top) * 1.4
            width = max(1.0, min(node.box.w * x_scale - 0.12, 4.3))
            content.append(f"\\node[book node,text width={width:.3f}cm] ({names[node.id]}) at ({x:.3f},{y:.3f}) {{{text(node)}}};\n")
        for annotation in diagram.annotations:
            x, y = (annotation.box.cx - left) * x_scale, -(annotation.box.cy - top) * 1.4
            width = min(annotation.box.w * x_scale, 4.7)
            content.append(f"\\node[align=center,font=\\footnotesize,text width={width:.3f}cm] at ({x:.3f},{y:.3f}) {{{inline(annotation.text)}}};\n")
        lookup = {node.id: node for node in nodes}
        for start, end in diagram.edges:
            a, b = lookup[start], lookup[end]
            if abs(a.box.cx - b.box.cx) > abs(a.box.cy - b.box.cy):
                anchors = ("east", "west") if a.box.cx < b.box.cx else ("west", "east")
            else:
                anchors = ("south", "north") if a.box.cy < b.box.cy else ("north", "south")
            content.append(f"\\draw[book edge] ({names[start]}.{anchors[0]}) -- ({names[end]}.{anchors[1]});\n")
        for start, end in diagram.links:
            a, b = lookup[start], lookup[end]
            if abs(a.box.cx - b.box.cx) > abs(a.box.cy - b.box.cy):
                anchors = ("east", "west") if a.box.cx < b.box.cx else ("west", "east")
            else:
                anchors = ("south", "north") if a.box.cy < b.box.cy else ("north", "south")
            content.append(f"\\draw[line width=0.35pt] ({names[start]}.{anchors[0]}) -- ({names[end]}.{anchors[1]});\n")
    content.extend(["\\end{tikzpicture}\n", r"\caption{" + caption + r"}\label{" + label + "}\n\\end{figure}\n"])
    return "".join(content)
