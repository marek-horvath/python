# Pravidlá prezentácií

## Zdroj a formát

Primárnym zdrojom prezentácie je TypeScript súbor `lecture.ts` v adresári konkrétneho týždňa. Slajdy sa renderujú priamo na webe cez Astro komponenty.

PPTX export je sekundárny. Používa rovnaký slide model, ale nemá určovať dizajn ani workflow prednášky.

## Pedagogický princíp

Prezentácia podporuje výklad. Nemá byť kompletný skript prednášky.

Pri 50-60 min prednáške rátaj približne s 35-45 jednoduchými slajdmi. Jeden slajd má komunikovať jednu hlavnú vec: koncept, otázku, kódový krok, porovnanie, chybu, opravu, demo checkpoint alebo zhrnutie.

## Text

- Nadpis má pomenovať pointu, nie iba kategóriu.
- Nepíš 10-15 odrážok na jeden slajd.
- Dlhé vysvetlenie nepatrí na slajd. Ak je potrebné pre študentov, patrí do verejného materiálu alebo samostatnej stránky.
- Verejný text píš v slovenčine.
- Technické názvy, Python API, premenné a názvy funkcií nechávaj prirodzene v angličtine.

## Kód

- Python kód má zostať text, nie screenshot.
- Ideál je 5-15 riadkov kódu.
- Dlhší príklad rozdeľ na viac slajdov.
- Používaj `highlightLines`, keď chceš upriamiť pozornosť.
- Ak je blok prakticky spustiteľný, označ ho `runnable: true` alebo nechaj predvolenú validáciu.
- Ak blok nie je určený na spustenie, nastav `runnable: false`.

## Interakcie

Do bežnej prednášky plánuj 5-7 krátkych interakcií:

- "Čo vypíše tento program?"
- "Ktorý variant je čitateľnejší?"
- "Ktorú dátovú štruktúru by ste zvolili?"
- krátke hlasovanie pred spustením kódu.

Live demo checkpointy drž krátke. Slajd má povedať, čo demonštrovať; detailný postup patrí do verejného materiálu iba vtedy, keď ho študenti potrebujú.
