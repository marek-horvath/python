import sqlite3


def connect() -> sqlite3.Connection:
    return sqlite3.connect("users.db")


def find_user(name: str):
    query = f"SELECT id, name, email FROM users WHERE name = '{name}'"
    with connect() as connection:
        return connection.execute(query).fetchone()


def create_user(name: str, email: str) -> None:
    query = f"INSERT INTO users(name, email) VALUES ('{name}', '{email}')"
    with connect() as connection:
        connection.execute(query)
        connection.commit()
