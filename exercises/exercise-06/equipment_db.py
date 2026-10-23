from pathlib import Path
import sqlite3


DATABASE_PATH = Path("equipment_rental.db")


def connect() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def create_schema(connection: sqlite3.Connection) -> None:
    # TODO: Načítajte a vykonajte schema.sql.
    raise NotImplementedError


def describe_schema(connection: sqlite3.Connection) -> dict[str, list[str]]:
    # TODO: Získajte tabuľky a stĺpce z metadát SQLite.
    raise NotImplementedError


def seed_database(connection: sqlite3.Connection) -> None:
    # TODO: Vložte EQUIPMENT a CUSTOMERS zo seed_data.py bez duplicít.
    raise NotImplementedError


def search_equipment(
    connection: sqlite3.Connection,
    category: str | None = None,
    max_daily_rate: float | None = None,
    available_only: bool = False,
) -> list[sqlite3.Row]:
    # TODO: Zostavte parametrizovaný dotaz podľa zadaných filtrov.
    raise NotImplementedError


def active_rentals(connection: sqlite3.Connection) -> list[sqlite3.Row]:
    # TODO: Vytvorte JOIN report aktívnych výpožičiek.
    raise NotImplementedError


def inventory_summary(connection: sqlite3.Connection) -> list[sqlite3.Row]:
    # TODO: Vytvorte agregovaný report po kategóriách.
    raise NotImplementedError


def checkout_equipment(
    connection: sqlite3.Connection,
    customer_email: str,
    asset_code: str,
    rented_at: str,
    due_at: str,
) -> int:
    # TODO: Vytvorte výpožičku a znížte dostupnosť v jednej transakcii.
    raise NotImplementedError


def return_equipment(
    connection: sqlite3.Connection,
    rental_id: int,
    returned_at: str,
) -> float:
    # TODO: Vráťte vybavenie a vypočítajte prípadný poplatok.
    raise NotImplementedError


def main() -> None:
    # TODO: Vytvorte CLI pre operácie uvedené v úlohe 10.
    raise NotImplementedError


if __name__ == "__main__":
    main()
