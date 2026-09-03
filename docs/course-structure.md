# Štruktúra predmetu

## Týždne

Autoritatívny zoznam týždňov vzniká v `shared/weeks.ts`, ktorý importuje jednotlivé `week.config.ts` súbory. Web si zoznam týždňov nedrží ručne.

Každý týždeň má izolovaný adresár:

```text
weeks/week-XX-topic/
  week.config.ts
  outline.md
  resources.md
  lecture.ts        # iba pri rozpracovanej alebo publikovanej prednáške
  examples/
  assets/
  output/
```

Adresár týždňa je pracovná hranica. Pri rozpracovaní jedného týždňa nemeň ostatné týždne, pokiaľ to nevyžaduje spoločný slide model, webový komponent alebo globálne metadata.

## Cvičenia

Publikované cvičenia registruje `shared/exercises.ts`.

Starter súbory pre študentov sú v:

```text
exercises/exercise-XX/
```

Ak majú byť stiahnuteľné z webu, pripraví sa ZIP v:

```text
web/static/downloads/
```

Referenčné riešenia pre vyučujúceho sú v:

```text
solutions/exercise-XX/
```

Adresár `solutions/` nie je verejný webový obsah.

## Aktuálne týždne

1. Moderný Python pre programátora
2. Skriptovanie a automatizácia
3. GUI a event-driven programovanie
4. Testovanie, debugging a kvalita kódu
5. Internet, HTTP a API
6. Databázy v Pythone
7. Data Science v Pythone
8. Web scraping a automatizácia prehliadača
9. Bezpečné programovanie v Pythone
10. Web backend v Pythone

## Status

Interné statusy:

- `planned`;
- `in-progress`;
- `published`.

Na verejnom webe sa používajú slovenské labely:

- Plánované;
- Pripravuje sa;
- Publikované.

Nepublikované materiály sa nemajú tváriť ako dostupné študentské zdroje.
