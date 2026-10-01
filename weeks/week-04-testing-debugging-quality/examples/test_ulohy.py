import unittest

from ulohy import (
    odstran_ulohu,
    pocet_nesplnenych,
    prepni_ulohu,
    pridaj_ulohu,
)


class TestUlohy(unittest.TestCase):
    def setUp(self) -> None:
        self.zmiesane_ulohy = [
            {"text": "Poslať zadanie", "hotova": True},
            {"text": "Pripraviť slidy", "hotova": False},
        ]

    def test_pocet_prazdny(self) -> None:
        self.assertEqual(pocet_nesplnenych([]), 0)

    def test_pocet_zmiesany(self) -> None:
        self.assertEqual(pocet_nesplnenych(self.zmiesane_ulohy), 1)

    def test_pocet_vsetky_hotove(self) -> None:
        ulohy = [
            {"text": "Prvá", "hotova": True},
            {"text": "Druhá", "hotova": True},
        ]
        self.assertEqual(pocet_nesplnenych(ulohy), 0)

    def test_pocet_vsetky_nesplnene(self) -> None:
        ulohy = [
            {"text": "Prvá", "hotova": False},
            {"text": "Druhá", "hotova": False},
        ]
        self.assertEqual(pocet_nesplnenych(ulohy), 2)

    def test_pridanie_oreze_text(self) -> None:
        ulohy = []
        self.assertTrue(pridaj_ulohu(ulohy, "  Zavolať školiteľovi  "))
        self.assertEqual(
            ulohy,
            [{"text": "Zavolať školiteľovi", "hotova": False}],
        )

    def test_prazdny_text_sa_ignoruje(self) -> None:
        ulohy = []
        self.assertFalse(pridaj_ulohu(ulohy, "   \t"))
        self.assertEqual(ulohy, [])

    def test_prepnutie_v_oboch_smeroch(self) -> None:
        ulohy = [{"text": "Návrh", "hotova": False}]
        self.assertTrue(prepni_ulohu(ulohy, 0))
        self.assertTrue(ulohy[0]["hotova"])
        self.assertTrue(prepni_ulohu(ulohy, 0))
        self.assertFalse(ulohy[0]["hotova"])

    def test_neplatne_prepnutie_nemeni_data(self) -> None:
        povodne = [uloha.copy() for uloha in self.zmiesane_ulohy]
        self.assertFalse(prepni_ulohu(self.zmiesane_ulohy, 5))
        self.assertEqual(self.zmiesane_ulohy, povodne)

    def test_odstrani_vybranu_ulohu(self) -> None:
        self.assertTrue(odstran_ulohu(self.zmiesane_ulohy, 1))
        self.assertEqual(
            self.zmiesane_ulohy,
            [{"text": "Poslať zadanie", "hotova": True}],
        )

    def test_neplatne_odstranenie_nemeni_data(self) -> None:
        povodne = [uloha.copy() for uloha in self.zmiesane_ulohy]
        self.assertFalse(odstran_ulohu(self.zmiesane_ulohy, -1))
        self.assertEqual(self.zmiesane_ulohy, povodne)


if __name__ == "__main__":
    unittest.main()
