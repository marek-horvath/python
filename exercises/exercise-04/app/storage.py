from pathlib import Path


def save_report(path: Path, content: str) -> None:
    path.write_text(content)

