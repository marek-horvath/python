# Programovanie v Pythone

Repozitár predmetu **Programovanie v Pythone** pre Technickú univerzitu v Košiciach, Fakultu elektrotechniky a informatiky, študijný program Aplikovaná informatika.

Projekt je zámerne jednoduchý: statický Astro web, týždne predmetu v samostatných adresároch a PowerPoint prezentácie renderované do existujúceho webového vieweru. Web má organizovať materiály, nie pôsobiť ako marketingová stránka.

## Rýchly štart

Požiadavky:

- Node.js aspoň `22.12.0`;
- npm aspoň `9.6.5`;
- Python 3 pre validáciu ukážkových kódov.
- LibreOffice a Poppler (`pdftoppm`) pre renderovanie PPTX do webového vieweru.

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
npm run presentations:render
```

`npm run build` najprv vyrenderuje PPTX slajdy, potom spustí validáciu a statický build webu do `dist/web/`.

PPTX sú zdrojom pravdy. Každá prednáška má v priečinku `presentations/` dve verzie: slovenskú `.sk.pptx` a anglickú `.en.pptx`. Pri zmene prezentácie stačí upraviť príslušný PPTX, commitnúť ho a pushnúť. Build vytvorí nové obrázky slajdov, ktoré používa rovnaký fullscreen viewer s kliknutím, klávesmi, fullscreen režimom a URL hashom.

`npm run presentations:render` spustí iba konverziu PPTX → PDF → PNG. Príkaz `npm run presentations:seed` je jednorazová migračná pomôcka pre vytvorenie počiatočných deckov; nepúšťajte ho po manuálnych úpravách PPTX. Prepísanie existujúcich zdrojov vyžaduje výslovné `npm run presentations:seed -- --replace`.

## GitHub Pages

Repozitár používa model **Deploy from branch**:

- `main` obsahuje zdrojový kód predmetu vrátane PPTX;
- `gh-pages` obsahuje vygenerovaný statický web;
- `dist/` sa necommitne do `main`.

Build pre GitHub Pages:

```bash
npm run build:pages
```

Lokálny build a push do vetvy `gh-pages`:

```bash
npm run deploy:pages
```

Push do `main` automaticky spustí workflow, ktorý vyrenderuje PPTX a aktualizuje vetvu `gh-pages`. GitHub Pages teda naďalej používa režim **Deploy from a branch**; workflow iba aktualizuje jej statický obsah.

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
- `shared/presentations.ts` registruje publikované prezentácie a ich PPTX zdroje.
- `shared/exercises.ts` registruje publikované cvičenia.
- `weeks/week-XX-*/` izoluje obsah daného týždňa.
- `presentations/` obsahuje editovateľné PPTX zdroje všetkých prednášok.
- `exercises/exercise-01/` obsahuje starter súbory pre prvé cvičenie.
- `solutions/exercise-01/` obsahuje neverejné referenčné riešenia pre vyučujúceho.
- `web/` obsahuje statický Astro web.
- `scripts/validate.ts` kontroluje štruktúru, metadata, slajdy a Python ukážky.
- `scripts/render-presentations.mjs` renderuje PPTX do obrázkov pre webový viewer.
- `shared/i18n.ts` obsahuje jazykový model, shared UI preklady a centrálne anglické názvy týždňov.
- `docs/` dokumentuje rozhodnutia a workflow.

## Verejné stránky

- `/` - úvod predmetu;
- `/prednasky/` - jednoduchý zoznam prednášok;
- `/prednasky/01-uvod-ku-pythonu/` - webová prezentácia prednášky 01;
- `/prednasky/02-skriptovanie-automatizacia/` - webová prezentácia prednášky 02;
- `/prednasky/03-gui-event-driven/` - webová prezentácia prednášky 03;
- `/cvicenia/` - zoznam cvičení;
- `/cvicenia/01-uvod-ku-pythonu-v-praxi/` - pracovný list cvičenia 01;
- `/projekt/` - semestrálny projekt;
- `/navody/` - praktické návody;
- `/cheatsheet/` - Python cheatsheet.

## Stav obsahu

Skeleton existuje pre 10 týždňov predmetu. Pripravené sú prednášky 01-10, cvičenia 01-10, semestrálny projekt, návody a cheatsheet. Web má hotový dvojjazyčný režim SK/EN pre shared UI, homepage, Projekt, Návody, Cheatsheet, prednášky aj cvičenia.
