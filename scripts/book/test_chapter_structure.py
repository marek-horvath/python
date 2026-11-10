import unittest
import tempfile
from pathlib import Path
from unittest.mock import patch

from generate import Book, lecture_sections, markdown, page_content
from test_generate import pptx


class ChapterStructureTests(unittest.TestCase):
    def test_topics_follow_named_anchors_after_a_slide_is_inserted(self):
        profile = {"lectureSections": [{"before": "Paths", "title": "Working with paths"},
                                        {"before": "Move", "title": "Safe changes"}]}
        self.assertEqual(lecture_sections(profile, ["Cover", "Paths", "Plan", "Move"]),
                         {2: "Working with paths", 4: "Safe changes"})
        self.assertEqual(lecture_sections(profile, ["Cover", "New example", "Paths", "Plan", "Move"]),
                         {3: "Working with paths", 5: "Safe changes"})

    def test_missing_or_ambiguous_source_anchor_requires_editorial_update(self):
        profile = {"lectureSections": [{"before": "Paths", "title": "Working with paths"}]}
        for titles in [["Cover", "Renamed topic"], ["Cover", "Paths", "Paths"]]:
            with self.subTest(titles=titles), self.assertRaises(ValueError):
                lecture_sections(profile, titles)

    def test_topics_cannot_repeat_or_reverse_source_order(self):
        for anchors in [["Second", "First"], ["First", "First"]]:
            with self.subTest(anchors=anchors), self.assertRaises(ValueError):
                lecture_sections({"lectureSections": [{"before": name, "title": name} for name in anchors]},
                                 ["Cover", "First", "Second"])

    def test_optional_structure_and_invalid_editorial_values(self):
        self.assertEqual(lecture_sections({}, ["Cover", "Topic"]), {})
        for profile in [[], {"lectureSections": {}}, {"lectureSections": [{"before": "Topic", "title": ""}]}]:
            with self.subTest(profile=profile), self.assertRaises(ValueError):
                lecture_sections(profile, ["Cover", "Topic"])

    def test_resources_replace_only_the_leading_file_title_and_retain_links(self):
        source = "\n# Zdroje — Prednáška 02\n\n## Cesty\n\n[Path docs](https://docs.python.org/3/library/pathlib.html)\n\n# Ďalšia časť\nText."
        output = markdown(source, 3, omit_title=True)
        self.assertNotIn("Prednáška 02", output)
        self.assertIn("Cesty", output)
        self.assertIn("https://docs.python.org/3/library/pathlib.html", output)
        self.assertIn("Ďalšia časť", output)
        self.assertIn("Prednáška 02", markdown(source, 3))

    def test_topic_opening_uses_one_heading_and_keeps_the_explanation_and_anchor(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            with pptx(text="Cesty", note="") as archive:
                (root / "01.sk.pptx").write_bytes(archive.fp.getvalue())
            with pptx(text="Cesty", note="Tu sa začína vysvetlenie práce s cestami.") as archive:
                (root / "01.sk-commented.pptx").write_bytes(archive.fp.getvalue())
            book = Book({}, {}, root, False)
            book.chapter_profiles = {"1": {"lectureSections": [{"before": "Cesty", "title": "Súbory a cesty"}]}}
            output, count, explained = book.lecture({"number": 1, "title": "Automatizácia"}, {"source": {"sk": "01.sk.pptx"}})
            self.assertIn(r"\section{Súbory a cesty}", output)
            self.assertNotIn(r"\subsection*{Cesty}", output)
            self.assertIn("Tu sa začína vysvetlenie práce s cestami.", output)
            self.assertIn(r"\label{slide-01-1}", output)
            self.assertEqual((count, explained), (1, 1))
            self.assertEqual(book.coverage["01-001"]["heading_merged_into"], "Súbory a cesty")

    def test_resources_start_with_content_but_retain_later_subheadings(self):
        source = "# Zdroje\n\n## Oficiálna dokumentácia\n\n[Docs](https://docs.python.org/)\n\n## Ďalšie témy\nText."
        output = markdown(source, 3, omit_intro_headings=True)
        self.assertNotIn("Zdroje", output)
        self.assertNotIn("Oficiálna dokumentácia", output)
        self.assertIn("https://docs.python.org/", output)
        self.assertIn(r"\subsubsection*{Ďalšie témy}", output)

    def test_source_files_keep_their_paths_captions_and_code_without_extra_headings(self):
        with tempfile.TemporaryDirectory() as directory, patch("generate.ROOT", Path(directory)):
            root = Path(directory)
            example = root / "example.py"
            readme = root / "README.md"
            source = 'value = False\nprint(value)'
            example.write_text(source, encoding="utf-8")
            readme.write_text("# Ukážkový program\n\nPopis programu.\n\n## Spustenie\nĎalší text.", encoding="utf-8")
            output = Book({}, {}, root, False).listings([example, readme], "example")
            self.assertNotIn(r"\subsection*{example.py}", output)
            self.assertNotIn(r"\subsection*{README.md}", output)
            self.assertNotIn("Ukážkový program", output)
            self.assertIn(r"\sourcefile{example.py}", output)
            self.assertIn(r"\captionof{listing}{example.py}", output)
            self.assertIn(source, output)
            self.assertIn("Popis programu.", output)
            self.assertIn(r"\subsubsection*{Spustenie}", output)

    def test_task_group_heading_is_omitted_but_numbered_tasks_and_their_text_remain(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "index.html"
            source.write_text('<main><h2>Úlohy</h2><section class="worksheet-task"><h2>Úloha 1 — Referencie a kópie</h2><p>Vytvorte nezávislú kópiu zoznamu.</p></section></main>', encoding="utf-8")
            output = page_content(source, "https://example.org/", 1)
            self.assertNotIn(r"\subsection*{Úlohy}", output)
            self.assertIn(r"\exerciseheading{", output)
            self.assertIn("Referencie a kópie", output)
            self.assertIn("Vytvorte nezávislú kópiu zoznamu.", output)


if __name__ == "__main__":
    unittest.main()
