# Týždeň 03 - GUI a event-driven programovanie

Stav: rozpracované ako kompletná webová prednáška.

## Cieľ prednášky

Študent má pochopiť event-driven programovací model a vedieť vytvoriť jednoduchú desktopovú aplikáciu v Tkinter/ttk. Tkinter je použitý ako výučbový nástroj, nie ako tvrdenie, že ide o najlepší framework pre každý desktopový projekt.

## Learning outcomes

Po prednáške má študent vedieť:

- vysvetliť rozdiel medzi lineárnym programom a GUI aplikáciou;
- popísať event loop, event, callback, widget a application state;
- vytvoriť základné Tkinter okno a spustiť `mainloop()`;
- použiť `ttk.Label`, `ttk.Entry`, `ttk.Button` a základný layout;
- vysvetliť rozdiel medzi `command=save` a `command=save()`;
- čítať vstup z widgetu a aktualizovať UI v callbacku;
- použiť `bind()` na jednoduchú klávesovú alebo myšiu udalosť;
- oddeliť GUI callback od aplikačnej logiky;
- použiť `dataclass` pri jednoduchom výsledku analýzy;
- vysvetliť, prečo dlhý callback alebo `time.sleep()` blokuje GUI.

## Narrative flow

1. Začíname terminálovým programom a ukazujeme, že má pevné poradie.
2. GUI aplikácia nemá pevné poradie akcií, preto potrebujeme event-driven model.
3. Vysvetlíme event loop, callback, widget a stav aplikácie.
4. Postupne postavíme malé Tkinter/ttk okno: Label, Entry, Button, callback a layout.
5. Prejdeme na praktickejší príklad Text Analyzer, ktorý prepája GUI s prácou so súbormi z prednášky 02.
6. Oddelíme GUI logiku od aplikačnej logiky a pripravíme pôdu pre testovanie v prednáške 04.
7. Krátko ukážeme Canvas, súradnice, kliknutie a časované udalosti cez `after()`.

## Časti prednášky

- A - Od terminálového programu k event loopu
- B - Tkinter, ttk, prvé okno a callbacky
- C - Entry, layout, widgety a stav aplikácie
- D - Events, bind a dialogs
- E - Text Analyzer a oddelenie logiky
- F - Canvas, kliknutie a `after()`
- G - Organizácia väčšieho GUI, iné frameworky, live demo a záver

## Približný rozsah

- 45 slajdov
- 50-60 minút
- približne 5 krátkych otázok/interakcií
- 1 live demo checkpoint na 5-8 minút

## Code examples

- lineárny program cez `input()` a `print()`;
- prvé Tkinter okno;
- `ttk.Label`, `ttk.Entry`, `ttk.Button`;
- rozdiel medzi odovzdaním callbacku a zavolaním funkcie;
- `grid()` layout;
- `StringVar`, `BooleanVar`, `IntVar`;
- `bind("<Return>", handler)`;
- `filedialog.askopenfilename()`;
- `messagebox.showerror()`;
- `TextStats` cez `dataclass`;
- `analyze_text(text: str)`;
- Canvas shapes, Canvas click handler;
- `root.after()`.

## Live demo

Názov: Od prázdneho súboru k GUI.

Postup:

1. `Tk()` a titulok okna.
2. `Label`.
3. `Entry`.
4. `Button`.
5. callback pre tlačidlo.
6. `grid()` namiesto jednoduchého `pack()`.
7. Enter event cez `bind()`.
8. `filedialog`, ak zostane čas.

Demo má zostať krátke. Cieľ nie je pekný desktopový nástroj, ale pochopenie reakcie na udalosti.
