"""Runnable examples for the extended OOP learning module."""


class BankAccount:
    """An account stores state and exposes behavior through methods."""

    def __init__(self, owner: str, balance: float = 0) -> None:
        if not owner.strip():
            raise ValueError("owner must not be empty")
        if balance < 0:
            raise ValueError("balance must not be negative")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount


class Person:
    """Base class for people."""

    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("name must not be empty")
        self.name = name

    def introduce(self) -> str:
        return f"My name is {self.name}."


class Student(Person):
    """A Student is a specialized Person (is-a relationship)."""

    def __init__(self, name: str, student_id: str) -> None:
        super().__init__(name)
        if not student_id.strip():
            raise ValueError("student_id must not be empty")
        self.student_id = student_id

    def introduce(self) -> str:
        return f"{super().introduce()} Student ID: {self.student_id}."


class Course:
    """A Course has Student objects (has-a relationship / composition)."""

    def __init__(self, title: str) -> None:
        if not title.strip():
            raise ValueError("title must not be empty")
        self.title = title
        self.students: list[Student] = []

    def enroll(self, student: Student) -> None:
        self.students.append(student)

    def student_names(self) -> list[str]:
        return [student.name for student in self.students]


def main() -> None:
    account = BankAccount("Anna", 100)
    account.deposit(50)
    print(f"Balance: {account.balance}")

    first = Student("Anna", "B123")
    second = Student("Peter", "B124")
    course = Course("Python Basics")
    course.enroll(first)
    course.enroll(second)

    print(first.introduce())
    print(f"Course: {course.title}")
    print(f"Students: {', '.join(course.student_names())}")


if __name__ == "__main__":
    main()
