from pathlib import Path
from contextlib import contextmanager
from collections.abc import Iterator
import sqlite3

DATABASE_PATH = Path(__file__).resolve().parent / "volunteers.db"


@contextmanager
def connect(db_path=DATABASE_PATH) -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    try:
        with connection:
            yield connection
    finally:
        connection.close()


def initialize_demo_database(db_path=DATABASE_PATH) -> None:
    with connect(db_path) as connection:
        connection.executescript("""
            CREATE TABLE IF NOT EXISTS volunteers (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                hours INTEGER NOT NULL,
                owner_id INTEGER NOT NULL,
                attachment TEXT NOT NULL DEFAULT 'welcome.txt'
            );
            INSERT OR IGNORE INTO volunteers
                (id, name, email, hours, owner_id, attachment)
            VALUES
                (1, 'Ada Example', 'ada@example.test', 4, 101, 'welcome.txt'),
                (2, 'Mira Demo', 'mira@example.test', 8, 102, 'welcome.txt'),
                (3, 'Leo Sample', 'leo@example.test', 6, 103, 'welcome.txt');
        """)


def find_volunteer(name: str, db_path=DATABASE_PATH):
    query = f"SELECT * FROM volunteers WHERE name = '{name}'"
    with connect(db_path) as connection:
        return connection.execute(query).fetchall()


def create_volunteer(name, email, hours, owner_id, db_path=DATABASE_PATH):
    query = (
        "INSERT INTO volunteers(name, email, hours, owner_id) "
        f"VALUES ('{name}', '{email}', {hours}, {owner_id})"
    )
    with connect(db_path) as connection:
        return connection.execute(query).lastrowid
