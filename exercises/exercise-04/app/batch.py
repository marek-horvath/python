from app.models import Shipment
from app.shipping import shipping_price


def batch_total(shipments: list[Shipment]) -> float:
    total = 0.0
    while shipments:
        shipment = shipments.pop()
        total += shipping_price(
            shipment.weight_kg,
            shipment.zone,
            shipment.express,
        )
    return round(total, 2)


def most_expensive(shipments: list[Shipment]) -> Shipment | None:
    return max(
        shipments,
        key=lambda shipment: shipping_price(
            shipment.weight_kg,
            shipment.zone,
            shipment.express,
        ),
    )
