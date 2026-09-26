# Týždeň 02 - Skriptovanie a automatizácia

Stav: publikované.

## Cieľ prednášky

Ukázať Python ako praktický nástroj na automatizáciu opakovanej práce so súbormi a adresármi. Prednáška sleduje jeden konkrétny organizátor priečinka od prvého `print()` až po bezpečné spustenie cez príkazový riadok.

## Learning outcomes

Po prednáške má študent vedieť:

- spustiť jednoduchý `.py` script z príkazového riadku;
- použiť `pathlib.Path` na skladanie ciest, kontrolu typu položky a získanie prípony;
- rozlíšiť súbory od priečinkov pri prechádzaní obsahu adresára;
- navrhnúť bezpečný dry-run pred hromadnou zmenou na disku;
- ošetriť chýbajúci vstupný priečinok a kolíziu cieľového súboru;
- použiť `argparse` pre povinný argument a prepínač `--vykonat`.

## Narrative flow

1. Opakovaná manuálna práca a výsledný stav priečinka.
2. Prvé spustiteľné `.py` súbory a relatívne cesty.
3. `pathlib`: identita cesty, priečinky, súbory a prípony.
4. Plán organizátora bez zmeny na disku.
5. Bezpečné vykonanie: kolízie, vytvorenie adresára a `rename()`.
6. Funkcia, CLI a prepínač `--vykonat`.

## Slajdy

Prednáška má 42 slajdov. Je plánovaná na 90 minút vrátane diskusie nad predikciami. Funguje bez live programovania: každý podstatný krok obsahuje vstup, úplný kód alebo očakávaný výstup.

## Interakcie

- Ktoré rozhodnutia musí script urobiť pri každej položke?
- Prečo `Path("subory")` funguje iba z konkrétneho pracovného adresára?
- Čo sa stane s `FOTO.JPG`, `README` a existujúcim `jpg/FOTO.JPG`?
- Kedy sa má zmeniť obsah disku?
