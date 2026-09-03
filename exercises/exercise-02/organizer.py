from pathlib import Path


def find_files(directory: Path, extension: str) -> list[Path]:
    """Return files with the selected extension, including subdirectories."""
    # TODO: implement in task 2
    return []


def load_config(path: Path) -> dict[str, list[str]]:
    """Load JSON category configuration."""
    # TODO: implement in task 3
    return {}


def organize_files(
    directory: Path,
    config: dict[str, list[str]],
    dry_run: bool = False,
) -> dict[str, int]:
    """Organize files into category folders and return counts."""
    # TODO: implement in task 4
    return {}


def main() -> None:
    # TODO: implement CLI in task 5
    directory = Path("sample_downloads")
    print(f"Directory: {directory}")


if __name__ == "__main__":
    main()

