# Prednáška 10 — Web backend v Pythone

## Hlavná myšlienka

Vlastné API prirodzene spája viacero tém predmetu: typing, HTTP, JSON, validáciu, databázy, testovanie, konfiguráciu a bezpečnosť.

## Narrative flow

1. Od API klienta k API serveru.
2. Prvá FastAPI aplikácia a Uvicorn.
3. Routing, path a query parameters.
4. Request body, Pydantic validácia a response models.
5. Status codes, HTTPException a malý CRUD povrch.
6. In-memory prototyp a prechod na databázu.
7. SQLAlchemy, `Depends` a separation of concerns.
8. OpenAPI, `/docs`, validačné chyby.
9. Security, CORS, middleware, async, testing a deployment.
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
2. GET `/`;
3. path parameter;
4. Pydantic model;
5. POST endpoint;
6. `/docs`;
7. ak zostane čas, jednoduchý database call.
