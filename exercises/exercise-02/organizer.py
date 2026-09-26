import argparse
from pathlib import Path


def vypis_polozky(priecinok: Path) -> None:
    """Vypíše bezprostredné položky vstupného priečinka."""
    # TODO: úloha 1


def organizuj(priecinok: Path, vykonat: bool = False) -> dict[str, int]:
    """Naplánuje alebo vykoná organizáciu súborov podľa prípony."""
    # TODO: úlohy 2 až 4 a 6
    return {}


def parse_args() -> argparse.Namespace:
    """Načíta argumenty príkazového riadku."""
    # TODO: úloha 5
    parser = argparse.ArgumentParser(description="Triedi súbory podľa prípony.")
    return parser.parse_args()


def main() -> None:
    # Úloha 1 začína týmto výpisom. V úlohe 2 ho nahraďte volaním organizuj().
    vypis_polozky(Path("subory"))

    # TODO v úlohe 5 nahraďte hardcoded cestu argumentmi z parse_args().


if __name__ == "__main__":
    main()
