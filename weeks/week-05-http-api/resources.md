# Zdroje a doplnkové materiály - Prednáška 05

## Primárna dokumentácia

- Requests - Quickstart: https://requests.readthedocs.io/en/latest/user/quickstart/
- Requests - API reference: https://requests.readthedocs.io/en/latest/api/
- Open-Meteo Geocoding API: https://open-meteo.com/en/docs/geocoding-api
- Open-Meteo Forecast API: https://open-meteo.com/en/docs
- Python `json`: https://docs.python.org/3/library/json.html

## HTTP referencia

- MDN - Overview of HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- MDN - HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- MDN - HTTP request methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods

## Použitie v prednáške

Príklady používajú knižnicu `requests`. Parametre sa odovzdávajú cez `params`, každá sieťová požiadavka má explicitný `timeout` a HTTP stav sa kontroluje cez `raise_for_status()`.

Prednáška používa stabilné výrezy reálnych odpovedí Open-Meteo zachytené 1. októbra 2026. Aktuálne živé hodnoty sa preto môžu líšiť, no štruktúra ukážok zostáva reprodukovateľná. Relevantné zachytené dáta sú v adresári `examples/fixtures/`.
