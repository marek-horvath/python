# Týždeň 04 - Testovanie, debugging a kvalita kódu

Stav: publikovaná 90-minútová prednáška so 44 slajdmi.

## Hlavná otázka

Ako prejdeme od pozorovania „počítadlo v TODO aplikácii ukazuje 2 namiesto 1“ k oprave, o ktorej vieme, že funguje a nepoškodila ostatné správanie?

Celá prednáška pracuje s jednou Tkinter TODO aplikáciou z predchádzajúceho týždňa. V zozname sú úlohy „Poslať zadanie“ a „Pripraviť slidy“; jedna je hotová a druhá nie. Správny údaj je `Nesplnené: 1`.

## Learning outcomes

Po prednáške má študent vedieť:

- zapísať reprodukčný postup, expected a actual výsledok;
- rozlíšiť výnimku od logickej chyby;
- použiť diagnostický výpis, traceback, `breakpoint()` a základné príkazy `pdb`;
- vytvoriť test cez `unittest.TestCase` a `self.assertEqual()`;
- overiť, že test s chybnou implementáciou najprv zlyhá;
- navrhnúť bežné, hraničné a regresné testy;
- izolovať mutable stav medzi testmi cez `setUp()`;
- oddeliť funkcie nad dátami od Tkinter callbackov;
- pomenovať, čo automatické testy dokazujú a čo musí zostať manuálnou GUI kontrolou.

## Narrative flow

1. Chybu presne pozorujeme a reprodukujeme.
2. Preskúmame skutočný stav dát cez výpis, traceback a debugger.
3. Výpočet oddelíme do funkcie a chybu zachytíme zlyhávajúcim testom.
4. Opravíme počet nesplnených a doplníme hraničné prípady.
5. Rovnakým spôsobom otestujeme pridanie, prepnutie a odstránenie úlohy.
6. Z testovateľnosti odvodíme kvalitnejšie rozdelenie GUI a dátovej logiky.
7. Spustíme celú desaťtestovú sadu a pomenujeme jej limity.

## Časti prednášky

- A - Od symptómu k reprodukovateľnému opisu chyby
- B - Preskúmanie dát, traceback a debugger
- C - Prvý zlyhávajúci test a oprava počítadla
- D - Testy operácií nad úlohami a hraničné prípady
- E - Testovateľný návrh a kvalita kódu
- F - Celá sada, limity testov a záverečná predikcia

## Rozsah

- 44 slajdov
- 90 minút
- jeden súvislý príklad TODO aplikácie
- automatické testy iba zo štandardnej knižnice cez `unittest`
- desať spustiteľných testov v `examples/test_ulohy.py`

## Demo checkpointy

1. Zopakovať chybu počítadla v GUI.
2. Zastaviť výpočet cez `breakpoint()` a prezrieť `ulohy`.
3. Spustiť regresný test najprv s chybnou a potom s opravenou implementáciou.
4. Na záver spustiť celú testovaciu sadu cez `python -m unittest -v test_ulohy.py`.
