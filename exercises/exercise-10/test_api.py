from fastapi.testclient import TestClient

from main import app


def test_root(monkeypatch):
    monkeypatch.setattr("main.create_schema", lambda: None)
    with TestClient(app) as client:
        response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Notes API"}


def test_create_then_read():
    raise NotImplementedError("Use an isolated database and implement the scenario.")


def test_patch_can_clear_body():
    raise NotImplementedError("Distinguish an omitted body from explicit null.")
