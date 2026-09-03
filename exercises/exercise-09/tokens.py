import pickle
import random

API_KEY = "secret-value"


def generate_reset_token() -> str:
    value = random.randint(100000, 999999)
    return str(value)


def load_preferences(data: bytes):
    return pickle.loads(data)
