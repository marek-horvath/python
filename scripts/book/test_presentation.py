from io import BytesIO
import unittest
from zipfile import ZipFile

from generate import inline, table_inline, tex
from presentation import Box, Diagram, Table, Text, native_diagram, native_table, read_slide


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
        self.assertTrue(any(isinstance(item, Text) and item.text == "00" for item in slide.items))
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


if __name__ == "__main__":
    unittest.main()
