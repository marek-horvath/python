# Cvičenie 08 — Web scraping a automatizácia prehliadača

Starter súbory k cvičeniu s lokálnym HTML katalógom produktov.

Súbory:

- `catalog/page1.html`, `page2.html`, `page3.html` — lokálny katalóg produktov s pagination;
- `dynamic/search.html` — jednoduchá stránka s JavaScript interakciou pre Playwright;
- `scraper_starter.py` — základný model, načítanie HTML a miesto na postupnú implementáciu úloh.

Inštalácia:

```bash
python -m pip install httpx beautifulsoup4 playwright
python -m playwright install chromium
```

Výstupom má byť scraper, ktorý prejde lokálne stránky, odstráni duplicity, ošetrí nevalidné produkty a exportuje výsledok.
