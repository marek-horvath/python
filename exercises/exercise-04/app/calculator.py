import math


def calculate_discount(price: float, discount: float) -> float:
    return price - price * discount


def validate_score(score: int) -> int:
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100.")
    return score


def final_grade(points: int) -> str:
    if points > 90:
        return "A"
    if points > 80:
        return "B"
    if points > 70:
        return "C"
    if points > 60:
        return "D"
    if points > 50:
        return "E"
    return "FX"

