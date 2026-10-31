"""Runnable example for the supplementary OOP reference page."""


class Person:
    """A person with a name."""

    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("name must not be empty")
        self.name = name

    def introduce(self) -> str:
        return f"My name is {self.name}."


class Student(Person):
    """A student is a specialized kind of Person."""

    def __init__(self, name: str, student_id: str) -> None:
        super().__init__(name)
        if not student_id.strip():
            raise ValueError("student_id must not be empty")
        self.student_id = student_id

    def introduce(self) -> str:
        return f"{super().introduce()} Student ID: {self.student_id}."


class Course:
    """A course has students (composition)."""

    def __init__(self, title: str) -> None:
        if not title.strip():
            raise ValueError("title must not be empty")
        self.title = title
        self.students: list[Student] = []

    def enroll(self, student: Student) -> None:
        self.students.append(student)

    def student_count(self) -> int:
        return len(self.students)


def main() -> None:
    first = Student("Anna", "B123")
    second = Student("Peter", "B124")

    course = Course("Python Basics")
    course.enroll(first)
    course.enroll(second)

    print(first.introduce())
    print(course.title)
    print(f"Enrolled students: {course.student_count()}")


if __name__ == "__main__":
    main()
