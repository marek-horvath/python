from pathlib import Path
import argparse
import shutil


def category_for(suffix: str) -> str:
    suffix = suffix.lower()
    if suffix in {".pdf", ".docx"}:
        return "documents"
    if suffix in {".jpg", ".jpeg", ".png"}:
        return "images"
    if suffix == ".txt":
        return "text"
    return "other"


def organize(directory: Path, dry_run: bool) -> None:
    for source in directory.iterdir():
        if not source.is_file():
            continue

        category = category_for(source.suffix)
        target_dir = directory / category
        target = target_dir / source.name

        if dry_run:
            print(f"move {source.name} -> {category}/{source.name}")
            continue

        target_dir.mkdir(exist_ok=True)
        shutil.move(str(source), str(target))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Organizuje súbory podľa prípony.")
    parser.add_argument("directory", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not args.directory.is_dir():
        raise SystemExit(f"Adresár neexistuje: {args.directory}")

    organize(args.directory, args.dry_run)


if __name__ == "__main__":
    main()
