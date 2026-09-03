from sqlalchemy import ForeignKey, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)


class Result(Base):
    __tablename__ = "results"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    points: Mapped[int]

    student: Mapped[Student] = relationship()
    course: Mapped[Course] = relationship()


engine = create_engine("sqlite:///course_results_orm.db")


def create_student(session: Session, name: str, email: str) -> Student:
    # TODO: vytvorte a uložte študenta.
    raise NotImplementedError


def get_student(session: Session, student_id: int) -> Student | None:
    # TODO: načítajte študenta podľa id.
    return None


def update_student(session: Session, student_id: int, name: str) -> Student | None:
    # TODO: upravte meno študenta.
    return None


def delete_student(session: Session, student_id: int) -> bool:
    # TODO: odstráňte študenta, ak existuje.
    return False


def students_by_course(session: Session, course_title: str) -> list[Student]:
    statement = select(Student).join(Result).join(Course).where(Course.title == course_title)
    # TODO: vráťte študentov cez session.scalars(statement).all()
    return []
