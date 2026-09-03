# Programovanie v Pythone

Repozitár predmetu **Programovanie v Pythone** pre Technickú univerzitu v Košiciach, Fakultu elektrotechniky a informatiky, študijný program Aplikovaná informatika.

Projekt je zámerne jednoduchý: statický Astro web, týždne predmetu v samostatných adresároch a web-native prezentácie písané v TypeScripte. Web má organizovať materiály, nie pôsobiť ako marketingová stránka.

## Rýchly štart

Požiadavky:

- Node.js aspoň `22.12.0`;
- npm aspoň `9.6.5`;
- Python 3 pre validáciu ukážkových kódov.

```bash
npm install
npm run dev
```

Lokálny web beží štandardne na `http://127.0.0.1:4321/`.

## Hlavné príkazy

```bash
npm run dev
npm run dev:status
npm run dev:logs
npm run dev:stop
npm run validate
npm run typecheck
npm run build
npm run build:pages
npm run deploy:pages
npm run export:pptx -- 1
```

`npm run build` spustí validáciu a statický build webu do `dist/web/`.

`npm run export:pptx -- 1` vytvorí sekundárny PowerPoint export z webového slide modelu do `dist/presentations/`. Zdrojom pravdy zostáva `weeks/week-01-modern-python/lecture.ts`.

## GitHub Pages

Repozitár používa model **Deploy from branch**:

- `main` obsahuje zdrojový kód predmetu;
- `gh-pages` obsahuje vygenerovaný statický web;
- `dist/` sa necommitne do `main`.

Build pre GitHub Pages:

```bash
npm run build:pages
```

Build a push do vetvy `gh-pages`:

```bash
npm run deploy:pages
```

Pre projektovú GitHub Pages URL sa build spúšťa s `PUBLIC_BASE_PATH=/python`, takže výsledný web je pripravený pre adresu `https://marek-horvath.github.io/python/`.

V GitHub nastaveniach použite:

```text
Settings -> Pages -> Build and deployment -> Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

## Jazyk webu

Web podporuje slovenčinu a angličtinu. Slovenčina je default. Jazyk sa prepína v navigácii cez `SK | EN` a ukladá sa do `localStorage` pod kľúčom `python-course.language`.

Existujúce URL sa nemenia. Prepnutie jazyka zachová aktuálnu stránku, hash aj lokálny progress cvičení.

## Architektúra

- `shared/course.config.ts` obsahuje globálne metadata predmetu a hlavnú navigáciu.
- `shared/weeks.ts` skladá autoritatívny zoznam týždňov z jednotlivých `week.config.ts`.
- `shared/lectures.ts` registruje publikované webové prednášky.
- `shared/exercises.ts` registruje publikované cvičenia.
- `weeks/week-XX-*/` izoluje obsah daného týždňa.
- `weeks/week-01-modern-python/lecture.ts` je zdroj webových slajdov prvej prednášky.
- `exercises/exercise-01/` obsahuje starter súbory pre prvé cvičenie.
- `solutions/exercise-01/` obsahuje neverejné referenčné riešenia pre vyučujúceho.
- `web/` obsahuje statický Astro web.
- `scripts/validate.ts` kontroluje štruktúru, metadata, slajdy a Python ukážky.
- `scripts/export-pptx.ts` poskytuje voliteľný PPTX export.
- `shared/i18n.ts` obsahuje jazykový model, shared UI preklady a centrálne anglické názvy týždňov.
- `docs/` dokumentuje rozhodnutia a workflow.

## Verejné stránky

- `/` - úvod predmetu;
- `/prednasky/` - jednoduchý zoznam prednášok;
- `/prednasky/01-moderny-python/` - webová prezentácia prednášky 01;
- `/prednasky/02-skriptovanie-automatizacia/` - webová prezentácia prednášky 02;
- `/prednasky/03-gui-event-driven/` - webová prezentácia prednášky 03;
- `/cvicenia/` - zoznam cvičení;
- `/cvicenia/01-moderny-python-v-praxi/` - pracovný list cvičenia 01;
- `/projekt/` - semestrálny projekt;
- `/navody/` - praktické návody;
- `/cheatsheet/` - Python cheatsheet.

## Stav obsahu

Skeleton existuje pre 10 týždňov predmetu. Pripravené sú prednášky 01-10, cvičenia 01-10, semestrálny projekt, návody a cheatsheet. Web má hotový dvojjazyčný režim SK/EN pre shared UI, homepage, Projekt, Návody, Cheatsheet, prednášky aj cvičenia.
