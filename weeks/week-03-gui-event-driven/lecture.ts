import type { Lecture } from "../../shared/slide.types";

export const lecture03 = {
  weekNumber: 3,
  slug: "03-gui-event-driven",
  title: "GUI a event-driven programovanie",
  description: "Event loop, callbacky, stav aplikácie a jednoduché desktopové aplikácie cez Tkinter a ttk.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "GUI a event-driven programovanie"
    },
    {
      id: "02-terminal-program",
      type: "code",
      title: "Terminálový program má pevné poradie",
      body: "Program si vypýta vstup, spracuje ho, vypíše výstup a skončí.",
      code: {
        language: "python",
        label: "terminal",
        runnable: false,
        code: `name = input("Meno: ")
print(f"Ahoj, {name}")`
      }
    },
    {
      id: "03-linear-flow",
      type: "diagram",
      title: "Lineárny tok riadenia",
      diagramItems: ["start", "input", "processing", "output", "end"]
    },
    {
      id: "04-gui-flow",
      type: "statement",
      title: "GUI program neurčuje ďalší krok používateľa",
      body: "Používateľ môže písať, kliknúť, zmeniť voľbu, vybrať súbor alebo zavrieť okno v rôznom poradí.",
      points: [
        "program musí čakať na udalosti",
        "reakcia je rozdelená do malých handlerov",
        "stav aplikácie sa mení počas behu"
      ]
    },
    {
      id: "05-event-driven-section",
      type: "section",
      title: "Event-driven programming",
      subtitle: "Riadenie programu prechádza od pevnej sekvencie krokov k event loopu."
    },
    {
      id: "06-event-loop",
      type: "diagram",
      title: "Event loop",
      diagramItems: ["create app", "create widgets", "start mainloop", "wait for event", "call callback", "update UI"]
    },
    {
      id: "07-core-terms",
      type: "table",
      title: "Základné pojmy",
      table: {
        headers: ["Pojem", "Praktický význam"],
        rows: [
          ["event", "niečo sa stalo: klik, kláves, výber súboru, zatvorenie okna"],
          ["callback", "funkcia, ktorú GUI framework zavolá pri udalosti"],
          ["widget", "viditeľný prvok rozhrania"],
          ["state", "údaje, ktoré aplikácia práve drží"],
          ["event loop", "cyklus, ktorý čaká na udalosti a odovzdáva ich callbackom"]
        ]
      }
    },
    {
      id: "08-mainloop",
      type: "code",
      title: "`mainloop()` drží aplikáciu pri živote",
      body: "Bez event loopu by sa okno vytvorilo a program by hneď skončil.",
      code: {
        language: "python",
        label: "first window",
        runnable: false,
        highlightLines: [5],
        code: `import tkinter as tk

root = tk.Tk()
root.title("Moja aplikácia")
root.mainloop()`
      }
    },
    {
      id: "09-tkinter-context",
      type: "section",
      title: "Tkinter a ttk",
      subtitle: "Použijeme ich ako dostupný nástroj na vysvetlenie GUI modelu."
    },
    {
      id: "10-tkinter-position",
      type: "bullets",
      title: "Tkinter v tomto predmete",
      points: [
        "je súčasťou bežného Python ekosystému",
        "stačí na malé desktopové nástroje a výučbu",
        "`ttk` poskytuje themed widgets",
        "nie je jediný GUI framework",
        "event-driven model platí aj mimo Tkinteru"
      ]
    },
    {
      id: "11-first-window-parts",
      type: "code",
      title: "Prvé okno po častiach",
      code: {
        language: "python",
        label: "window.py",
        runnable: false,
        highlightLines: [3, 4, 6],
        code: `import tkinter as tk

root = tk.Tk()
root.title("Text Analyzer")

root.mainloop()`
      }
    },
    {
      id: "12-ttk-import",
      type: "code",
      title: "`ttk` pre bežné ovládacie prvky",
      code: {
        language: "python",
        label: "imports",
        runnable: false,
        code: `import tkinter as tk
from tkinter import ttk`
      }
    },
    {
      id: "13-label-widget",
      type: "code",
      title: "Label zobrazuje text",
      body: "Widget najprv vytvoríme, potom ho umiestnime layout managerom.",
      code: {
        language: "python",
        label: "label",
        runnable: false,
        highlightLines: [4, 5],
        code: `root = tk.Tk()

label = ttk.Label(root, text="Pripravené")
label.pack(padx=20, pady=20)

root.mainloop()`
      }
    },
    {
      id: "14-button-callback",
      type: "code",
      title: "Button odkazuje na callback",
      body: "`command` očakáva funkciu, nie výsledok funkcie.",
      code: {
        language: "python",
        label: "button",
        runnable: false,
        highlightLines: [1, 6],
        code: `def say_hello() -> None:
    print("Ahoj")

button = ttk.Button(
    root,
    text="Klikni",
    command=say_hello,
)`
      }
    },
    {
      id: "15-command-question",
      type: "question",
      title: "Kedy sa funkcia zavolá?",
      prompt: "Rozdiel je medzi odovzdaním funkcie a okamžitým zavolaním.",
      code: {
        language: "python",
        label: "callback",
        runnable: false,
        code: `command=save

command=save()`
      }
    },
    {
      id: "16-update-label",
      type: "code",
      title: "Callback mení rozhranie",
      code: {
        language: "python",
        label: "update UI",
        runnable: false,
        highlightLines: [3],
        code: `message = ttk.Label(root, text="")

def say_hello() -> None:
    message.config(text="Ahoj!")

button = ttk.Button(root, text="Pozdraviť", command=say_hello)`
      }
    },
    {
      id: "17-event-to-ui",
      type: "diagram",
      title: "Udalosť a reakcia",
      diagramItems: ["user event", "callback", "state change", "widget update", "wait again"]
    },
    {
      id: "18-entry-section",
      type: "section",
      title: "Vstup, layout a stav",
      subtitle: "Jednoduché GUI začína formulárom, nie množstvom widgetov."
    },
    {
      id: "19-entry-get",
      type: "code",
      title: "Entry poskytuje text v čase udalosti",
      body: "Hodnotu z poľa čítame v callbacku, nie pri vytváraní widgetu.",
      code: {
        language: "python",
        label: "Entry",
        runnable: false,
        highlightLines: [4, 5],
        code: `name_entry = ttk.Entry(root)
message = ttk.Label(root, text="")

def greet() -> None:
    name = name_entry.get()
    message.config(text=f"Ahoj, {name}!")`
      }
    },
    {
      id: "20-form-wireframe",
      type: "code",
      title: "Malý formulár",
      code: {
        language: "text",
        label: "wireframe",
        code: `Meno:  [__________]
       [Pozdraviť]

Ahoj, Anna!`
      }
    },
    {
      id: "21-pack-grid",
      type: "compare",
      title: "Layout manager",
      columns: [
        {
          title: "pack()",
          items: ["rýchle vertikálne alebo horizontálne uloženie", "vhodné pre jednoduché okná", "menšia kontrola pri formulároch"]
        },
        {
          title: "grid()",
          items: ["riadky a stĺpce", "vhodné pre formuláre", "podporuje padx, pady, sticky, columnspan"]
        }
      ]
    },
    {
      id: "22-grid-example",
      type: "split-code",
      title: "Formulár cez `grid()`",
      codeBlocks: [
        {
          language: "text",
          label: "layout",
          code: `column 0       column 1

Meno:          [________]
Email:         [________]

               [Uložiť]`
        },
        {
          language: "python",
          label: "grid",
          runnable: false,
          code: `ttk.Label(root, text="Meno:").grid(
    row=0, column=0, sticky="w"
)

name_entry.grid(row=0, column=1, padx=8, pady=4)
save_button.grid(row=2, column=1, sticky="e")`
        }
      ]
    },
    {
      id: "23-common-widgets",
      type: "table",
      title: "Praktické widgety",
      table: {
        headers: ["Widget", "Použitie"],
        rows: [
          ["<code>Entry</code>", "jeden riadok textu"],
          ["<code>Text</code>", "viacriadkový text"],
          ["<code>Checkbutton</code>", "boolean voľba"],
          ["<code>Radiobutton</code>", "jedna voľba zo skupiny"],
          ["<code>Combobox</code>", "výber zo zoznamu"],
          ["<code>Listbox</code>", "zoznam položiek"]
        ]
      }
    },
    {
      id: "24-state",
      type: "statement",
      title: "Stav aplikácie",
      body: "Stav sú údaje, podľa ktorých sa aplikácia práve rozhoduje a ktoré sa menia počas behu.",
      points: [
        "aktuálny text v poli",
        "vybraný súbor",
        "zapnutý filter",
        "zoznam výsledkov",
        "chybová správa"
      ]
    },
    {
      id: "25-tk-variables",
      type: "code",
      title: "`StringVar` a `BooleanVar`",
      body: "Tkinter vie niektoré hodnoty prepojiť priamo s widgetmi.",
      code: {
        language: "python",
        label: "variables",
        runnable: false,
        code: `name = tk.StringVar()
enabled = tk.BooleanVar(value=True)

entry = ttk.Entry(root, textvariable=name)
checkbox = ttk.Checkbutton(
    root,
    text="Aktívne",
    variable=enabled,
)`
      }
    },
    {
      id: "26-bind-section",
      type: "section",
      title: "Udalosti mimo tlačidla",
      subtitle: "`command=` je špeciálny prípad. Všeobecnejšie udalosti rieši `bind()`."
    },
    {
      id: "27-bind-return",
      type: "code",
      title: "Enter ako event",
      body: "Handler z `bind()` dostane event objekt.",
      code: {
        language: "python",
        label: "bind",
        runnable: false,
        highlightLines: [1, 4],
        code: `def submit(event) -> None:
    print("Submit:", event.keysym)

entry.bind("<Return>", submit)`
      }
    },
    {
      id: "28-event-object-question",
      type: "question",
      title: "Čo vieme z event objektu?",
      prompt: "Pri klávese nás zaujíma `keysym`. Pri myši budú dôležité súradnice.",
      code: {
        language: "python",
        label: "event",
        runnable: false,
        code: `def handle_key(event) -> None:
    print(event.keysym)

def handle_click(event) -> None:
    print(event.x, event.y)`
      }
    },
    {
      id: "29-dialogs",
      type: "split-code",
      title: "Dialógy",
      codeBlocks: [
        {
          language: "python",
          label: "filedialog",
          runnable: false,
          code: `from tkinter import filedialog

filename = filedialog.askopenfilename(
    filetypes=[("Text files", "*.txt")]
)`
        },
        {
          language: "python",
          label: "messagebox",
          runnable: false,
          code: `from tkinter import messagebox

messagebox.showerror(
    "Chyba",
    "Súbor sa nepodarilo načítať."
)`
        }
      ]
    },
    {
      id: "30-text-analyzer-section",
      type: "section",
      title: "Priebežný príklad: Text Analyzer",
      subtitle: "GUI nad jednoduchou aplikačnou logikou."
    },
    {
      id: "31-text-analyzer-flow",
      type: "diagram",
      title: "Text Analyzer",
      diagramItems: ["vybrať .txt", "načítať text", "analyzovať", "zobraziť štatistiky", "uložiť výsledok"]
    },
    {
      id: "32-text-stats",
      type: "code",
      title: "`dataclass` pre výsledok analýzy",
      code: {
        language: "python",
        label: "TextStats",
        runnable: true,
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class TextStats:
    lines: int
    words: int
    characters: int`
      }
    },
    {
      id: "33-business-logic",
      type: "code",
      title: "Aplikačná logika mimo GUI",
      body: "Túto funkciu vieme neskôr testovať bez otvorenia okna.",
      code: {
        language: "python",
        label: "analyze_text",
        runnable: false,
        code: `def analyze_text(text: str) -> TextStats:
    return TextStats(
        lines=len(text.splitlines()),
        words=len(text.split()),
        characters=len(text),
    )`
      }
    },
    {
      id: "34-open-file-callback",
      type: "code",
      title: "Callback koordinuje UI",
      body: "Callback vyberie súbor, zavolá aplikačnú logiku a aktualizuje widgety.",
      code: {
        language: "python",
        label: "on_open_file",
        runnable: false,
        highlightLines: [5, 7],
        code: `def on_open_file() -> None:
    filename = filedialog.askopenfilename()
    if not filename:
        return

    text = Path(filename).read_text(encoding="utf-8")
    stats = analyze_text(text)
    result_label.config(text=f"{stats.words} slov")`
      }
    },
    {
      id: "35-gui-errors",
      type: "split-code",
      title: "Výnimky v GUI musia byť viditeľné",
      codeBlocks: [
        {
          language: "python",
          label: "validácia",
          runnable: false,
          code: `try:
    age = int(age_entry.get())
except ValueError:
    messagebox.showerror(
        "Chyba",
        "Zadajte celé číslo."
    )`
        },
        {
          language: "python",
          label: "súbor",
          runnable: false,
          code: `try:
    text = path.read_text(encoding="utf-8")
except OSError as error:
    messagebox.showerror(
        "Chyba",
        str(error)
    )`
        }
      ]
    },
    {
      id: "36-fat-callback-question",
      type: "question",
      title: "Kam patrí táto logika?",
      prompt: "Callback číta widgety, otvára súbor, parsuje dáta, počíta výsledky, validuje vstupy, ukladá výstup a mení UI."
    },
    {
      id: "37-separation",
      type: "split-code",
      title: "Callback nemá obsahovať celú aplikáciu",
      codeBlocks: [
        {
          language: "python",
          label: "ťažko testovateľné",
          variant: "bad",
          runnable: false,
          code: `def on_click():
    text = text_widget.get("1.0", "end")
    lines = text.splitlines()
    words = text.split()
    result_label.config(
        text=f"{len(lines)} / {len(words)}"
    )`
        },
        {
          language: "python",
          label: "lepšie delenie",
          variant: "good",
          runnable: false,
          code: `def on_click():
    text = text_widget.get("1.0", "end")
    stats = analyze_text(text)
    update_result(stats)

def analyze_text(text: str) -> TextStats:
    return calculate_stats(text)`
        }
      ]
    },
    {
      id: "38-canvas-section",
      type: "section",
      title: "Canvas",
      subtitle: "Kreslenie, súradnice a udalosti myši."
    },
    {
      id: "39-canvas-coordinates",
      type: "split-code",
      title: "Súradnice na Canvas",
      codeBlocks: [
        {
          language: "text",
          label: "systém",
          code: `(0,0) ----------> x
  |
  |
  v
  y`
        },
        {
          language: "python",
          label: "shapes",
          runnable: false,
          code: `canvas = tk.Canvas(root, width=400, height=250)
canvas.create_rectangle(20, 20, 120, 80)
canvas.create_oval(160, 30, 230, 100)
canvas.create_line(20, 140, 230, 140)
canvas.create_text(80, 190, text="Canvas")`
        }
      ]
    },
    {
      id: "40-canvas-click",
      type: "code",
      title: "Kliknutie vytvorí objekt",
      code: {
        language: "python",
        label: "mouse event",
        runnable: false,
        highlightLines: [2, 8],
        code: `def draw_circle(event) -> None:
    x, y = event.x, event.y
    radius = 10
    canvas.create_oval(
        x - radius, y - radius,
        x + radius, y + radius,
    )

canvas.bind("<Button-1>", draw_circle)`
      }
    },
    {
      id: "41-after",
      type: "split-code",
      title: "`after()` namiesto blokovania event loopu",
      codeBlocks: [
        {
          language: "python",
          label: "blokuje UI",
          variant: "bad",
          runnable: false,
          code: `def on_click() -> None:
    time.sleep(10)
    label.config(text="Hotovo")`
        },
        {
          language: "python",
          label: "plánuje ďalšiu udalosť",
          variant: "good",
          runnable: false,
          code: `def update_clock() -> None:
    label.config(text=current_time())
    root.after(1000, update_clock)

update_clock()`
        }
      ]
    },
    {
      id: "42-sleep-question",
      type: "question",
      title: "Čo sa stane s oknom?",
      prompt: "Callback beží 10 sekúnd a počas toho volá `time.sleep(10)`. Čo bude používateľ vidieť?"
    },
    {
      id: "43-oop-frameworks",
      type: "compare",
      title: "Organizácia a ekosystém",
      columns: [
        {
          title: "Väčšie Tkinter GUI",
          items: ["funkcie pre aplikačnú logiku", "krátke callbacky", "stav na jednom mieste", "trieda `Application` iba keď pomáha"]
        },
        {
          title: "Iné frameworky",
          items: ["PySide / PyQt", "Kivy", "Flet", "webové UI", "rovnaký princíp udalostí"]
        }
      ]
    },
    {
      id: "44-live-demo",
      type: "demo",
      title: "Demo: od prázdneho súboru k GUI",
      points: [
        "`Tk()` a titulok okna",
        "Label, Entry, Button",
        "callback cez `command=`",
        "`grid()` pre formulár",
        "Enter event cez `bind()`"
      ]
    },
    {
      id: "45-next",
      type: "diagram",
      title: "Prepojenie s testovaním",
      diagramItems: ["GUI", "callback", "business logic", "function", "pytest"]
    }
  ],
  translations: {
    en: {
      title: "GUI and Event-Driven Programming",
      description: "Event loop, callbacks, application state and simple desktop applications with Tkinter and ttk.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "GUI and Event-Driven Programming"
        },
        "02-terminal-program": {
          title: "A Terminal Program Has a Fixed Order",
          body: "The program asks for input, processes it, prints output and exits.",
          code: {
            code: `name = input("Name: ")
print(f"Hello, {name}")`
          }
        },
        "03-linear-flow": {
          title: "Linear Control Flow",
          diagramItems: ["start", "input", "processing", "output", "end"]
        },
        "04-gui-flow": {
          title: "A GUI Program Does Not Decide the User's Next Step",
          body: "The user may type, click, change an option, choose a file or close the window in different orders.",
          points: [
            "the program must wait for events",
            "the response is split into small handlers",
            "application state changes while the program is running"
          ]
        },
        "05-event-driven-section": {
          title: "Event-Driven Programming",
          subtitle: "Control flow moves from a fixed sequence of steps to an event loop."
        },
        "06-event-loop": {
          title: "Event Loop",
          diagramItems: ["create app", "create widgets", "start mainloop", "wait for event", "call callback", "update UI"]
        },
        "07-core-terms": {
          title: "Core Terms",
          table: {
            headers: ["Term", "Practical meaning"],
            rows: [
              ["event", "something happened: a click, key press, file selection, or closing the window"],
              ["callback", "a function called by the GUI framework when an event occurs"],
              ["widget", "a visible element of the interface"],
              ["state", "data the application currently holds"],
              ["event loop", "a loop that waits for events and passes them to callbacks"]
            ]
          }
        },
        "08-mainloop": {
          title: "`mainloop()` Keeps the Application Alive",
          body: "Without the event loop, the window would be created and the program would immediately exit.",
          code: {
            code: `import tkinter as tk

root = tk.Tk()
root.title("My Application")
root.mainloop()`
          }
        },
        "09-tkinter-context": {
          title: "Tkinter and ttk",
          subtitle: "We use them as an available tool for explaining the GUI model."
        },
        "10-tkinter-position": {
          title: "Tkinter in This Course",
          points: [
            "it is part of the standard Python ecosystem",
            "it is enough for small desktop tools and teaching",
            "`ttk` provides themed widgets",
            "it is not the only GUI framework",
            "the event-driven model applies beyond Tkinter"
          ]
        },
        "11-first-window-parts": {
          title: "First Window in Parts"
        },
        "12-ttk-import": {
          title: "`ttk` for Common Controls"
        },
        "13-label-widget": {
          title: "Label Displays Text",
          body: "First we create the widget, then we place it using a layout manager.",
          code: {
            code: `root = tk.Tk()

label = ttk.Label(root, text="Ready")
label.pack(padx=20, pady=20)

root.mainloop()`
          }
        },
        "14-button-callback": {
          title: "Button References a Callback",
          body: "`command` expects a function, not the result of a function.",
          code: {
            code: `def say_hello() -> None:
    print("Hello")

button = ttk.Button(
    root,
    text="Click",
    command=say_hello,
)`
          }
        },
        "15-command-question": {
          title: "When Is the Function Called?",
          prompt: "The difference is between passing a function and calling it immediately."
        },
        "16-update-label": {
          title: "A Callback Changes the Interface",
          code: {
            code: `message = ttk.Label(root, text="")

def say_hello() -> None:
    message.config(text="Hello!")

button = ttk.Button(root, text="Greet", command=say_hello)`
          }
        },
        "17-event-to-ui": {
          title: "Event and Response",
          diagramItems: ["user event", "callback", "state change", "widget update", "wait again"]
        },
        "18-entry-section": {
          title: "Input, Layout and State",
          subtitle: "A simple GUI starts with a form, not with a large number of widgets."
        },
        "19-entry-get": {
          title: "Entry Provides Text at Event Time",
          body: "We read the value from the field inside the callback, not when the widget is created.",
          code: {
            code: `name_entry = ttk.Entry(root)
message = ttk.Label(root, text="")

def greet() -> None:
    name = name_entry.get()
    message.config(text=f"Hello, {name}!")`
          }
        },
        "20-form-wireframe": {
          title: "Small Form",
          code: {
            code: `Name:  [__________]
       [Greet]

Hello, Anna!`
          }
        },
        "21-pack-grid": {
          title: "Layout Manager",
          columns: [
            {
              title: "pack()",
              items: [
                "quick vertical or horizontal placement",
                "useful for simple windows",
                "less control for forms"
              ]
            },
            {
              title: "grid()",
              items: [
                "rows and columns",
                "useful for forms",
                "supports padx, pady, sticky, columnspan"
              ]
            }
          ]
        },
        "22-grid-example": {
          title: "Form with `grid()`",
          codeBlocks: [
            {
              label: "layout",
              code: `column 0       column 1

Name:          [________]
Email:         [________]

               [Save]`
            },
            {
              label: "grid",
              code: `ttk.Label(root, text="Name:").grid(
    row=0, column=0, sticky="w"
)

name_entry.grid(row=0, column=1, padx=8, pady=4)
save_button.grid(row=2, column=1, sticky="e")`
            }
          ]
        },
        "23-common-widgets": {
          title: "Practical Widgets",
          table: {
            headers: ["Widget", "Use"],
            rows: [
              ["<code>Entry</code>", "one line of text"],
              ["<code>Text</code>", "multi-line text"],
              ["<code>Checkbutton</code>", "boolean option"],
              ["<code>Radiobutton</code>", "one choice from a group"],
              ["<code>Combobox</code>", "choice from a list"],
              ["<code>Listbox</code>", "list of items"]
            ]
          }
        },
        "24-state": {
          title: "Application State",
          body: "State is the data the application currently uses for decisions and changes while the program runs.",
          points: [
            "current text in a field",
            "selected file",
            "enabled filter",
            "list of results",
            "error message"
          ]
        },
        "25-tk-variables": {
          title: "`StringVar` and `BooleanVar`",
          body: "Tkinter can connect some values directly to widgets.",
          code: {
            code: `name = tk.StringVar()
enabled = tk.BooleanVar(value=True)

entry = ttk.Entry(root, textvariable=name)
checkbox = ttk.Checkbutton(
    root,
    text="Active",
    variable=enabled,
)`
          }
        },
        "26-bind-section": {
          title: "Events Beyond Buttons",
          subtitle: "`command=` is a special case. More general events are handled with `bind()`."
        },
        "27-bind-return": {
          title: "Enter as an Event",
          body: "A handler registered with `bind()` receives an event object."
        },
        "28-event-object-question": {
          title: "What Can We Read from an Event Object?",
          prompt: "For a key press, `keysym` matters. For the mouse, coordinates are important."
        },
        "29-dialogs": {
          title: "Dialogs",
          codeBlocks: [
            { label: "filedialog" },
            {
              label: "messagebox",
              code: `from tkinter import messagebox

messagebox.showerror(
    "Error",
    "The file could not be loaded."
)`
            }
          ]
        },
        "30-text-analyzer-section": {
          title: "Running Example: Text Analyzer",
          subtitle: "A GUI around simple application logic."
        },
        "31-text-analyzer-flow": {
          title: "Text Analyzer",
          diagramItems: ["choose .txt", "load text", "analyze", "show statistics", "save result"]
        },
        "32-text-stats": {
          title: "`dataclass` for Analysis Results"
        },
        "33-business-logic": {
          title: "Application Logic Outside the GUI",
          body: "We can later test this function without opening a window."
        },
        "34-open-file-callback": {
          title: "The Callback Coordinates the UI",
          body: "The callback chooses a file, calls application logic and updates widgets.",
          code: {
            code: `def on_open_file() -> None:
    filename = filedialog.askopenfilename()
    if not filename:
        return

    text = Path(filename).read_text(encoding="utf-8")
    stats = analyze_text(text)
    result_label.config(text=f"{stats.words} words")`
          }
        },
        "35-gui-errors": {
          title: "Exceptions in a GUI Must Be Visible",
          codeBlocks: [
            {
              label: "validation",
              code: `try:
    age = int(age_entry.get())
except ValueError:
    messagebox.showerror(
        "Error",
        "Enter an integer."
    )`
            },
            {
              label: "file",
              code: `try:
    text = path.read_text(encoding="utf-8")
except OSError as error:
    messagebox.showerror(
        "Error",
        str(error)
    )`
            }
          ]
        },
        "36-fat-callback-question": {
          title: "Where Does This Logic Belong?",
          prompt: "A callback reads widgets, opens a file, parses data, calculates results, validates input, saves output and changes the UI."
        },
        "37-separation": {
          title: "A Callback Should Not Contain the Whole Application",
          codeBlocks: [
            { label: "hard to test" },
            { label: "better separation" }
          ]
        },
        "38-canvas-section": {
          title: "Canvas",
          subtitle: "Drawing, coordinates and mouse events."
        },
        "39-canvas-coordinates": {
          title: "Canvas Coordinates",
          codeBlocks: [
            { label: "coordinate system" },
            {
              label: "shapes",
              code: `canvas = tk.Canvas(root, width=400, height=250)
canvas.create_rectangle(20, 20, 120, 80)
canvas.create_oval(160, 30, 230, 100)
canvas.create_line(20, 140, 230, 140)
canvas.create_text(80, 190, text="Canvas")`
            }
          ]
        },
        "40-canvas-click": {
          title: "A Click Creates an Object"
        },
        "41-after": {
          title: "`after()` Instead of Blocking the Event Loop",
          codeBlocks: [
            {
              label: "blocks the UI",
              code: `def on_click() -> None:
    time.sleep(10)
    label.config(text="Done")`
            },
            { label: "schedules another event" }
          ]
        },
        "42-sleep-question": {
          title: "What Happens to the Window?",
          prompt: "The callback runs for 10 seconds and calls `time.sleep(10)` during that time. What will the user see?"
        },
        "43-oop-frameworks": {
          title: "Organization and Ecosystem",
          columns: [
            {
              title: "Larger Tkinter GUI",
              items: [
                "functions for application logic",
                "short callbacks",
                "state in one place",
                "an `Application` class only when it helps"
              ]
            },
            {
              title: "Other frameworks",
              items: [
                "PySide / PyQt",
                "Kivy",
                "Flet",
                "web UI",
                "the same event principle"
              ]
            }
          ]
        },
        "44-live-demo": {
          title: "Demo: From an Empty File to a GUI",
          points: [
            "`Tk()` and the window title",
            "Label, Entry, Button",
            "callback with `command=`",
            "`grid()` for a form",
            "Enter event with `bind()`"
          ]
        },
        "45-next": {
          title: "Connection to Testing",
          diagramItems: ["GUI", "callback", "business logic", "function", "pytest"]
        }
      }
    }
  }
} satisfies Lecture;
