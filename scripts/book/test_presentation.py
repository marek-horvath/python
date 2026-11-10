from io import BytesIO
import unittest
from zipfile import ZipFile

from generate import inline, table_inline, tex
from presentation import Box, CodeBlock, Diagram, Table, Text, Paragraph, native_diagram, native_table, read_slide, semantic_fragments


PREFIX = '<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><p:cSld><p:spTree>'
SUFFIX = '</p:spTree></p:cSld></p:sld>'


def shape(identifier, value, x, y, w=2, h=.4, size=1800, geometry="rect", mono=False):
    transform = f'<a:xfrm><a:off x="{int(x*914400)}" y="{int(y*914400)}"/><a:ext cx="{int(w*914400)}" cy="{int(h*914400)}"/></a:xfrm>'
    font = '<a:latin typeface="Consolas"/>' if mono else '<a:latin typeface="Aptos"/>'
    body = f'<p:txBody><a:p><a:r><a:rPr sz="{size}">{font}</a:rPr><a:t>{value}</a:t></a:r></a:p></p:txBody>' if value else ''
    return f'<p:sp><p:nvSpPr><p:cNvPr id="{identifier}"/></p:nvSpPr><p:spPr>{transform}<a:prstGeom prst="{geometry}"/></p:spPr>{body}</p:sp>'


def archive(content):
    buffer = BytesIO()
    with ZipFile(buffer, "w") as result:
        result.writestr("ppt/slides/slide1.xml", PREFIX + content + SUFFIX)
    buffer.seek(0)
    return ZipFile(buffer)


