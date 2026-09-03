from dataclasses import dataclass
from pathlib import Path


@dataclass
class Student:
    name: str
    score: int


def passed(student: Student, limit: int = 51) -> bool:
    return student.score >= limit


def main() -> None:
    students = [
        Student("Eva", 91),
        Student("Adam", 48),
    ]
    successful = [student.name for student in students if passed(student)]
    print(successful)
    print(Path("data").exists())


if __name__ == "__main__":
    main()
