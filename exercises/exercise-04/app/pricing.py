def get_exchange_rate() -> float:
    raise RuntimeError("External service is not available in tests.")


def price_in_eur(price_usd: float) -> float:
    return price_usd * get_exchange_rate()

