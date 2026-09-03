import csv
import json
from io import StringIO


CSV_DATA = """name,course,points
Anna,Python,82
Peter,Python,67
Lucia,Python,91
"""


def load_scores(text: str) -> list[dict[str, str]]:
    return list(csv.DictReader(StringIO(text)))


def to_json(rows: list[dict[str, str]]) -> str:
    cleaned = [
        {
            "name": row["name"],
            "course": row["course"],
            "points": int(row["points"]),
        }
        for row in rows
    ]
    return json.dumps(cleaned, ensure_ascii=False, indent=2)


def main() -> None:
    rows = load_scores(CSV_DATA)
    print(to_json(rows))


if __name__ == "__main__":
    main()
