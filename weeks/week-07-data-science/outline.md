# Prednáška 07 — Data Science v Pythone

## Hlavná myšlienka

Python má praktický ekosystém na prácu s dátami: od číselných polí cez tabuľky až po vizualizácie. Cieľom tejto prednášky nie je machine learning, ale základný dátový workflow.

## Narrative flow

1. Čo v tejto prednáške znamená Data Science: praktické otázky nad tabuľkovými dátami.
2. Jupyter Notebook ako pracovný zošit na exploráciu.
3. NumPy: číselné polia, vektorové operácie, masky a agregácie.
4. pandas: DataFrame, načítanie CSV, kontrola dát, filtrovanie a transformácie.
5. GroupBy: rozdelenie podľa kategórie a agregácia.
6. Matplotlib: základné grafy a čitateľná vizualizácia.
7. Prepojenie s databázami a krátky teaser na scikit-learn.

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
- prepojiť pandas s SQL dotazom cez `read_sql`.

## Priebežný dataset

Výsledky študentov:

- `student`
- `course`
- `points`
- `attempt`
- `submitted_at`
- `duration_min`

Dataset slúži na ukážku filtrovania, groupby, odvodených stĺpcov, chýbajúcich hodnôt a vizualizácie.

## Live demo

Krátke demo:

1. načítať CSV cez `pd.read_csv`;
2. skontrolovať `head`, `shape`, `info`;
3. filtrovať jeden predmet;
4. vypočítať priemer podľa predmetu;
5. nakresliť jeden jednoduchý graf;
6. ukázať, prečo pred odovzdaním spustiť notebook zhora nadol.
