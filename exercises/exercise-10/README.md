# Cvičenie 10: Notes API

Desať úloh je na webe v cvičení 10. Doménou sú poznámky s archívom a vyhľadávaním, nie rezervácie z prednášky.

- `main.py`: aplikácia a routy. Funguje iba `GET /`; ostatné úmyselne vracajú 501.
- `schemas.py`: základné tvary modelov; validačné pravidlá dopĺňate vy.
- `models.py`: ORM model poznámky s jedinečným názvom a archívnym príznakom.
- `database.py`: engine, lokálna inicializácia schémy a životnosť session.
- `test_api.py`: základný test a dva nedokončené scenáre. Nedokončené testy zámerne zlyhávajú.

Po vytvorení a aktivácii virtuálneho prostredia:

```bash
python -m pip install fastapi uvicorn sqlalchemy pytest httpx
python -m uvicorn main:app --reload
```

Aplikácia je na http://127.0.0.1:8000 a dokumentácia na http://127.0.0.1:8000/docs.

Pred spustením nastavte prípadnú environment premennú `DATABASE_URL`. Default je `sqlite:///notes.db` relatívne k pracovnému adresáru. `.env.example` je iba šablóna; starter `.env` automaticky nenačítava.

Kontrakt úprav je dôležitý: neposlané `body` znamená ponechať pôvodnú hodnotu, explicitné `body: null` ju vymaže. `title: null`, `archived: null`, neznáme polia a prázdny PATCH sú neplatné. Jedinečnosť názvu platí po trimovaní a rozlišuje veľkosť písmen. Hľadanie `q` je doslovné a case-sensitive; `%` a `_` nie sú wildcardy.

Testy musia používať vlastnú dočasnú databázu a nahradiť potrebné závislosti pred inicializáciou pracovných dát. Dodaný základ testu a endpointov nie je hotové riešenie.

Projekt inicializuje novú schému cez `create_all`. Pri rozširovaní staršej vlastnej databázy to nie je migrácia: použite novú vývojovú databázovú cestu alebo vlastný migračný postup, nie mazanie existujúcich dát.

Odovzdajte kód, aspoň osem izolovaných testov, README a `api_contract.md`. Lokálnu databázu ani tajomstvá nedávajte do repozitára.
