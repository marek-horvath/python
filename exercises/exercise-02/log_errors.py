from pathlib import Path


def count_errors_by_day(path: Path) -> dict[str, int]:
    """Count ERROR log lines by date."""
    # TODO: implement in task 7
    return {}


if __name__ == "__main__":
    counts = count_errors_by_day(Path("logs/app.log"))
    for day, count in sorted(counts.items()):
        print(f"{day}: {count}")

