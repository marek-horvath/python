# Prednáška 08 — Web scraping a automatizácia prehliadača

## Hlavná myšlienka

Nie všetky dáta sú dostupné cez API. Ak API neexistuje alebo nestačí, dáta môžu byť v HTML dokumente alebo vzniknúť až po spustení JavaScriptu v prehliadači.

## Narrative flow

1. API vs. webová stránka.
2. Minimum HTML a DOM potrebné na scraping.
3. HTTPX + BeautifulSoup pre statické HTML.
4. Priebežný príklad katalógu produktov.
5. Oddelenie downloadu, parsingu a exportu.
6. Pagination, duplicity a testovanie parsera.
7. Dynamické stránky a Playwright.
8. Etika, robots.txt, rate limiting a krehkosť scraperov.

## Learning outcomes

Po prednáške má študent vedieť:

- rozlíšiť API, statický scraping a browser automation;
- stiahnuť HTML cez HTTPX;
- použiť BeautifulSoup a CSS selectors;
- extrahovať text a atribúty z elementov;
- vytvoriť štruktúrovaný výstup cez `dataclass`;
- pracovať s relatívnymi URL a pagination;
- rozhodnúť, kedy použiť Playwright;
- vysvetliť základné etické a technické riziká scrapingu.

## Live demo

Odporúčaný postup:

1. stiahnuť HTML cez HTTPX;
2. vytvoriť `BeautifulSoup`;
3. nájsť produktové elementy cez selector;
4. extrahovať text a link;
5. vytvoriť `Product`;
6. ak zostane čas, krátky Playwright click.
