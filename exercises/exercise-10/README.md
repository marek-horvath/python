# Cvičenie 10 — Web backend v Pythone

Starter projekt pre malé REST API.

Doména: **Notes API**

Súbory:

- `main.py` — FastAPI aplikácia a endpointy;
- `schemas.py` — Pydantic modely;
- `models.py` — SQLAlchemy model;
- `database.py` — engine a session helper;
- `test_api.py` — základ pre API testy.

Inštalácia:

```bash
python -m pip install fastapi uvicorn sqlalchemy pytest httpx
```

Spustenie:

```bash
uvicorn main:app --reload
```

Výstupom má byť funkčné CRUD API nad SQLite databázou, základné testy a stručné README s postupom spustenia.
