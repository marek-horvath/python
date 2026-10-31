# Prednáška 07 — Data Science v Pythone

## Hlavná myšlienka

Slovenská prednáška má 45 slajdov. Na dátach z bikesharingu prechádza od kontroly CSV cez čistenie, agregáciu a spojenie s počasím až k grafom a opatrnému záveru. Generovateľný obsah je v `deck.mjs`; verejným vizuálnym zdrojom zostáva slovenský PPTX. Anglická verzia sa v tejto iterácii nemení.

## Narrative flow

1. Otázka, jednotka pozorovania a reprodukovateľnosť notebooku alebo skriptu.
2. NumPy: dtype, shape, vektorizácia, masky a agregácia podľa osi.
3. DataFrame: import, diagnostika, konverzie čísel a časov, Series, loc a iloc.
4. Čistenie: chýbajúce hodnoty, nuly, duplicity, kategórie a audit vyradenia.
5. Odvodené stĺpce, miestny čas a odlišný UTC kľúč na spojenie s počasím.
6. GroupBy: size vs. count, priemer vs. medián, frekvencie a hodiny bez jázd.
7. Merge: granularita, many-to-one, chýbajúce merania a kontrola počtu riadkov.
8. Histogram, stĺpcový a bodový graf; clip vs. filter a správny menovateľ.
9. Záver bez nepodloženej kauzality a export výsledku s auditom.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť rozdiel medzi `list`, NumPy array a pandas DataFrame;
- načítať CSV do pandas;
- skontrolovať štruktúru dát cez `head`, `shape`, `info` a `describe`;
- vybrať stĺpce a filtrovať riadky;
- pracovať s chýbajúcimi hodnotami a duplicitami na základnej úrovni;
- použiť `groupby` a základné agregácie;
- vytvoriť jednoduchý bar chart, histogram a scatter plot;
- rozpoznať základné chyby pri práci v notebooku;
- spojiť dáta cez `merge` s kontrolou kardinality a časového pásma;
- vysvetliť menovateľ porovnania a rozdiel medzi pozorovanou súvislosťou a príčinou.

## Priebežný dataset

Bikesharing; `rides.csv` obsahuje:

- `ride_id`
- `member_type`
- `started_at` (v príklade UTC)
- `duration_min`
- `distance_km`
- `start_station`

`weather.csv` obsahuje `weather_hour` v UTC a `rain_mm`. Jeden riadok počasia predstavuje jednu hodinu úplného sledovaného obdobia. Číselné minipríklady sú výslovne ilustračné, nie tvrdenia o výsledku reálneho zberu.

## Live demo

Krátke demo:

1. načítať CSV cez `pd.read_csv`;
2. skontrolovať `head`, `shape`, `info`;
3. vyčistiť vstup a pokračovať konzistentne s `clean`;
4. porovnať skupiny členstva a pripojiť hodinové počasie;
5. nakresliť histogram a počet jázd za miestnu hodinu;
6. vyexportovať agregáciu a počty vyradených riadkov;
7. spustiť celý postup od pôvodného vstupu bez skrytého stavu.
