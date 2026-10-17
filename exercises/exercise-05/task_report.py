from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

import httpx


BASE_URL = "https://jsonplaceholder.typicode.com"
FIXTURE_DIR = Path(__file__).parent


@dataclass(frozen=True)
class User:
    id: int
    name: str
    username: str
    email: str


@dataclass(frozen=True)
class Todo:
    id: int
    user_id: int
    title: str
    completed: bool


class ApiError(Exception):
    """A readable problem that the CLI can report without a traceback."""


def parse_user(data: dict) -> User:
    raise NotImplementedError("Doplňte v úlohe 2.")


def parse_todo(data: dict) -> Todo:
    raise NotImplementedError("Doplňte v úlohe 2.")


def find_user(users: list[User], query: str) -> User:
    raise NotImplementedError("Doplňte v úlohe 3.")


def format_report(user: User, todos: list[Todo]) -> str:
    raise NotImplementedError("Doplňte v úlohe 5.")


class ApiClient:
    def __init__(self, base_url: str = BASE_URL, timeout: float = 5.0) -> None:
        self.client = httpx.Client(
            base_url=base_url,
            timeout=timeout,
            headers={"User-Agent": "python-course-task-report/1.0"},
        )

    def get_users(self) -> list[User]:
        raise NotImplementedError("Doplňte v úlohách 1 až 3.")

    def get_user_todos(self, user_id: int) -> list[Todo]:
        raise NotImplementedError("Doplňte v úlohách 4 až 6.")

    def create_todo(self, user_id: int, title: str) -> Todo:
        raise NotImplementedError("Doplňte v úlohe 8.")

    def complete_todo(self, todo_id: int) -> Todo:
        raise NotImplementedError("Doplňte v úlohe 9.")

    def delete_todo(self, todo_id: int) -> None:
        raise NotImplementedError("Doplňte v úlohe 9.")

    def close(self) -> None:
        self.client.close()


def create_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Report používateľov a ich úloh")
    subparsers = parser.add_subparsers(dest="command", required=True)

    report = subparsers.add_parser("report", help="zobrazí report používateľa")
    report.add_argument("user", help="username alebo e-mail")
    report.add_argument("--offline", action="store_true", help="načíta lokálne fixtures")

    create = subparsers.add_parser("create", help="vytvorí novú úlohu")
    create.add_argument("user", help="username alebo e-mail")
    create.add_argument("title", help="názov úlohy")

    complete = subparsers.add_parser("complete", help="označí úlohu ako hotovú")
    complete.add_argument("todo_id", type=int)
    return parser


def main() -> None:
    args = create_parser().parse_args()
    raise NotImplementedError(f"Doplňte spracovanie príkazu: {args.command}")


if __name__ == "__main__":
    main()