class PresentationTests(unittest.TestCase):
    def test_empty_and_whitespace_comparison_retains_inputs_and_their_properties(self):
        content = shape("1", "Empty inputs", .7, 1, size=3200)
        content += shape("2", '&quot;&quot;', 1, 2, w=4)
        content += shape("3", "Zero length", 1, 2.7, w=4).replace("<a:p>", "<a:p><a:pPr><a:buChar char='•'/></a:pPr>")
        content += shape("4", '&quot;   &quot;', 7, 2, w=4)
        content += shape("5", "Whitespace", 7, 2.7, w=4).replace("<a:p>", "<a:p><a:pPr><a:buChar char='•'/></a:pPr>")
        with archive(content) as source:
            slide = read_slide(source, "ppt/slides/slide1.xml")
        table = next(item for item in slide.items if isinstance(item, Table))
        self.assertEqual(table.rows, [['""', 'Zero length'], ['"   "', 'Whitespace']])
        self.assertEqual(slide.coverage()["converted"], 5)
        rendered = native_table(table, table_inline, "Inputs", "inputs")
        self.assertEqual(rendered.count(r"\textvisiblespace{}"), 3)

    def test_native_table_cells_and_separate_headers_are_all_preserved(self):
        title = shape("1", "Data model", .7, 1, size=3200)
        headers = shape("2", "Key", .8, 2.1, w=1.7) + shape("3", "Value", 2.8, 2.1, w=1.7)
        table = '''<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="4"/></p:nvGraphicFramePr><p:xfrm><a:off x="640080" y="2359152"/><a:ext cx="3657600" cy="914400"/></p:xfrm><a:graphic><a:graphicData><a:tbl><a:tblPr/><a:tblGrid><a:gridCol w="1828800"/><a:gridCol w="1828800"/></a:tblGrid><a:tr><a:tc><a:txBody><a:p><a:r><a:t>student_id</a:t></a:r></a:p></a:txBody></a:tc><a:tc><a:txBody><a:p><a:r><a:t>[active, archived]</a:t></a:r></a:p></a:txBody></a:tc></a:tr></a:tbl></a:graphicData></a:graphic></p:graphicFrame>'''
        with archive(title + headers + table) as source:
            slide = read_slide(source, "ppt/slides/slide1.xml")
        converted = next(item for item in slide.items if isinstance(item, Table))
        self.assertEqual(converted.headers, ["Key", "Value"])
        self.assertEqual(converted.rows, [["student_id", "[active, archived]"]])
        report = slide.coverage()
        self.assertEqual(report["objects"], report["converted"])
        output = native_table(converted, table_inline, "Data model", "data-model")
        self.assertIn(r"\begin{longtable}", output)
        self.assertIn(r"student\_\allowbreak{}id", output)
        self.assertNotIn("includegraphics", output)

    def test_arrows_have_the_same_endpoints_after_vertical_reflow(self):
        content = shape("1", "Pipeline", .7, 1, size=3200)
        content += shape("2", "input", 1, 3) + shape("3", "validate", 5, 3) + shape("4", "result", 9, 3)
        content += shape("5", "", 3.8, 3.1, .25, .3, geometry="chevron")
        content += shape("6", "", 7.8, 3.1, .25, .3, geometry="chevron")
        with archive(content) as source:
            slide = read_slide(source, "ppt/slides/slide1.xml")
        graph = next(item for item in slide.items if isinstance(item, Diagram))
        nodes = {node.id: node.texts[0].text for node in graph.nodes}
        self.assertEqual([(nodes[a], nodes[b]) for a, b in graph.edges], [("input", "validate"), ("validate", "result")])
        output = native_diagram(graph, inline, "Pipeline", "pipeline")
        self.assertIn("below=4mm", output)
        self.assertNotIn("includegraphics", output)
        self.assertEqual(slide.coverage()["converted"], 4)

    def test_one_line_code_result_zero_is_not_treated_as_slide_metadata(self):
        with archive(shape("1", "Result", .7, 1, size=3200) + shape("2", "00", .7, 3, mono=True)) as source:
            slide = read_slide(source, "ppt/slides/slide1.xml")
        self.assertTrue(any(isinstance(item, CodeBlock) and item.text == "00" for item in slide.items))
        self.assertEqual(slide.coverage()["objects"], 2)

    def test_vertical_chevrons_do_not_connect_independent_project_columns(self):
        content = shape("1", "Environments", .7, 1, size=3200)
        for column, x in enumerate([1, 7]):
            content += shape(f"{column}-a", f"Project {column}", x, 2, w=3)
            content += shape(f"{column}-b", f"Environment {column}", x, 3.4, w=3)
            content += shape(f"{column}-c", f"Dependencies {column}", x, 4.8, w=3)
            content += shape(f"{column}-arrow1", "", x+1.3, 2.9, .3, .3, geometry="chevron")
            content += shape(f"{column}-arrow2", "", x+1.3, 4.3, .3, .3, geometry="chevron")
        with archive(content) as source:
            slide = read_slide(source, "ppt/slides/slide1.xml")
        graph = next(item for item in slide.items if isinstance(item, Diagram))
        names = {node.id: node.texts[0].text for node in graph.nodes}
        self.assertEqual([(names[a], names[b]) for a, b in graph.edges], [
            ("Project 0", "Environment 0"), ("Environment 0", "Dependencies 0"),
            ("Project 1", "Environment 1"), ("Environment 1", "Dependencies 1")])

    def test_unknown_embedded_image_is_not_silently_rasterized(self):
        with archive(shape("1", "Title", .7, 1, size=3200) + "<p:pic/>") as source:
            with self.assertRaisesRegex(ValueError, "obrázok"):
                read_slide(source, "ppt/slides/slide1.xml")

    def test_table_cell_starting_with_bracket_cannot_be_row_spacing(self):
        table = Table("test", ["Input", "Result"], [["[1, 2]", "2"]], [], Box(), 0)
        output = native_table(table, tex, "Count", "count")
        self.assertIn("{[1, 2]} & {2}", output)


