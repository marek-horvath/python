"""Save Python data to a JSON file."""

import json
from pathlib import Path

settings = {
    "language": "sk",
    "notifications": True,
    "student": "Student",
}

output_file = Path(__file__).with_name("settings-output.json")
with output_file.open("w", encoding="utf-8") as file:
    json.dump(settings, file, ensure_ascii=False, indent=2)

print(f"Saved: {output_file.name}")
