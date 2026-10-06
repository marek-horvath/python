from collections.abc import Iterable

from app.models import Shipment


def parse_shipment(line: str) -> Shipment:
    fields = line.split(";")
    if len(fields) != 4:
        raise ValueError("A shipment line must contain four fields.")

    reference, zone, weight_text, express_text = fields
    if not reference:
        raise ValueError("Shipment reference cannot be empty.")

    return Shipment(
        reference=reference,
        zone=zone,
        weight_kg=float(weight_text),
        express=bool(express_text),
    )


def load_shipments(lines: Iterable[str]) -> list[Shipment]:
    return [parse_shipment(line) for line in lines if line]
