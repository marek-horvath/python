# Týždeň 05 - Internet, HTTP a API

Stav: rozpracované ako kompletná webová prednáška.

## Cieľ prednášky

Študent má rozumieť základnému HTTP request/response modelu a vedieť v Pythone zavolať REST API, skontrolovať odpoveď, spracovať JSON a ošetriť bežné chyby.

Používame primárne HTTPX. `requests` možno spomenúť ako známu alternatívu, ale príklady držíme konzistentne v HTTPX.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť client-server model v kontexte Python scriptu;
- rozložiť URL na scheme, host, path a query parameters;
- pomenovať základné časti HTTP requestu a response;
- rozumieť najčastejším HTTP methods a status code skupinám;
- zavolať GET request cez `httpx.get`;
- použiť `params`, `headers`, JSON body a `response.json()`;
- rozlíšiť query parameters a JSON body;
- použiť `raise_for_status()`, `try/except` a timeout;
- rozlíšiť HTTP chybu od connection problému;
- nepísať API keys priamo do kódu;
- vysvetliť základ pagination, rate limiting a rozdiel API vs web scraping.

## Narrative flow

1. Začíname myšlienkou, že Python už nemusí pracovať iba s lokálnymi dátami.
2. Vysvetlíme client-server model, URL, HTTP request, methods a status codes.
3. Prepojíme JSON s prednáškou 02.
4. Predstavíme HTTPX a prvý GET request.
5. Doplníme params, headers, POST a error handling.
6. Ukážeme timeout, connection problems, API keys a rate limiting.
7. Použijeme priebežný príklad Weather CLI.
8. Stručne vysvetlíme REST, čítanie API dokumentácie, pagination a async teaser.
9. Porovnáme API a web scraping a uzavrieme teaserom na databázy.

## Časti prednášky

- A - Program ako HTTP client
- B - JSON, HTTPX, GET, params, headers a POST
- C - Error handling, timeout, API keys a rate limiting
- D - Weather CLI
- E - REST, API dokumentácia, pagination a async teaser
- F - API vs scraping a bezpečnostné minimum
- G - Live demo a záver

## Približný rozsah

- 43 slajdov
- 50-60 minút
- približne 5 otázok/interakcií
- 1 live demo checkpoint na 5-8 minút

## Live demo

Názov: Prvý API client.

Postup:

1. `httpx.get`;
2. status code;
3. `response.json()`;
4. query params;
5. `raise_for_status()`;
6. timeout;
7. krátky fallback s lokálnym JSON, ak internet nefunguje.
