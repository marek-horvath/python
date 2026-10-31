import pickle
import random

API_KEY = "DEMO-NOT-A-REAL-KEY"


def generate_invitation_token() -> str:
    return str(random.randint(100000, 999999))


def consume_invitation(token, volunteer_id, now):
    raise NotImplementedError("Implement invitation ownership, expiry and single use.")


def load_preferences(data: bytes):
    return pickle.loads(data)
