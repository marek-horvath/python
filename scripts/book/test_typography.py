from pathlib import Path
import tempfile
import unittest

from generate import TERMS, PageParser, code, html_tex, inline, inline_code, markdown, prose, table_inline
from terminology import Terminology


class TypographyTests(unittest.TestCase):
    def test_technical_terms_and_keywords_are_italic_in_prose(self):
        result = inline("Po strip() zostane whitespace, funkcia vráti False alebo True.")
        for term in ["strip", "whitespace", "False", "True"]:
            self.assertIn(r"\textit{" + term + "}", result)
        self.assertIn(r"strip}(\allowbreak{})", result)

    def test_longest_phrase_and_unicode_word_boundaries(self):
        result = inline("event loop; event loopu; striped; Falsehood; callbacková; callback")
        self.assertIn(r"\textit{event loop}", result)
        self.assertNotIn(r"\textit{strip}", result)
        self.assertNotIn(r"\textit{False}", result)
        self.assertIn("callbacková", result)
        self.assertEqual(result.count(r"\textit{callback}"), 1)

    def test_identifiers_urls_and_filenames_do_not_get_term_fragments(self):
        result = inline("`strip()` v https://example.org/strip a server.py, output_value, callback_count.")
        self.assertIn(inline_code("strip()"), result)
        self.assertNotIn(r"\textit{strip}", result)
        self.assertNotIn(r"\textit{server}", result)
        self.assertNotIn(r"\textit{value}", result)
        self.assertNotIn(r"\textit{callback}", result)

    def test_code_is_literal_even_when_dictionary_contains_its_words(self):
        source = 'if text.strip():\n    return False\n# whitespace and callback'
        result = code(source, language="python")
        self.assertIn(source, result)
        self.assertNotIn(r"\textit", result)
        self.assertIn(source, markdown("```python\n" + source + "\n```"))

    def test_empty_and_space_only_strings_preserve_straight_quotes_and_space_count(self):
        for renderer in [inline, inline_code, lambda source: html_tex(PageParser("<p>" + source + "</p>").root, "https://example.org/")]:
            with self.subTest(renderer=renderer):
                empty, spaces = renderer('""'), renderer('"   "')
                self.assertEqual(empty.count(r"\textquotedbl{}"), 2)
                self.assertNotIn(r"\textvisiblespace{}", empty)
                self.assertEqual(spaces.count(r"\textvisiblespace{}"), 3)
                self.assertEqual(spaces.count(r"\textquotedbl{}"), 2)

    def test_dictionary_formats_html_bullets_and_markdown_headings(self):
        output = html_tex(PageParser("<h3>Callback a whitespace</h3><ul><li>Funkcia vráti False.</li></ul>").root, "https://example.org/")
        self.assertIn(r"\subsubsection*{\textit{Callback} a \textit{whitespace}}", output)
        self.assertIn(r"\textit{False}", output)
        self.assertIn(r"\textit{callback}", markdown("## callback"))
        self.assertIn(r"\textit{event loop}", table_inline("event loop a callback"))

    def test_dictionary_cannot_inject_tex(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "terms.json"
            path.write_text('{"caseSensitive":["x_%"],"caseInsensitive":[]}', encoding="utf-8")
            dictionary = Terminology(path)
            from generate import tex
            self.assertEqual(dictionary.render("x_%", tex), r"\textit{x\_\%}")


if __name__ == "__main__":
    unittest.main()
