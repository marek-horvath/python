from dataclasses import replace
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from commentary import Section, digest, initial_body, prose_paragraphs, read, render, synchronize
from generate import Book, markdown, slide_fingerprints, slide_order, speaker_notes
from presentation import Box, Paragraph, Text
from test_generate import pptx


def section(body="Úvod.\n\n<!-- material: 1 -->\n\nVysvetlenie.", notes="Pôvodný výklad.", visual=None):
    return Section(1, "ppt/slides/slide1.xml", visual or digest("visual"), digest(notes), digest(body), "Ukážka", body)


def material(value, role="code"):
    return Text("1", [Paragraph(value)], Box(), 2000, True, False, 0, role)


class CommentaryTests(unittest.TestCase):
    def test_round_trip_keeps_unicode_markdown_and_code(self):
        entry = section('Číslo `value`.\n\n<!-- material: 1 -->\n\n```python\nprint("Košice")\n```')
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "01commentary.md"
            synchronize(path, "Prednáška 01", [entry])
            self.assertEqual(read(path)[1][1], entry)

    def test_interleaved_explanation_is_rendered_in_author_order(self):
        body = "Najprv vysvetlenie.\n\n<!-- material: 2 -->\n\nPotom dôsledok.\n\n<!-- material: 1 -->\n\nZáver."
        result, used = render(body, ["FIRST-CODE\n", "SECOND-CODE\n"], markdown)
        self.assertTrue(used)
        self.assertLess(result.index("Najprv"), result.index("SECOND-CODE"))
        self.assertLess(result.index("SECOND-CODE"), result.index("Potom"))
        self.assertLess(result.index("Potom"), result.index("FIRST-CODE"))
        self.assertLess(result.index("FIRST-CODE"), result.index("Záver"))
        self.assertEqual(result.count("FIRST-CODE"), 1)

    def test_missing_duplicate_or_unknown_material_is_rejected(self):
        for body in ["Text", "<!-- material: 1 -->\n<!-- material: 1 -->", "<!-- material: 2 -->", "<!-- material: zle -->"]:
            with self.subTest(body=body), self.assertRaises(ValueError):
                render(body, ["Code"], markdown)

    def test_markers_and_html_comments_inside_code_are_literal(self):
        body = '```html\n<!-- material: 99 -->\n<!-- Vstupné HTML -->\n```\n\n<!-- material: 1 -->'
        result, used = render(body, ["MATERIAL"], markdown)
        self.assertTrue(used)
        self.assertIn("<!-- material: 99 -->", result)
        self.assertIn("<!-- Vstupné HTML -->", result)
        self.assertIn("MATERIAL", result)

    def test_missing_notes_only_render_public_material(self):
        result, used = render(initial_body("", [material("x = 1")]), ["x = 1"], markdown)
        self.assertEqual(result, "x = 1")
        self.assertFalse(used)

    def test_split_preserves_all_words_and_initial_layout_alternates_with_code(self):
        notes = " ".join(f"Toto je podrobné vysvetlenie kroku číslo {number} a jeho výsledku." for number in range(1, 13))
        paragraphs = prose_paragraphs(notes)
        self.assertEqual(" ".join(paragraphs).split(), notes.split())
        self.assertGreater(len(paragraphs), 1)
        body = initial_body(notes, [material("x = 1"), material("y = 2")])
        result, used = render(body, ["CODE-ONE\n", "CODE-TWO\n"], lambda value: value + "\n")
        self.assertTrue(used)
        self.assertLess(result.index(paragraphs[0]), result.index("CODE-ONE"))
        self.assertIn(paragraphs[-1], result[result.index("CODE-TWO"):])
        self.assertEqual(body.count("<!-- material:"), 2)

    def test_existing_paragraphs_and_decimal_numbers_survive(self):
        text = "Priemer je 11.25 a typ float64.\n\nshape je (4,), nie ďalší rozmer."
        self.assertEqual(prose_paragraphs(text), ["Priemer je 11.25 a typ float64.", "shape je (4,), nie ďalší rozmer."])

    def test_repeated_import_is_identical_and_updates_untouched_sections(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "01commentary.md"
            original = section()
            synchronize(path, "Prednáška", [original])
            before = path.read_bytes()
            synchronize(path, "Prednáška", [original])
            self.assertEqual(path.read_bytes(), before)
            fresh = section("Nový výklad.\n\n<!-- material: 1 -->", notes="Nové poznámky.")
            result, issues = synchronize(path, "Prednáška", [fresh])
            self.assertEqual(result[1].body, fresh.body)
            self.assertFalse(issues)

    def test_sync_never_overwrites_manual_edit_even_when_pptx_changed(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "01commentary.md"
            original = section()
            synchronize(path, "Prednáška", [original])
            path.write_text(path.read_text(encoding="utf-8").replace("Vysvetlenie.", "Vlastný doplnený text."), encoding="utf-8")
            fresh = section(notes="Nové poznámky.", visual=digest("changed"))
            result, issues = synchronize(path, "Prednáška", [fresh])
            self.assertIn("Vlastný doplnený text.", result[1].body)
            self.assertEqual(result[1].visual, original.visual)
            self.assertEqual(len(issues), 1)
            candidates = list(path.parent.glob("*.incoming-*.md"))
            self.assertEqual(len(candidates), 1)
            self.assertEqual(read(candidates[0])[1][1], fresh)

    def test_deleted_slides_remain_in_editable_source_with_warning(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "01commentary.md"
            synchronize(path, "Prednáška", [section(), replace(section(), number=2)])
            result, issues = synchronize(path, "Prednáška", [section()])
            self.assertIn(2, result)
            self.assertEqual(len(issues), 1)

    def test_corrupted_metadata_or_outside_text_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "01commentary.md"
            synchronize(path, "Prednáška", [section()])
            original = path.read_text(encoding="utf-8")
            for bad in [original + "Stratený text", original.replace('"number": 1', '"number": "1"'), original + section().dump()]:
                path.write_text(bad, encoding="utf-8")
                with self.assertRaises(ValueError):
                    read(path)


class BookCommentaryTests(unittest.TestCase):
    def test_visual_fingerprint_accepts_renumbering_but_rejects_code_changes(self):
        with pptx() as original, pptx(shape_id="50") as renumbered, pptx(text="Iný kód") as changed:
            self.assertEqual(slide_fingerprints(original), slide_fingerprints(renumbered))
            self.assertNotEqual(slide_fingerprints(original), slide_fingerprints(changed))

    def test_notes_are_exported_then_read_without_the_private_pptx(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            public_path = root / "01.sk.pptx"
            private_path = root / "01.sk-commented.pptx"
            with pptx(note="") as archive:
                public_path.write_bytes(archive.fp.getvalue())
            with pptx(note="Podrobný výklad z poznámok.") as archive:
                private_path.write_bytes(archive.fp.getvalue())
            week, presentation = {"number": 1, "title": "Úvod"}, {"source": {"sk": "01.sk.pptx"}}
            path, entries = Book({}, {}, root, False).prepare_commentary(week, presentation)
            self.assertIn("Podrobný výklad", entries[1].body)
            before = path.read_bytes()
            private_path.unlink()
            Book({}, {}, root, False).prepare_commentary(week, presentation)
            self.assertEqual(path.read_bytes(), before)

    def test_saved_commentary_reflows_after_material_grouping_without_private_pptx(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(note="") as archive:
                (root / "01.sk.pptx").write_bytes(archive.fp.getvalue())
            week, presentation = {"number": 1, "title": "Úvod"}, {"source": {"sk": "01.sk.pptx"}}
            path, entries = Book({}, {}, root, False).prepare_commentary(week, presentation)
            header, _ = read(path)
            old = entries[1]
            # An earlier adapter emitted one material. The current title-only
            # fixture emits zero; keep the explanation while migrating slots.
            old.body = "Pôvodný výklad sa nesmie stratiť.\n\n<!-- material: 1 -->"
            old.imported = digest(old.body)
            path.write_text(header + old.dump(), encoding="utf-8")
            _, migrated = Book({}, {}, root, False).prepare_commentary(week, presentation)
            self.assertIn("Pôvodný výklad sa nesmie stratiť.", migrated[1].body)
            self.assertNotIn("<!-- material:", migrated[1].body)
            self.assertEqual(migrated[1].visual, old.visual)

    def test_manual_saved_commentary_is_preserved_when_material_grouping_changes(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(note="") as archive:
                (root / "01.sk.pptx").write_bytes(archive.fp.getvalue())
            week, presentation = {"number": 1, "title": "Úvod"}, {"source": {"sk": "01.sk.pptx"}}
            path, entries = Book({}, {}, root, False).prepare_commentary(week, presentation)
            header, _ = read(path)
            entries[1].body = "Ručná úprava.\n\n<!-- material: 1 -->"
            path.write_text(header + entries[1].dump(), encoding="utf-8")
            book = Book({}, {}, root, False)
            _, migrated = book.prepare_commentary(week, presentation)
            self.assertIn("Ručná úprava.", migrated[1].body)
            self.assertIn("<!-- material: 1 -->", migrated[1].body)
            self.assertTrue(list(path.parent.glob("*.incoming-*.md")))
            self.assertEqual(len(book.issues), 1)

    def test_stale_notes_are_retained_in_markdown_and_excluded_from_book(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(text="Aktuálny nadpis", note="") as archive:
                (root / "01.sk.pptx").write_bytes(archive.fp.getvalue())
            with pptx(text="Starý nadpis", note="Tento text nesmie byť pri novej ukážke.") as archive:
                (root / "01.sk-commented.pptx").write_bytes(archive.fp.getvalue())
            book = Book({}, {}, root, False)
            week, presentation = {"number": 1, "title": "Úvod"}, {"source": {"sk": "01.sk.pptx"}}
            path, entries = book.prepare_commentary(week, presentation)
            self.assertIn("Tento text", entries[1].body)
            result, slides, used = book.lecture(week, presentation)
            self.assertIn("Aktuálny nadpis", result)
            self.assertNotIn("Tento text", result)
            self.assertEqual((slides, used), (1, 0))
            self.assertTrue(any("nezodpovedá" in issue for issue in book.issues))

    def test_student_commentary_can_be_disabled_explicitly(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(note="") as archive:
                (root / "01.sk.pptx").write_bytes(archive.fp.getvalue())
            book = Book({}, {"studentCommentary": False}, root, True)
            result, _, used = book.lecture({"number": 1}, {"source": {"sk": "01.sk.pptx"}})
            self.assertEqual(used, 0)
            self.assertFalse((root / "book/local/commentary").exists())

    def test_both_variants_use_manual_markdown_at_the_material_position(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(note="") as archive:
                public = archive.fp.getvalue()
                (root / "01.sk.pptx").write_bytes(public)
            week, presentation = {"number": 1, "title": "Úvod"}, {"source": {"sk": "01.sk.pptx"}}
            book = Book({}, {}, root, False)
            path, _ = book.prepare_commentary(week, presentation)
            header, entries = read(path)
            # This minimal fixture has a title but no body objects. The
            # source explanation can still be written and used independently.
            entries[1].body = "Ručne doplnený výklad s `value`.\n\nDruhý samostatný odsek."
            path.write_text(header + entries[1].dump(), encoding="utf-8")
            for student in [False, True]:
                content, count, notes = Book({}, {}, root, student).lecture(week, presentation)
                self.assertIn("Ručne doplnený výklad", content)
                self.assertIn("Druhý samostatný odsek.", content)
                self.assertEqual((count, notes), (1, 1))
            self.assertEqual((root / "01.sk.pptx").read_bytes(), public)


if __name__ == "__main__":
    unittest.main()
