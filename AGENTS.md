# Pravidlá práce v tomto repozitári

Tento súbor je persistentná inštrukcia pre budúcu prácu na predmete **Programovanie v Pythone**.

## Jazyk a publikum

- Obsah určený študentom píš v slovenčine.
- Texty webu, slajdov, zadaní a materiálov píš v slovenčine.
- Web podporuje `sk` a `en`. Slovenčina je default, angličtina sa aplikuje cez i18n vrstvu a `localStorage` kľúč `python-course.language`.
- Anglické preklady píš prirodzenou odbornou angličtinou, nie doslovným prekladom slovenských viet.
- Neprekladaj technické identifikátory, názvy Python API, commands, package names, filenames, HTTP methods ani SQL/Python keywords.
- Zdrojový kód, názvy premenných, názvy funkcií, Python API a názvy knižníc nechávaj prirodzene v angličtine.
- Publikum: študenti 2. ročníka Aplikovanej informatiky na TUKE FEI.

## Hlavný smer projektu

- Projekt má byť jednoduchý univerzitný web predmetu, nie SaaS produkt.
- Nepoužívaj backend, databázu, autentifikáciu, CMS ani admin rozhranie, pokiaľ si to vyučujúci výslovne nevyžiada.
- Minimalizuj JavaScript a závislosti.
- Web má primárne organizovať materiály.
- Stránka konkrétnej prednášky má byť samotná prezentácia.

## Zdroj pravdy

- Globálne metadata predmetu sú v `shared/course.config.ts`.
- Metadata týždňa sú v `weeks/week-XX-*/week.config.ts`.
- Zoznam týždňov skladá `shared/weeks.ts`.
- Publikované prednášky registruje `shared/presentations.ts`.
- Publikované cvičenia registruje `shared/exercises.ts`.
- Editovateľný zdroj každej prednášky je v `presentations/` ako `.sk.pptx` a `.en.pptx`.
- Základné i18n typy, shared UI preklady a centrálne anglické názvy týždňov sú v `shared/i18n.ts`.
- Veľké obsahové stránky používajú jeden layout a prepínajú text cez `LocalizedText` alebo `data-i18n-*`, nie cez duplicitu samostatných SK/EN komponentov.
- Web nesmie ručne duplikovať zoznam týždňov, názvy, slugs ani statusy.

## Organizácia týždňov

Každý týždeň má vlastný izolovaný adresár:

```text
weeks/week-XX-topic/
  week.config.ts
  outline.md
  resources.md
  examples/
  assets/
  output/
```

Nezasahuj do ostatných týždňov, pokiaľ to nevyžaduje zdieľaná infraštruktúra.

## Web

- Navigácia je iba: `Úvod`, `Prednášky`, `Cvičenia`, `Projekt`, `Návody`, `Cheatsheet`.
- `/prednasky/` je jednoduchý typografický zoznam prednášok.
- `/prednasky/XX-slug/` je fullscreen webová prezentácia.
- `/cvicenia/` je zatiaľ jednoduchý skeleton podľa týždňov.
- `/cvicenia/XX-slug/` je pracovný list, nie prezentácia.
- `/projekt/` je verejne označená ako `Projekt` a obsahuje jedno semestrálne zadanie.
- `/zadania/` je iba spätné presmerovanie na `/projekt/`.
- Nevytváraj veľké hero sekcie, CTA, štatistiky, marketingové bloky ani gridy kariet.

## Prezentácie

- Primárnym zdrojom prezentácie je editovateľný `.pptx` súbor v `presentations/`.
- Každá prednáška má `XX-slug.sk.pptx` a `XX-slug.en.pptx`; web podľa zvoleného jazyka použije správnu verziu.
- Build renderuje PPTX cez LibreOffice do PNG a existujúci Astro viewer ich preklikáva cez kliknutie, klávesy, fullscreen a hash v URL.
- Po manuálnej úprave PPTX spusti `npm run presentations:render` alebo `npm run build`. Po pushi do `main` rovnaký krok vykoná GitHub Actions a aktualizuje `gh-pages`.
- Slajdy drž minimalistické, typografické a čitateľné.
- Jeden slide má komunikovať jednu hlavnú vec.
- Reálne 50-60 min prednášky plánuj približne na 35-45 slajdov.
- Nevytváraj speaker notes, presenter notes, hidden lecturer-only text ani `notes` položky v slajdoch.
- Ak prezentujúci potrebuje oporu, samotný verejný slide má byť dostatočne jasný bez toho, aby obsahoval celý hovorený skript.
- Kódové slajdy drž typicky na 5-15 riadkoch kódu.
- Kód má zostať text, nie screenshot IDE.

## Cvičenia

- Cvičenie nie je prezentácia.
- Stránka cvičenia má byť samostatne riešiteľný worksheet pre študenta.
- Každá úloha má mať kontext, vstupné dáta, presné požiadavky a podľa potreby očakávaný výstup.
- Nerob gamifikáciu, slider, carousel, progress bar ani veľké karty úloh.
- Starter súbory môžu byť v `exercises/exercise-XX/`.
- Verejne stiahnuteľné starter ZIP súbory patria do `web/static/downloads/`.
- Referenčné riešenia pre vyučujúceho patria do `solutions/exercise-XX/` a nesmú byť routované ani kopírované do `web/static`.

## Vizuálny systém

- Spoločný štýl je v `web/src/styles/global.css`.
- Preferuj dobrú typografiu, presný spacing, jednoduché deliace čiary, čitateľný kód a minimum dekorácie.
- Nepoužívaj neon purple/blue gradienty, glow efekty, glassmorphism, dekoratívne blob tvary, veľké rounded cards, pill badges, fake dashboardy ani generický AI kurz vzhľad.
- Nepoužívaj font-size odvodený od šírky viewportu.
- Slajdy majú logické rozmery 1280×720 a škálujú sa ako celok.

## Workflow rozpracovania prednášky

Keď príde požiadavka typu "Rozpracuj týždeň 2":

1. Prečítaj `week.config.ts`, `outline.md` a `resources.md` daného týždňa.
2. Navrhni learning outcomes.
3. Navrhni narrative flow prednášky.
4. Rozdeľ prednášku na 3-5 častí.
5. Odhadni počet slajdov.
6. Identifikuj kódové príklady.
7. Identifikuj diagramy.
8. Identifikuj otázky a live demo checkpointy.
9. Až potom vytvor alebo rozšír oba PPTX súbory v `presentations/`.
10. Zaregistruj prednášku v `shared/presentations.ts`.
11. Spusti `npm run validate`, `npm run typecheck` a `npm run build`.
12. Otvor web, preklikaj prednášku a oprav vizuálne problémy.

## Build a validácia

- Použi `npm run dev` na lokálny web.
- Použi `npm run validate` na kontrolu metadát, slajdov a Python ukážok.
- Použi `npm run typecheck` na TypeScript kontrolu.
- Použi `npm run build` na statický web.
- Použi `npm run presentations:render` na prevod PPTX do webového vieweru.

## Stav týždňa

Používaj iba statusy:

- `planned`
- `in-progress`
- `published`

Na verejnom webe sa zobrazujú slovenské labely. Nepublikované materiály web nesmie ponúkať ako hotové študentské zdroje.
