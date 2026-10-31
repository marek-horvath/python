from pathlib import Path

DATA_DIR = Path(__file__).parent
RESULTS_PATH = DATA_DIR / "programming_results.csv"
STUDENTS_PATH = DATA_DIR / "students.csv"


def main() -> None:
    print(f"Results: {RESULTS_PATH.name}")
    print(f"Registry: {STUDENTS_PATH.name}")
    raise NotImplementedError("Implement the ten worksheet tasks.")


if __name__ == "__main__":
    main()
