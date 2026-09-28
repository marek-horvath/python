# Týždeň 03 - GUI a event-driven programovanie

Stav: publikované ako 90-minútová prednáška.

## Cieľ prednášky

Študent má pochopiť rozdiel medzi lineárnym skriptom a event-driven aplikáciou. Počas prednášky postupne vznikne jedna malá Tkinter aplikácia na správu úloh. Rovnaký príklad ukáže vytvorenie okna, rozloženie widgetov, callbacky, klávesovú udalosť a synchronizáciu dát so zobrazením.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť, prečo GUI vopred nepozná nasledujúcu akciu používateľa;
- popísať úlohu `mainloop()` v Tkinter aplikácii;
- vytvoriť `Label`, `Entry`, `Button` a `Listbox` a rozložiť ich cez `grid()`;
- vysvetliť rozdiel medzi `command=callback` a `command=callback()`;
- pripojiť kláves Enter cez `bind()` a pracovať s event parametrom;
- čítať a validovať aktuálnu hodnotu z `Entry`;
- udržiavať úlohy v samostatnom dátovom zozname;
- obnoviť Listbox a odvodené počítadlo z jedného zdroja pravdy;
- bezpečne pracovať s prázdnym výberom v `Listbox`;
- pridať, prepínať a odstrániť vybranú úlohu.

## Narrative flow

1. Porovnáme pevný priebeh terminálového skriptu s viacerými možnými udalosťami v GUI.
2. Vytvoríme najmenšie okno a vysvetlíme pozorovateľnú úlohu `mainloop()`.
3. Pridáme Label, Entry a Button a rozložíme ich cez `grid()`.
4. Pripojíme callback cez `command` a kláves Enter cez `bind()`.
5. Doplníme Listbox, validáciu vstupu a vyčistenie poľa.
6. Presunieme úlohy do samostatného dátového zoznamu a zavedeme `obnov_zobrazenie()`.
7. Implementujeme výber, prepínanie dokončenia, odstránenie a počítadlo.
8. Spojíme všetky časti do jedného spustiteľného programu a rozoberieme časté chyby.

## Časti prednášky

- A - Prečo GUI funguje inak ako skript, 12 minút
- B - Prvé okno a rozloženie, 16 minút
- C - Udalosti a callbacky, 18 minút
- D - Stav aplikácie a práca so zoznamom, 22 minút
- E - Celá aplikácia, časté chyby a hranice riešenia, 15 minút
- F - Zhrnutie a predikcia správania, 7 minút

## Rozsah

- 44 slajdov
- približne 90 minút
- jedna priebežne rozvíjaná aplikácia
- tri používateľské operácie: pridať, označiť a odstrániť úlohu

## Code examples

- najmenšie okno s `tk.Tk()` a `mainloop()`;
- vytvorenie a umiestnenie widgetov cez `grid()`;
- callback tlačidla cez `command`;
- získanie a validácia textu cez `Entry.get().strip()`;
- vloženie a vymazanie položiek v `Listbox`;
- pripojenie Enter cez `bind("<Return>", handler)`;
- dátové záznamy úloh ako dictionaries;
- obnova zobrazenia z dátového zoznamu;
- bezpečné použitie `curselection()`;
- prepínanie boolean stavu a odstránenie cez `del`;
- odvodený počet nesplnených úloh.

## Hranice riešenia

Aplikácia počas prednášky neukladá dáta na disk. Úlohy po zatvorení okna zaniknú. Ukladanie do JSON a editácia textu úlohy sú vhodné nadväzujúce rozšírenia pre cvičenie.
