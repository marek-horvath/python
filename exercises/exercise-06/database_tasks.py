from pathlib import Path
import sqlite3

DATABASE_PATH = Path("course_results.db")


def connect() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def create_schema(connection: sqlite3.Connection) -> None:
    # TODO: načítajte schema.sql a vytvorte tabuľky.
    pass


def seed_database(connection: sqlite3.Connection) -> None:
    # TODO: vložte starter dáta cez parameterized queries.
    pass


def get_student_by_email(connection: sqlite3.Connection, email: str) -> sqlite3.Row | None:
    # TODO: vráťte jedného študenta podľa emailu.
    return None


def results_for_course(connection: sqlite3.Connection, course_title: str) -> list[sqlite3.Row]:
    # TODO: vráťte výsledky pre predmet zoradené podľa bodov.
    return []


def add_result_transaction(
    connection: sqlite3.Connection,
    student_email: str,
    course_title: str,
    points: int,
) -> None:
    # TODO: dvojkroková operácia s commit/rollback.
    pass


def main() -> None:
    with connect() as connection:
        create_schema(connection)
        seed_database(connection)
        rows = results_for_course(connection, "Python")
        for row in rows:
            print(dict(row))


if __name__ == "__main__":
    main()
