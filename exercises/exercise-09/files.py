from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent / "uploads"


def load_application_attachment(application, current_user_id: int) -> str:
    path = BASE_DIR / application["attachment"]
    return path.read_text(encoding="utf-8")


def save_preferences(filename: str, content: str) -> None:
    path = BASE_DIR / filename
    path.write_text(content, encoding="utf-8")
