from pathlib import Path

ROOT = Path(__file__).resolve().parent
START_PAGE = ROOT / "events" / "page1.html"


def main() -> None:
    print(f"Static programme: {START_PAGE}")
    raise NotImplementedError("Implement the event worksheet tasks.")


if __name__ == "__main__":
    main()
