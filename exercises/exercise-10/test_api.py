from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200


def test_create_item():
    # Úloha 9: doplňte test POST /items.
    pass


def test_missing_item_returns_404():
    # Úloha 9: doplňte test GET /items/{id} pre neexistujúci objekt.
    pass
