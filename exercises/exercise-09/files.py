from pathlib import Path

BASE_DIR = Path("uploads")


def load_file(filename: str) -> str:
    path = BASE_DIR / filename
    return path.read_text(encoding="utf-8")


def save_file(filename: str, content: str) -> None:
    path = BASE_DIR / filename
    path.write_text(content, encoding="utf-8")
