from pathlib import Path

from app.batch import batch_total, most_expensive
from app.models import Shipment


def render_report(shipments: list[Shipment]) -> str:
    expensive = most_expensive(shipments)
    return (
        f"Shipments: {len(shipments)}\n"
        f"Total price: {batch_total(shipments):.2f} EUR\n"
        f"Most expensive: {expensive.reference}\n"
    )


def save_report(path: Path, content: str) -> None:
    path.write_text(content)
