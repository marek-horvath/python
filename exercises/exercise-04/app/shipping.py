ZONE_BASE_PRICE = {
    "SK": 2.50,
    "EU": 5.00,
}


def shipping_price(weight_kg: float, zone: str, express: bool) -> float:
    if weight_kg < 0 or weight_kg > 20:
        raise ValueError("Weight must be greater than zero and at most 20 kg.")

    price = ZONE_BASE_PRICE[zone]
    if weight_kg >= 5:
        price += 5
    elif weight_kg >= 1:
        price += 2

    if express:
        price *= 1.5

    return round(price, 2)