class FragmentTests(unittest.TestCase):
    def text(self, identifier, value, x, y, width=2, height=.3, mono=True, role="prose"):
        return Text(identifier, [Paragraph(value)], Box(x, y, width, height), 1800, mono, False, int(identifier), role)

    def test_operator_meanings_are_rows_and_the_caption_stays_with_its_code(self):
        items = [self.text("1", "==", 1, 2), self.text("2", "porovnáva hodnoty", .5, 2.6, width=3, mono=False),
                 self.text("3", "is", 1, 3.3), self.text("4", "porovnáva identitu", .5, 3.9, width=3, mono=False),
                 self.text("5", "identity check", 6, 2, role="label"), self.text("6", "value is None", 6, 2.6, role="code")]
        converted = semantic_fragments(items)
        table = next(item for item in converted if isinstance(item, Table))
        block = next(item for item in converted if isinstance(item, CodeBlock))
        self.assertEqual(table.rows, [["==", "porovnáva hodnoty"], ["is", "porovnáva identitu"]])
        self.assertEqual(block.caption, "identity check")
        self.assertEqual(block.text, "value is None")
        self.assertEqual(sorted(identifier for item in converted for identifier in item.source_ids), [str(n) for n in range(1, 7)])

    def test_unpacking_uses_named_columns_and_one_assignment_block(self):
        items = [self.text("1", "first, *middle, last = values", 1, 1, width=9)]
        for index, (value, name, x, width) in enumerate([("10", "first", 1, 1), ("20   30   40   50", "middle", 3, 4), ("60", "last", 9, 1)]):
            items.extend([self.text(str(index * 2 + 2), value, x, 3, width), self.text(str(index * 2 + 3), name, x, 4, width)])
        converted = semantic_fragments(items)
        table = next(item for item in converted if isinstance(item, Table))
        block = next(item for item in converted if isinstance(item, CodeBlock))
        self.assertEqual(table.headers, ["first", "middle", "last"])
        self.assertEqual(table.rows, [["10", "20   30   40   50", "60"]])
        self.assertEqual(block.text, "first, *middle, last = values")
        self.assertFalse(block.output)

    def test_subject_areas_keep_their_libraries_instead_of_pairing_two_headings(self):
        items = [self.text("1", "AUTOMATIZÁCIA", 1, 2, width=4), self.text("2", "pathlib · subprocess", 1, 2.6, width=4, mono=False),
                 self.text("3", "DÁTA", 7, 2, width=4), self.text("4", "NumPy · pandas", 7, 2.6, width=4, mono=False),
                 self.text("5", "WEB", 1, 4, width=4), self.text("6", "FastAPI", 1, 4.6, width=4, mono=False),
                 self.text("7", "DESKTOP", 7, 4, width=4), self.text("8", "Tkinter", 7, 4.6, width=4, mono=False)]
        table = semantic_fragments(items)[0]
        self.assertEqual(table.rows, [["AUTOMATIZÁCIA", "pathlib · subprocess"], ["DÁTA", "NumPy · pandas"], ["WEB", "FastAPI"], ["DESKTOP", "Tkinter"]])
        self.assertEqual(len(table.source_ids), 8)

    def test_expression_results_keep_each_expression_with_its_value(self):
        items = [self.text("1", "values[:3]", 1, 2), self.text("2", "[10, 20, 30]", 4, 2, width=4),
                 self.text("3", "values[::2]", 1, 3), self.text("4", "[10, 30, 50]", 4, 3, width=4)]
        table = semantic_fragments(items)[0]
        self.assertEqual(table.headers, ["Výraz", "Výsledok"])
        self.assertEqual(table.rows[0], ["values[:3]", "[10, 20, 30]"])
        self.assertEqual(table.rows[1], ["values[::2]", "[10, 30, 50]"])

    def test_adjacent_listing_parts_keep_newlines_and_output_is_marked_separately(self):
        items = [self.text("1", "python", 1, 1.5, height=.2, role="label"),
                 self.text("2", "results = [", 1, 2, role="code"),
                 self.text("3", '    Result("Anna", 92),\n]', 1, 2.5, height=.8, role="code"),
                 self.text("4", "OUTPUT", 7, 1.5, height=.2, role="label"), self.text("5", "92", 7, 2)]
        blocks = semantic_fragments(items)
        source = next(item for item in blocks if item.caption == "python")
        output = next(item for item in blocks if item.caption == "OUTPUT")
        self.assertEqual(source.text, 'results = [\n    Result("Anna", 92),\n]')
        self.assertFalse(source.output)
        self.assertTrue(output.output)
        self.assertEqual(output.text, "92")

    def test_grid_sketch_does_not_consume_the_python_program_as_a_cell(self):
        source = 'title.grid(row=0, column=0, columnspan=2)\nentry.grid(row=1, column=0)'
        items = [self.text("1", "column 0", 1, 2, role="label"), self.text("2", "column 1", 4, 2, role="label"),
                 self.text("3", "nadpis · columnspan=2", 1, 2.7, width=5, mono=False),
                 self.text("4", "Entry · row=1, column=0", 1, 4, mono=False), self.text("5", "Button · row=1, column=1", 4, 4, mono=False),
                 self.text("6", "python", 8, 2, role="label"), self.text("7", source, 8, 2.6, width=4, height=1, role="code")]
        converted = semantic_fragments(items)
        table = next(item for item in converted if isinstance(item, Table))
        block = next(item for item in converted if isinstance(item, CodeBlock))
        self.assertEqual(table.spanning_rows, [0])
        self.assertNotIn("7", table.source_ids)
        self.assertEqual(block.text, source)
        self.assertIn(r"\multicolumn{2}", native_table(table, table_inline, "Grid", "grid"))


if __name__ == "__main__":
    unittest.main()
