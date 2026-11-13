"""Read a UTF-8 text file located beside this script."""

from pathlib import Path

text_file = Path(__file__).with_name("notes-sample.txt")

try:
    content = text_file.read_text(encoding="utf-8")
except FileNotFoundError:
    print(f"File not found: {text_file.name}")
else:
    print(content.strip())
