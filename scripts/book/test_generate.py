from io import BytesIO
from hashlib import sha256
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZipFile

from generate import Book, PageParser, html_tex, code, inline, matching_notes, matching_note_slides, page_content, speaker_notes, tex
from presentation import read_slide


def pptx(shape_id="2", text="Ukážka", note="Hovorený výklad.", media=b"image"):
    buffer = BytesIO()
    with ZipFile(buffer, "w") as archive:
        archive.writestr("ppt/presentation.xml", '''<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldIdLst><p:sldId id="256" r:id="s1"/></p:sldIdLst></p:presentation>''')
        archive.writestr("ppt/_rels/presentation.xml.rels", '''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="s1" Target="slides/slide1.xml"/></Relationships>''')
        archive.writestr("ppt/slides/slide1.xml", f'''<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><p:cSld><p:spTree><p:sp><p:nvSpPr><p:cNvPr id="{shape_id}"/></p:nvSpPr><p:txBody><a:p><a:r><a:rPr sz="3200"/><a:t>{text}</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:sld>''')
        archive.writestr("ppt/slides/_rels/slide1.xml.rels", '''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="notes" Target="../notesSlides/notesSlide9.xml"/></Relationships>''')
        archive.writestr("ppt/notesSlides/notesSlide9.xml", f'''<p:notes xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><p:sp><p:nvSpPr><p:nvPr><p:ph type="body"/></p:nvPr></p:nvSpPr><p:txBody><a:p><a:r><a:t>{note}</a:t></a:r></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:nvPr><p:ph type="sldNum"/></p:nvPr></p:nvSpPr><p:txBody><a:p><a:r><a:t>99</a:t></a:r></a:p></p:txBody></p:sp></p:notes>''')
        archive.writestr("ppt/media/image.png", media)
    buffer.seek(0)
    return ZipFile(buffer)


class HtmlTests(unittest.TestCase):
    def render(self, source):
        return html_tex(PageParser(source).root, "https://example.org/python/")

    def test_english_and_navigation_are_excluded_but_code_is_exact(self):
        source = '<main><nav>menu</nav><p><span data-lang="sk">Slovenčina &amp; text</span><span data-lang="en" hidden>English only</span></p><pre><code>if x:\n    print(&quot;á&quot;)\n</code></pre></main>'
        result = self.render(source)
        self.assertIn("Slovenčina \\& text", result)
        self.assertNotIn("English only", result)
        self.assertNotIn("menu", result)
        self.assertIn('if x:\n    print("á")', result)

    def test_links_work_with_both_astro_base_paths(self):
        for href in ["/cvicenia/07/", "/python/cvicenia/07/"]:
            self.assertIn("https://example.org/python/cvicenia/07/", self.render(f'<a href="{href}">Lab</a>'))
        self.assertIn("https://docs.python.org/", self.render('<a href="https://docs.python.org/">Docs</a>'))

    def test_syntax_highlighted_lines_keep_newlines_and_indentation(self):
        source = '<pre><code><span class="code-line">if score &gt;= 50:</span><span class="code-line">    status = <span class="tok-string">"passed"</span></span><span class="code-line"></span><span class="code-line">print(status)</span></code></pre>'
        result = self.render(source)
        self.assertIn('if score >= 50:\n    status = "passed"\n\nprint(status)', result)

    def test_table_has_real_columns_and_escaped_values(self):
        result = self.render('<table><tr><th>A</th><th>B</th></tr><tr><td>50%</td><td>x_y</td></tr></table>')
        self.assertIn(r"\begin{longtable}", result)
        self.assertIn(r"{50\%} & {x\_y}", result)

    def test_task_count_rejects_incomplete_worksheet(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "index.html"
            source.write_text('<main><section class="worksheet-task"><h2>Úloha 1</h2></section></main>', encoding="utf-8")
            self.assertIn(r"\exerciseheading{exercise-", page_content(source, "https://example.org/", 1))
            with self.assertRaises(ValueError):
                page_content(source, "https://example.org/", 10)


class PptxTests(unittest.TestCase):
    def test_notes_follow_relationships_not_matching_file_numbers(self):
        with pptx() as archive:
            self.assertEqual(speaker_notes(archive, "ppt/slides/slide1.xml"), "Hovorený výklad.")

    def test_shape_id_renumbering_preserves_visual_equivalence(self):
        with pptx(shape_id="2") as public, pptx(shape_id="52") as private:
            self.assertTrue(matching_notes(public, private))

    def test_changed_text_or_media_rejects_old_notes(self):
        for changes in [{"text": "Iná téma"}, {"media": b"different image"}]:
            with pptx() as public, pptx(**changes) as private:
                self.assertFalse(matching_notes(public, private))
                self.assertFalse(matching_note_slides(public, private))

    def test_presentation_title_is_not_read_from_legacy_ts(self):
        with pptx(text="Skutočný nadpis") as archive:
            self.assertEqual(read_slide(archive, "ppt/slides/slide1.xml").title, "Skutočný nadpis")


class EscapingTests(unittest.TestCase):
    def test_tex_special_characters_are_data(self):
        self.assertEqual(tex("a_b & 10%"), r"a\_b \& 10\%")
        self.assertEqual(tex(r"\input{secret}"), r"\textbackslash{}input\{secret\}")
        self.assertIn(r"\texttt{a\_\allowbreak{}b}", inline("Use `a_b`."))

    def test_verbatim_cannot_be_closed_by_source(self):
        with self.assertRaises(ValueError):
            code("print('example')\n\\end{Code}\n\\input{secret}")


class ReviewTests(unittest.TestCase):
    def test_changed_worksheet_invalidates_previous_solution_review(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            worksheet = root / "worksheet.txt"
            worksheet.write_text("Original contract", encoding="utf-8")
            fingerprint = sha256(f"worksheet.txt:{sha256(worksheet.read_bytes()).hexdigest()}".encode()).hexdigest()
            with patch("generate.ROOT", root):
                book = Book({}, {}, root, False)
                book.reviews = {"solutions-07": {"sha256": fingerprint, "reviewed": True}}
                self.assertTrue(book.reviewed("solutions-07", [worksheet]))
                worksheet.write_text("Changed contract", encoding="utf-8")
                self.assertFalse(book.reviewed("solutions-07", [worksheet]))
                self.assertEqual(len(book.issues), 1)


if __name__ == "__main__":
    unittest.main()
