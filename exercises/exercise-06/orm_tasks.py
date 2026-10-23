from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session


class Base(DeclarativeBase):
    pass


# TODO: Vytvorte typované modely Equipment, Customer a Rental.
# Použite Mapped, mapped_column, ForeignKey a obojsmerné relationship.


engine = create_engine("sqlite:///equipment_rental_orm.db")


def add_equipment(
    session: Session,
    asset_code: str,
    name: str,
    category: str,
    daily_rate: float,
    available_count: int,
):
    # TODO: Vytvorte, uložte a vráťte nový Equipment objekt.
    raise NotImplementedError


def customers_with_active_rentals(session: Session):
    # TODO: Vráťte zákazníkov s aktívnou výpožičkou bez duplicít.
    raise NotImplementedError
