# Týždeň 05 - Internet, HTTP a API

Stav: pripravené ako 44-slidová prednáška na približne 90 minút.

## Hlavná otázka

Ako vytvoríme Python skript, ktorý z názvu mesta získa cez internet jeho súradnice a následne aktuálnu teplotu a rýchlosť vetra?

Prednáška používa jeden priebežný príklad: používateľ zadá `Košice`, Open-Meteo Geocoding API vráti súradnice a Open-Meteo Forecast API vráti aktuálne počasie. Výsledkom je krátky, čitateľný terminálový výstup.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť rozdiel medzi internetom a webom a úlohu klienta a servera;
- rozložiť URL na scheme, host, path a query parameters;
- pomenovať metódu, cieľ, hlavičky a telo HTTP požiadavky;
- rozlíšiť status, hlavičky a telo HTTP odpovede;
- poslať GET požiadavku cez `requests` s `params` a `timeout`;
- použiť `raise_for_status()` a rozlíšiť HTTP chybu od problému spojenia;
- spracovať JSON cez `response.json()` a bezpečne pracovať s vnorenými dátami;
- overiť, či API skutočne vrátilo očakávané položky;
- prepojiť výstup geocoding API so vstupom weather API;
- z dokumentácie vyčítať endpoint, parametre, jednotky a možné chyby.

## Narrative flow

1. Začíname hotovým vstupom a výstupom programu, ku ktorému sa počas prednášky dopracujeme.
2. Oddelíme lokálne dáta od dát na vzdialenom serveri a vysvetlíme client-server model.
3. Rozoberieme URL, request, response, status codes, hlavičky a rozdiel medzi stránkou a API.
4. Pošleme prvú požiadavku cez `requests`, pridáme `params`, `timeout` a kontrolu statusu.
5. JSON odpoveď prevedieme na Python objekty a bezpečne vyberieme prvý výsledok geocodingu.
6. Súradnice pošleme druhému endpointu a vytvoríme čitateľný výstup počasia.
7. Rozlíšime nenájdené mesto, HTTP chybu a problém siete; stručne porovnáme GET a POST.
8. Záverom študenti nájdu chybu v kóde a pripravia sa na cvičenie porovnávajúce dve mestá.

## Rozsah

- 44 slajdov;
- približne 90 minút;
- kód, request, relevantné výrezy response a terminálový výstup sú priamo na slajdoch;
- live coding nie je potrebný;
- údaje v ukážkach sú zachytené 1. októbra 2026 a zostávajú stabilné.

## Časti prednášky

- 1-6: od lokálneho skriptu ku komunikácii cez internet;
- 7-14: URL, HTTP request a response;
- 15-21: prvá požiadavka cez `requests`;
- 22-29: JSON a geocoding mesta;
- 30-36: prepojenie dvoch API a výsledný Weather CLI;
- 37-41: chyby, obmedzenia API, GET a POST;
- 42-44: diagnostická otázka, čítanie dokumentácie a zadanie na cvičenie.

## Priebežný príklad

```text
Mesto: Košice
Košice: 22.8 °C, vietor 9.7 km/h
```

Geocoding odpoveď poskytne súradnice `48.71441, 21.25802`. Weather endpoint pre ne v zachytenej odpovedi vráti čas `2026-10-01T15:00`, teplotu `22.8 °C` a vietor `9.7 km/h`.
