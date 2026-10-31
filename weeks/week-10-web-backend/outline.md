# Prednáška 10 — Web backend v Pythone

## Hlavná myšlienka

Slovenská prednáška má 45 slajdov. Jedno rezervačné API prepája typing, HTTP, JSON, Pydantic 2, SQLAlchemy 2, validáciu, testovanie, konfiguráciu a bezpečnosť. Obsah pre generátor je v `deck.mjs`; verejným vizuálnym zdrojom zostáva PPTX. Anglická verzia sa nemení.

## Narrative flow

1. Od API klienta k API serveru.
2. Prvá FastAPI aplikácia a Uvicorn.
3. Routing, path a query parameters.
4. Request body, Pydantic validácia a response models.
5. Status codes, HTTPException a malý CRUD povrch.
6. In-memory prototyp a prechod na databázu.
7. SQLAlchemy, `Depends` a separation of concerns.
8. OpenAPI, `/docs`, validačné chyby.
9. Izolované testovacie SQLite, dependency override, konfigurácia, auth, CORS, async a deployment.
10. Zhrnutie celého semestra.

## Learning outcomes

Po prednáške má študent vedieť:

- vytvoriť minimálnu FastAPI aplikáciu;
- definovať endpointy cez route decorators;
- použiť path parameters, query parameters a request body;
- validovať vstup cez Pydantic model;
- rozlíšiť input a response model;
- použiť `HTTPException` a vhodný status code;
- vysvetliť základné prepojenie FastAPI so SQLAlchemy;
- pomenovať základné security a deployment rozdiely medzi development a production;
- vysvetliť, ako sa témy semestra spoja vo web backend aplikácii.

## Live demo

Od prázdneho súboru k API:

1. `FastAPI()`;
2. GET `/health`;
3. path parameter;
4. Pydantic model;
5. POST endpoint;
6. `/docs`;
7. pamäťový CRUD nahradiť databázovým CRUD vrátane detailu;
8. overiť create → read v odlišných requestoch nad izolovanou databázou;
9. overiť odmietnutie nuly hostí s inak platným vstupom.

Pri prechode na SQLAlchemy sa pôvodné pamäťové routy nahrádzajú, neregistrujú duplicitne. `PATCH` v tomto kontrakte interpretuje `null` ako bez zmeny. Otvorený výučbový prototyp nie je kompletný autentifikovaný rezervačný systém ani riešenie časových kolízií.
