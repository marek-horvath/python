# Cvičenie 08: program univerzitných podujatí

Desať úloh je na webe v cvičení 08. Doménou sú workshopy a konzultácie, nie produktový katalóg z prednášky. Všetky stránky sú lokálne testovacie dáta; nepotrebujete cudzí web.

- `events/page1.html` až `page3.html`: statický program s navigáciou, neúplnými kartami, opakovaním a zrušeným podujatím.
- `dynamic/search.html`: vyhľadávanie, ktoré postupne vytvára karty cez JavaScript a signalizuje dokončenie dávky.
- `scraper_starter.py`: iba vstupná cesta a miesto pre vlastné riešenie.

Po vytvorení a aktivácii virtuálneho prostredia:

```bash
python -m pip install httpx beautifulsoup4 playwright pytest
python -m playwright install chromium
python -m http.server 8765 --bind 127.0.0.1
```

Server spustite z koreňa rozbaleného cvičenia a nechajte ho bežať v samostatnom termináli:

- http://127.0.0.1:8765/events/page1.html
- http://127.0.0.1:8765/dynamic/search.html

Port si môžete zmeniť, ale rovnakú adresu potom použite vo svojom zbere. Detailové URL sú identifikátory do výstupu; ich cieľové dokumenty nie sú súčasťou fixture a v tomto cvičení sa nesťahujú.

Dynamické vyhľadávanie `Python` má dva výsledky, `Git` jeden a neexistujúci názov žiadny. Prvý viditeľný výsledok ešte neznamená dokončený zoznam. Kontrakt dokončenia zistite zo zdrojového HTML.

Všetky časy majú explicitný offset. Zrušené podujatie je platný záznam; chýbajúca miestnosť je neznáma hodnota. Konkrétne pravidlá odmietania sú na webe.

Odovzdajte parser, zber, testy, `events.csv`, `events.json` a README. Zdrojové fixture neupravujte kvôli obídeniu chýb. Starter nie je hotové riešenie.
