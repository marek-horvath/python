# Prednáška 06 — Databázy v Pythone

## Hlavná myšlienka

Python aplikácie často potrebujú dáta ukladať, vyhľadávať, meniť a udržať konzistentné aj po ďalšom spustení programu. CSV a JSON sú užitočné formáty, ale pri častých zmenách, vzťahoch a dotazoch je vhodnejšia databáza.

## Narrative flow

1. Prečo nestačí súbor: od CSV/JSON k databáze.
2. SQLite ako jednoduchá reálna databáza bez servera.
3. Priama práca cez `sqlite3`: connection, SQL, parametre, commit, SELECT.
4. Konzistencia dát: constraints, foreign keys, JOIN, transakcie.
5. SQLAlchemy: objektová vrstva, modely, engine, session, základné CRUD.
6. Kedy použiť SQL a kedy ORM.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť, kedy je databáza vhodnejšia než CSV alebo JSON;
- vytvoriť jednoduchú SQLite databázu z Pythonu;
- použiť parametrizované SQL dotazy;
- rozumieť významu `commit`, transakcie a rollbacku;
- čítať výsledky `SELECT` dotazu v Pythone;
- rozpoznať základné databázové constraints;
- použiť jednoduchý JOIN;
- vysvetliť základnú myšlienku ORM;
- vytvoriť základný SQLAlchemy 2.x model a použiť `Session`.

## Priebežný príklad

Course Results Database:

- `students`
- `courses`
- `results`

Používa sa na ukážku jednoduchých tabuliek, vzťahov, JOIN dotazu a prechodu k ORM modelom.

## Live demo

Od prázdneho Python súboru:

1. `sqlite3.connect`;
2. `CREATE TABLE`;
3. parametrizovaný `INSERT`;
4. `commit`;
5. `SELECT`;
6. parameterized `SELECT`;
7. ak zostane čas, krátky náhľad SQLAlchemy modelu.
