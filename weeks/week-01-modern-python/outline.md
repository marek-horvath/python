# Prednáška 01 - Moderný Python pre programátora

## Cieľ

Ukázať Python študentom, ktorí už vedia programovať. Prednáška nemá vysvetľovať premennú, cyklus alebo funkciu od nuly. Má pomôcť prepnúť mentálny model z "preložím známy jazyk do Python syntaxe" na "píšem čitateľný Python s vlastnými idiomami".

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť, čo znamená, že Python je dynamicky typovaný jazyk;
- rozlíšiť meno, objekt, priradenie a kópiu;
- použiť `list`, `tuple`, `set` a `dict` podľa potreby;
- nahradiť indexové iterovanie prirodzenejším Python zápisom;
- použiť `enumerate()`, `zip()`, `items()`, slicing a unpacking;
- napísať jednoduchý list/set/dict comprehension a rozpoznať, kedy už škodí čitateľnosti;
- rozpoznať problém mutable default argument;
- použiť základné type hints a `dataclass`;
- vysvetliť základný význam `try/except`, importov, `main()` patternu a virtuálneho prostredia.

## Narrative flow

1. Čo je Python a kde sa používa.
2. Rozdiel oproti C-like jazykom: syntax, indentation, dynamic typing.
3. Mená, objekty, mutability a dátové štruktúry.
4. Pythonic iteration, slicing, unpacking a comprehensions.
5. Funkcie, type hints, dataclass, exceptions, importy a ekosystém.
6. Krátke live demo a mapa semestra.

## Interakcie

- Čo vypíše aliasing príklad s listom?
- Ktorá dátová štruktúra je vhodná na časté membership testy?
- Čo vypíše slicing so záporným krokom?
- Kedy je comprehension horší než explicitná slučka?
- Čo je zlé na mutable default argument?
- Čo je problém s `except: pass`?

## Live demo

Demo 1, REPL, približne 5 minút:

- list;
- slicing;
- comprehension;
- `enumerate()`;
- `dict.items()`.

Demo 2, súbor, približne 5 minút:

- funkcia;
- type hints;
- `dataclass`;
- `Path`;
- `if __name__ == "__main__"`.

## Rozsah

Webová prezentácia má 45 slajdov. To je horný okraj požadovaného rozsahu, ale slajdy sú krátke a väčšinou nesú jednu pointu.
