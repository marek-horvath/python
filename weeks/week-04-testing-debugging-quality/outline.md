# Týždeň 04 - Testovanie, debugging a kvalita kódu

Stav: rozpracované ako kompletná webová prednáška.

## Cieľ prednášky

Prednáška odpovedá na otázku: ako vieme, že program funguje a že sme ho ďalšou zmenou nepokazili? Dôraz je na praktické overovanie funkcií, skriptov a oddelenej aplikačnej logiky z GUI.

## Learning outcomes

Po prednáške má študent vedieť:

- rozlíšiť manuálne skúšanie a reprodukovateľný automatický test;
- napísať jednoduchý pytest test s `assert`;
- vysvetliť input, expected output, actual output a assertion;
- použiť viac testovacích prípadov a rozpoznať edge cases;
- použiť `pytest.mark.parametrize`, `pytest.raises` a jednoduchú fixture;
- testovať funkciu pracujúcu so súbormi cez `tmp_path`;
- vysvetliť mocking ako náhradu externej závislosti v teste;
- čítať základný traceback;
- použiť debugger a rozumieť breakpoint, step over, step into, variables a call stack;
- rozlíšiť `print`, `logging`, `assert`, input validation, formatter, linter, type checker a tests.

## Narrative flow

1. Začíname situáciou „funguje to u mňa“ a ukazujeme jej limity.
2. Definujeme test cez očakávaný a skutočný výsledok.
3. Predstavíme pytest, test discovery, výstup a zlyhanie testu.
4. Rozšírime testovanie o edge cases, parametrizáciu, exceptions a fixtures.
5. Prepojíme testovateľnosť s prednáškami 02 a 03: súbory cez `tmp_path`, GUI logika cez oddelené funkcie.
6. Vysvetlíme regression testy.
7. Prejdeme k debuggingu, tracebacku a loggingu.
8. Záver patrí formatteru, linteru, type checkeru, Ruffu a jednoduchej quality pipeline.

## Časti prednášky

- A - Čo je test a prečo manuálne skúšanie nestačí
- B - pytest: assert, discovery, edge cases, parametrizácia, exceptions, fixtures
- C - Testovanie súborov, GUI logiky, mocking a regression testy
- D - Debugging, debugger a traceback
- E - Logging a assertions v aplikačnom kóde
- F - Formatter, linter, type checker, Ruff a quality pipeline
- G - Live demo a záver

## Približný rozsah

- 43 slajdov
- 50-60 minút
- približne 5 otázok/interakcií
- 1 live demo checkpoint na 5-8 minút

## Live demo

Názov: Od bugu k regression testu.

Postup:

1. ukázať jednoduchú chybnú funkciu;
2. reprodukovať chybu manuálne;
3. napísať test;
4. spustiť test, ktorý zlyhá;
5. opraviť implementáciu;
6. spustiť test znova;
7. ukázať `ruff check .` alebo `ruff format .`, ak je dostupný.
