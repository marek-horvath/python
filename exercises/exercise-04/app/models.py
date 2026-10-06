from dataclasses import dataclass


@dataclass(frozen=True)
class Shipment:
    reference: str
    zone: str
    weight_kg: float
    express: bool
