from dataclasses import dataclass


records = [
    ("Anna", "Python", 92),
    ("Peter", "Python", 67),
    ("Anna", "Databázy", 85),
    ("Lucia", "Python", 78),
    ("Peter", "Databázy", 74),
    ("Martin", "Python", 45),
    ("Lucia", "Databázy", 88),
]


@dataclass
class Result:
    student: str
    course: str
    points: int


def average_score(results: list[Result]) -> float:
    raise NotImplementedError


def best_result(results: list[Result]) -> Result:
    raise NotImplementedError


def results_for_course(results: list[Result], course: str) -> list[Result]:
    raise NotImplementedError


def passed_students(results: list[Result], minimum: int = 51) -> set[str]:
    raise NotImplementedError


def main() -> None:
    # TODO: konvertuj records na list[Result]
    # TODO: vypíš požadované výsledky
    pass


if __name__ == "__main__":
    main()
