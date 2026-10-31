# Prednáška 08 — Web scraping a automatizácia prehliadača

## Hlavná myšlienka

Slovenská prednáška má 45 slajdov a sleduje produktový katalóg od HTML po štruktúrovaný export. Obsah pre generátor je v `deck.mjs`; verejný slovenský PPTX zostáva vizuálnym zdrojom. Anglická verzia sa v tejto iterácii nemení.

## Narrative flow

1. API vs. webová stránka.
2. Minimum HTML a DOM potrebné na scraping.
3. HTTPX + BeautifulSoup pre statické HTML.
4. Produktový model, `Decimal`, relatívne URL a neúplné karty.
5. Oddelenie downloadu, parsingu a exportu.
6. Fixture testy parsera, snapshot, pagination, allowlist hostiteľa, limity a duplicity.
7. Dynamický DOM, DevTools Network a Playwright locators.
8. Auto-wait, signál kompletných výsledkov, load more a virtuálne zoznamy.
9. Diagnostika, pravidlá zdroja, rate limiting a rozdiel jednotkových a integračných testov.

## Learning outcomes

Po prednáške má študent vedieť:

- rozlíšiť API, statický scraping a browser automation;
- stiahnuť HTML cez HTTPX;
- použiť BeautifulSoup a CSS selectors;
- extrahovať text a atribúty z elementov;
- vytvoriť štruktúrovaný výstup cez `dataclass` a parsovať cenu podľa známeho formátu;
- pracovať s relatívnymi URL a pagination;
- rozhodnúť, kedy použiť Playwright a na ktorý stav čakať;
- otestovať parser bez internetu a odlíšiť prázdny katalóg od zlyhaného zberu;
- vysvetliť základné etické a technické riziká scrapingu.

## Live demo

Odporúčaný postup:

1. pripraviť vlastný HTML fragment alebo povolený testovací web;
2. stiahnuť HTML cez HTTPX a overiť odpoveď;
3. vytvoriť `BeautifulSoup` a model `Product`;
4. overiť cenu, názov a URL malými fixture testami;
5. prejsť obmedzené stránkovanie a exportovať CSV;
6. na vlastnom dynamickom deme vyplniť formulár, čakať na dohodnutý stav a použiť rovnaký parser.

Adresy `example.com` sú zástupné; nepredstavujú živý katalóg s ukážkovým markupom. `results-ready` je výslovný kontrakt vlastnej testovacej stránky.
