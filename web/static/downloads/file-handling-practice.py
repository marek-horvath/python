"""Praktická ukážka čítania a zápisu textových súborov v Pythone.

Spustenie z koreňového priečinka projektu:
    python web/static/downloads/file-handling-practice.py

Skript číta súbor file-handling-sample.txt, ktorý musí byť vedľa tohto skriptu.
Výsledné zhrnutie uloží do systémového dočasného priečinka.
"""

from pathlib import Path
from tempfile import gettempdir

SAMPLE_FILE = Path(__file__).resolve().with_name("file-handling-sample.txt")
OUTPUT_FILE = Path(gettempdir()) / "python-file-handling-summary.txt"


def read_records(file_path: Path) -> list[tuple[str, str, int]]:
    """Načíta a skontroluje riadky vo formáte meno;predmet;body."""
    try:
        # with automaticky zatvorí súbor aj v prípade chyby.
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
    except FileNotFoundError:
        print(f"Testovací súbor sa nenašiel: {file_path}")
        return []
    except IsADirectoryError:
        print(f"Zadaná cesta je priečinok, nie súbor: {file_path}")
        return []
    except PermissionError:
        print(f"Nemáš oprávnenie na čítanie súboru: {file_path}")
        return []
    except UnicodeDecodeError:
        print("Súbor sa nepodarilo prečítať ako UTF-8.")
        return []

    records: list[tuple[str, str, int]] = []

    for line_number, line in enumerate(lines, start=1):
        line = line.strip()

        if not line or line.startswith("#"):
            continue

        parts = [part.strip() for part in line.split(";")]
        if len(parts) != 3:
            print(f"Riadok {line_number}: očakávajú sa 3 hodnoty.")
            continue

        name, subject, points_text = parts

        try:
            points = int(points_text)
        except ValueError:
            print(f"Riadok {line_number}: body musia byť celé číslo.")
            continue

        records.append((name, subject, points))

    return records


def write_summary(records: list[tuple[str, str, int]], file_path: Path) -> None:
    """Vytvorí súhrn a zapíše ho v UTF-8."""
    if not records:
        print("Nie sú k dispozícii žiadne platné záznamy.")
        return

    average = sum(points for _, _, points in records) / len(records)

    output_lines = [
        f"Počet záznamov: {len(records)}",
        f"Priemer bodov: {average:.1f}",
        "",
        "Prehľad:",
    ]

    for name, subject, points in records:
        output_lines.append(f"- {name}: {subject} – {points} bodov")

    # Path.write_text() vytvorí alebo prepíše výstupný súbor.
    file_path.write_text("\n".join(output_lines) + "\n", encoding="utf-8")


def main() -> None:
    records = read_records(SAMPLE_FILE)
    write_summary(records, OUTPUT_FILE)

    if records:
        print(f"Výstup bol uložený do: {OUTPUT_FILE}")
        print()
        print(OUTPUT_FILE.read_text(encoding="utf-8"))


if __name__ == "__main__":
    main()
