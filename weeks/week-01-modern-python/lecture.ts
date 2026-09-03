import type { Lecture } from "../../shared/slide.types";

export const lecture01 = {
  weekNumber: 1,
  slug: "01-moderny-python",
  title: "Moderný Python pre programátora",
  description: "Python pre študentov, ktorí už programovať vedia a potrebujú písať čitateľný, idiomatický kód.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Moderný Python pre programátora"
    },
    {
      id: "02-python-for-programmers",
      type: "statement",
      title: "Nie úvod do programovania",
      body: "Predpokladáme, že poznáte premenné, vetvenie, cykly, funkcie, kolekcie a základné algoritmické myslenie.",
      points: [
        "cieľom je Python ako jazyk s vlastným objektovým modelom a idiomami",
        "budeme porovnávať funkčný kód s kódom, ktorý je prirodzený pre Python"
      ]
    },
    {
      id: "03-execution-model",
      type: "diagram",
      title: "Ako sa spúšťa Python kód",
      diagramItems: ["source .py", "bytecode", "Python VM", "objekty v pamäti", "výsledok alebo výnimka"]
    },
    {
      id: "04-cpython",
      type: "statement",
      title: "CPython je referenčná implementácia",
      body: "Keď bežne povieme „Python“, zvyčajne myslíme jazyk Python spúšťaný implementáciou CPython.",
      points: [
        "jazyk definuje syntax a sémantiku",
        "CPython je najpoužívanejší interpreter",
        "detaily ako `id()` alebo garbage collection môžu závisieť od implementácie"
      ]
    },
    {
      id: "05-repl-script-module",
      type: "code",
      title: "REPL, script, modul",
      body: "Rovnaký jazyk používame na rýchly experiment, jednorazový script aj importovateľný modul.",
      code: {
        language: "bash",
        label: "terminal",
        code: `python --version
python
python hello.py`
      }
    },
    {
      id: "06-names-section",
      type: "section",
      title: "Meno a objekt",
      subtitle: "V Pythone premenná nie je krabica s pevne daným typom."
    },
    {
      id: "07-name-points-to-object",
      type: "code",
      title: "Meno ukazuje na objekt",
      body: "Typ má objekt. Meno môže neskôr ukazovať na iný objekt.",
      code: {
        language: "python",
        label: "dynamic typing",
        runnable: true,
        highlightLines: [1, 4],
        code: `value = 42
print(type(value).__name__)

value = "Python"
print(type(value).__name__)`
      }
    },
    {
      id: "08-identity-equality",
      type: "code",
      title: "Identita nie je rovnosť",
      body: "`==` porovnáva hodnotu. `is` porovnáva, či ide o ten istý objekt.",
      code: {
        language: "python",
        label: "identity",
        runnable: true,
        highlightLines: [4, 5],
        code: `a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)
print(a is b)
print(id(a), id(b))`
      }
    },
    {
      id: "09-aliasing-question",
      type: "question",
      title: "Čo sa vypíše?",
      prompt: "Najprv rozhodnite, koľko list objektov v programe vzniklo.",
      code: {
        language: "python",
        label: "aliasing",
        runnable: true,
        highlightLines: [2, 3],
        code: `a = [1, 2]
b = a
b.append(3)

print(a)
print(b)`
      }
    },
    {
      id: "10-assignment-copy",
      type: "split-code",
      title: "Priradenie nie je kopírovanie",
      codeBlocks: [
        {
          language: "python",
          label: "jeden objekt",
          variant: "bad",
          runnable: true,
          code: `a = [1, 2, 3]
b = a
b.append(4)

print(a)`
        },
        {
          language: "python",
          label: "nový list",
          variant: "good",
          runnable: true,
          code: `a = [1, 2, 3]
b = a.copy()
b.append(4)

print(a)`
        }
      ]
    },
    {
      id: "11-mutability-table",
      type: "table",
      title: "Mutability rozhoduje o vedľajších účinkoch",
      table: {
        headers: ["Typ objektu", "Príklady", "Praktický dôsledok"],
        rows: [
          ["immutable", "<code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>", "operácia typicky vytvorí nový objekt"],
          ["mutable", "<code>list</code>, <code>dict</code>, <code>set</code>", "objekt sa môže zmeniť cez inú referenciu"],
          ["pozor", "<code>tuple</code> s listom vo vnútri", "immutability vonkajšieho objektu nie je deep immutability"]
        ]
      }
    },
    {
      id: "12-shallow-deep-copy",
      type: "split-code",
      title: "Shallow copy nekopíruje vnorené objekty",
      codeBlocks: [
        {
          language: "python",
          label: "shallow copy",
          runnable: true,
          code: `rows = [[1, 2], [3, 4]]
copy = rows.copy()

copy[0].append(99)
print(rows)`
        },
        {
          language: "python",
          label: "deep copy",
          runnable: true,
          code: `from copy import deepcopy

rows = [[1, 2], [3, 4]]
copy = deepcopy(rows)

copy[0].append(99)
print(rows)`
        }
      ]
    },
    {
      id: "13-collections-section",
      type: "section",
      title: "Kolekcie",
      subtitle: "Voľba dátovej štruktúry je návrhové rozhodnutie."
    },
    {
      id: "14-collection-choice",
      type: "table",
      title: "Štyri časté voľby",
      table: {
        headers: ["Typ", "Keď potrebujete", "Vlastnosti"],
        rows: [
          ["<code>list</code>", "poradie, index, postupné zmeny", "ordered, mutable, duplicates"],
          ["<code>tuple</code>", "pevnú skupinu hodnôt", "ordered, immutable, duplicates"],
          ["<code>set</code>", "unikátnosť a rýchly membership test", "unordered, mutable, unique"],
          ["<code>dict</code>", "mapovanie kľúč → hodnota", "insertion ordered, mutable, unique keys"]
        ]
      }
    },
    {
      id: "15-list-as-sequence",
      type: "code",
      title: "List ako pracovná sekvencia",
      code: {
        language: "python",
        label: "list",
        runnable: true,
        code: `scores = [91, 84, 77]
scores.append(96)
scores.sort(reverse=True)

print(scores)
print(scores[0])`
      }
    },
    {
      id: "16-tuple-as-record",
      type: "code",
      title: "Tuple ako pevná štruktúra",
      body: "Tuple je vhodný, keď pozícia hodnoty nesie význam a štruktúra sa nemení.",
      code: {
        language: "python",
        label: "tuple",
        runnable: true,
        code: `record = ("Anna", "Python", 92)
student, course, points = record

print(student)
print(course)
print(points)`
      }
    },
    {
      id: "17-set-membership",
      type: "code",
      title: "Set pre unikátnosť a membership",
      code: {
        language: "python",
        label: "set",
        runnable: true,
        highlightLines: [4],
        code: `submitted = ["anna", "peter", "anna", "lucia"]
unique_students = set(submitted)

if "anna" in unique_students:
    print("submitted")

print(len(unique_students))`
      }
    },
    {
      id: "18-dict-mapping",
      type: "code",
      title: "Dict pre pomenované vzťahy",
      code: {
        language: "python",
        label: "dict",
        runnable: true,
        highlightLines: [6],
        code: `points = {
    "Anna": 92,
    "Peter": 67,
}

for name, score in points.items():
    print(name, score)`
      }
    },
    {
      id: "19-collection-question",
      type: "question",
      title: "Ktorú kolekciu zvoliť?",
      prompt: "Máme často zisťovať, či už bol konkrétny študent spracovaný. Poradie nepotrebujeme.",
      code: {
        language: "python",
        label: "návrhová otázka",
        runnable: true,
        code: `processed = {"anna", "peter"}

if "lucia" not in processed:
    processed.add("lucia")`
      }
    },
    {
      id: "20-iteration-section",
      type: "section",
      title: "Idiomatická iterácia",
      subtitle: "Python kód nemá byť mechanický preklad z C."
    },
    {
      id: "21-direct-iteration",
      type: "split-code",
      title: "Ak nepotrebujete index, nepýtajte si ho",
      codeBlocks: [
        {
          language: "python",
          label: "preložený štýl",
          variant: "bad",
          runnable: true,
          code: `names = ["Anna", "Peter"]

for i in range(len(names)):
    print(names[i])`
        },
        {
          language: "python",
          label: "prirodzený Python",
          variant: "good",
          runnable: true,
          code: `names = ["Anna", "Peter"]

for name in names:
    print(name)`
        }
      ]
    },
    {
      id: "22-enumerate",
      type: "code",
      title: "Index cez `enumerate()`",
      body: "Index má význam vtedy, keď je súčasťou problému: poradie, číslovanie, pozícia chyby.",
      code: {
        language: "python",
        label: "enumerate",
        runnable: true,
        highlightLines: [3],
        code: `names = ["Anna", "Peter", "Lucia"]

for index, name in enumerate(names, start=1):
    print(index, name)`
      }
    },
    {
      id: "23-zip",
      type: "code",
      title: "Paralelné sekvencie cez `zip()`",
      body: "`zip()` spája prvky podľa pozície. Končí pri kratšej sekvencii.",
      code: {
        language: "python",
        label: "zip",
        runnable: true,
        code: `names = ["Anna", "Peter", "Lucia"]
scores = [92, 67, 81]

for name, score in zip(names, scores):
    print(name, score)`
      }
    },
    {
      id: "24-slicing",
      type: "code",
      title: "Slicing číta časť sekvencie",
      body: "Tvar je `start:stop:step`. Stop index nie je zahrnutý.",
      code: {
        language: "python",
        label: "slicing",
        runnable: true,
        code: `values = [10, 20, 30, 40, 50, 60]

print(values[:3])
print(values[1:4])
print(values[::2])
print(values[::-1])`
      }
    },
    {
      id: "25-unpacking",
      type: "code",
      title: "Unpacking pomenúva význam hodnôt",
      code: {
        language: "python",
        label: "unpacking",
        runnable: true,
        highlightLines: [2, 5],
        code: `record = ("Anna", "Python", 92)
student, course, points = record

values = [10, 20, 30, 40, 50]
first, *middle, last = values

print(student, course, points)
print(first, middle, last)`
      }
    },
    {
      id: "26-slicing-question",
      type: "question",
      title: "Čo vrátia tieto výrazy?",
      prompt: "Zamerajte sa na stop index a záporný index.",
      code: {
        language: "python",
        label: "otázka",
        runnable: true,
        code: `letters = ["a", "b", "c", "d", "e"]

print(letters[1:4])
print(letters[-2:])
print(letters[::-1])`
      }
    },
    {
      id: "27-comprehensions-section",
      type: "section",
      title: "Comprehensions",
      subtitle: "Kompaktný zápis transformácie alebo filtrovania, nie súťaž v skrátení kódu."
    },
    {
      id: "28-loop-to-comprehension",
      type: "split-code",
      title: "Transformácia kolekcie",
      codeBlocks: [
        {
          language: "python",
          label: "explicitná slučka",
          runnable: true,
          code: `numbers = [1, 2, 3, 4]
squares = []

for number in numbers:
    squares.append(number ** 2)`
        },
        {
          language: "python",
          label: "list comprehension",
          runnable: true,
          code: `numbers = [1, 2, 3, 4]
squares = [
    number ** 2
    for number in numbers
]`
        }
      ]
    },
    {
      id: "29-filter-comprehension",
      type: "code",
      title: "Filtrovanie v comprehension",
      code: {
        language: "python",
        label: "filter",
        runnable: true,
        highlightLines: [2, 5],
        code: `numbers = [-2, -1, 0, 1, 2, 3]
positive_squares = [
    number ** 2
    for number in numbers
    if number > 0
]

print(positive_squares)`
      }
    },
    {
      id: "30-set-dict-comprehension",
      type: "code",
      title: "Set a dict comprehension",
      code: {
        language: "python",
        label: "set / dict",
        runnable: true,
        code: `names = ["Anna", "anna", "Peter"]
normalized = {name.lower() for name in names}
name_lengths = {name: len(name) for name in normalized}

print(normalized)
print(name_lengths)`
      }
    },
    {
      id: "31-too-clever-question",
      type: "question",
      title: "Kedy je kratší kód horší?",
      prompt: "Rozhodnite, či by ste tento zápis nechali v produkčnom kóde.",
      code: {
        language: "python",
        label: "prehnané",
        variant: "bad",
        runnable: true,
        code: `rows = [["Anna", "92"], ["", "x"], ["Peter", "67"]]
scores = {n: int(s) for n, s in rows if n and s.isdigit()}

print(scores)`
      }
    },
    {
      id: "32-functions-section",
      type: "section",
      title: "Funkcie a typové informácie",
      subtitle: "Známy koncept, ale dôležité Python detaily."
    },
    {
      id: "33-keyword-arguments",
      type: "code",
      title: "Keyword arguments znižujú nejednoznačnosť",
      code: {
        language: "python",
        label: "arguments",
        runnable: true,
        highlightLines: [5],
        code: `def final_price(price: float, discount: float = 0.0) -> float:
    return price * (1 - discount)

print(final_price(100, 0.15))
print(final_price(100, discount=0.15))`
      }
    },
    {
      id: "34-return-unpacking",
      type: "code",
      title: "Viac návratových hodnôt je tuple",
      code: {
        language: "python",
        label: "return",
        runnable: true,
        code: `def min_max(values: list[int]) -> tuple[int, int]:
    return min(values), max(values)

lowest, highest = min_max([4, 1, 9])
print(lowest)
print(highest)`
      }
    },
    {
      id: "35-mutable-default-question",
      type: "question",
      title: "Čo je problém?",
      prompt: "Default argument sa vyhodnotí raz pri definícii funkcie.",
      code: {
        language: "python",
        label: "mutable default",
        variant: "bad",
        runnable: true,
        highlightLines: [1],
        code: `def add_student(name: str, students: list[str] = []):
    students.append(name)
    return students

print(add_student("Anna"))
print(add_student("Peter"))`
      }
    },
    {
      id: "36-none-default",
      type: "code",
      title: "`None` ako bezpečný default",
      code: {
        language: "python",
        label: "oprava",
        variant: "good",
        runnable: true,
        highlightLines: [1, 2, 3],
        code: `def add_student(name: str, students: list[str] | None = None):
    if students is None:
        students = []
    students.append(name)
    return students

print(add_student("Anna"))
print(add_student("Peter"))`
      }
    },
    {
      id: "37-type-hints",
      type: "code",
      title: "Type hints nemenia runtime model",
      body: "Python zostáva dynamicky typovaný. Hinty pomáhajú čitateľovi, IDE a statickým nástrojom.",
      code: {
        language: "python",
        label: "typing",
        runnable: true,
        code: `def find_score(name: str, scores: dict[str, int]) -> int | None:
    return scores.get(name)

score = find_score("Anna", {"Anna": 92})

if score is not None:
    print(score + 1)`
      }
    },
    {
      id: "38-dataclass",
      type: "code",
      title: "`dataclass` pre malé dátové modely",
      body: "Keď slovník začne mať stabilnú štruktúru, často si zaslúži pomenovaný typ.",
      code: {
        language: "python",
        label: "dataclass",
        runnable: true,
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Result:
    student: str
    course: str
    points: int

result = Result("Anna", "Python", 92)
print(result.student, result.points)`
      }
    },
    {
      id: "39-errors-section",
      type: "section",
      title: "Chyby, moduly a prostredie",
      subtitle: "Kód má byť spustiteľný, importovateľný a udržiavateľný."
    },
    {
      id: "40-exceptions",
      type: "split-code",
      title: "Chyťte konkrétnu výnimku",
      codeBlocks: [
        {
          language: "python",
          label: "problém",
          variant: "bad",
          runnable: true,
          code: `try:
    value = int("abc")
except:
    pass`
        },
        {
          language: "python",
          label: "lepšie",
          variant: "good",
          runnable: true,
          code: `try:
    value = int("abc")
except ValueError:
    print("Neplatné číslo")`
        }
      ]
    },
    {
      id: "41-main-pattern",
      type: "code",
      title: "Súbor môže byť script aj modul",
      body: "Kód na spustenie patrí do `main()`. Import súboru potom nespustí celý program ako vedľajší účinok.",
      code: {
        language: "python",
        label: "__main__",
        runnable: true,
        highlightLines: [7, 8],
        code: `from pathlib import Path

def main() -> None:
    path = Path("data")
    print(path.exists())

if __name__ == "__main__":
    main()`
      }
    },
    {
      id: "42-venv-pip",
      type: "code",
      title: "Projekt má mať vlastné prostredie",
      body: "Virtual environment oddeľuje dependencies projektu od globálneho Pythonu v systéme.",
      code: {
        language: "bash",
        label: "terminal",
        code: `python -m venv .venv

# Windows PowerShell
.venv\\Scripts\\Activate.ps1

python -m pip install requests
python -m pip list`
      }
    },
    {
      id: "43-pyproject",
      type: "statement",
      title: "`pyproject.toml` ako metadata projektu",
      body: "Moderné Python projekty často opisujú názov, verziu, dependencies a build nastavenia v súbore `pyproject.toml`.",
      points: [
        "PyPI je verejný index balíkov",
        "`pip` inštaluje balíky do aktuálneho prostredia",
        "pre predmet stačí rozumieť workflow; packaging budeme riešiť len primerane"
      ]
    },
    {
      id: "44-demo",
      type: "demo",
      title: "Demo",
      points: [
        "REPL: aliasing, slicing, comprehension",
        "súbor: `main()`, type hints, dataclass",
        "prostredie: `.venv` a inštalácia malej dependency"
      ]
    },
    {
      id: "45-synthesis",
      type: "diagram",
      title: "Prirodzený Python",
      diagramItems: ["object model", "kolekcie", "iterácia", "funkcie", "typové hinty", "moduly", "prostredie"]
    }
  ],
  translations: {
    en: {
      title: "Modern Python for Programmers",
      description: "Python for students who already know how to program and need to write readable, idiomatic code.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Modern Python for Programmers"
        },
        "02-python-for-programmers": {
          title: "Not an Introduction to Programming",
          body: "We assume you already know variables, branching, loops, functions, collections and basic algorithmic thinking.",
          points: [
            "the goal is Python as a language with its own object model and idioms",
            "we will compare code that merely works with code that is natural in Python"
          ]
        },
        "03-execution-model": {
          title: "How Python Code Runs",
          diagramItems: ["source .py", "bytecode", "Python VM", "objects in memory", "result or exception"]
        },
        "04-cpython": {
          title: "CPython Is the Reference Implementation",
          body: "When we normally say “Python”, we usually mean the Python language executed by the CPython implementation.",
          points: [
            "the language defines syntax and semantics",
            "CPython is the most widely used interpreter",
            "details such as `id()` or garbage collection may depend on the implementation"
          ]
        },
        "05-repl-script-module": {
          title: "REPL, Script, Module",
          body: "The same language is used for quick experiments, one-off scripts and importable modules."
        },
        "06-names-section": {
          title: "Name and Object",
          subtitle: "In Python, a variable is not a box with a fixed type."
        },
        "07-name-points-to-object": {
          title: "A Name Points to an Object",
          body: "The object has a type. The name may later point to a different object."
        },
        "08-identity-equality": {
          title: "Identity Is Not Equality",
          body: "`==` compares values. `is` checks whether two names refer to the same object."
        },
        "09-aliasing-question": {
          title: "What Gets Printed?",
          prompt: "First decide how many list objects were created by the program."
        },
        "10-assignment-copy": {
          title: "Assignment Is Not Copying",
          codeBlocks: [
            { label: "one object" },
            { label: "new list" }
          ]
        },
        "11-mutability-table": {
          title: "Mutability Determines Side Effects",
          table: {
            headers: ["Object type", "Examples", "Practical consequence"],
            rows: [
              ["immutable", "<code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>", "an operation typically creates a new object"],
              ["mutable", "<code>list</code>, <code>dict</code>, <code>set</code>", "the object can be changed through another reference"],
              ["watch out", "<code>tuple</code> containing a list", "immutability of the outer object is not deep immutability"]
            ]
          }
        },
        "12-shallow-deep-copy": {
          title: "Shallow Copy Does Not Copy Nested Objects"
        },
        "13-collections-section": {
          title: "Collections",
          subtitle: "Choosing a data structure is a design decision."
        },
        "14-collection-choice": {
          title: "Four Common Choices",
          table: {
            headers: ["Type", "When you need", "Properties"],
            rows: [
              ["<code>list</code>", "order, indexing, incremental changes", "ordered, mutable, duplicates"],
              ["<code>tuple</code>", "a fixed group of values", "ordered, immutable, duplicates"],
              ["<code>set</code>", "uniqueness and fast membership checks", "unordered, mutable, unique"],
              ["<code>dict</code>", "mapping key → value", "insertion ordered, mutable, unique keys"]
            ]
          }
        },
        "15-list-as-sequence": {
          title: "List as a Working Sequence"
        },
        "16-tuple-as-record": {
          title: "Tuple as a Fixed Structure",
          body: "A tuple is useful when the position of a value carries meaning and the structure does not change."
        },
        "17-set-membership": {
          title: "Set for Uniqueness and Membership"
        },
        "18-dict-mapping": {
          title: "Dict for Named Relationships"
        },
        "19-collection-question": {
          title: "Which Collection Should We Choose?",
          prompt: "We often need to check whether a particular student has already been processed. Order is not important.",
          code: { label: "design question" }
        },
        "20-iteration-section": {
          title: "Idiomatic Iteration",
          subtitle: "Python code should not look like a mechanical translation from C."
        },
        "21-direct-iteration": {
          title: "If You Do Not Need an Index, Do Not Ask for One",
          codeBlocks: [
            { label: "translated style" },
            { label: "natural Python" }
          ]
        },
        "22-enumerate": {
          title: "Index with `enumerate()`",
          body: "An index matters when it is part of the problem: order, numbering, or the position of an error."
        },
        "23-zip": {
          title: "Parallel Sequences with `zip()`",
          body: "`zip()` combines elements by position. It stops at the shortest sequence."
        },
        "24-slicing": {
          title: "Slicing Reads Part of a Sequence",
          body: "The shape is `start:stop:step`. The stop index is not included."
        },
        "25-unpacking": {
          title: "Unpacking Names the Meaning of Values"
        },
        "26-slicing-question": {
          title: "What Do These Expressions Return?",
          prompt: "Focus on the stop index and the negative index.",
          code: { label: "question" }
        },
        "27-comprehensions-section": {
          title: "Comprehensions",
          subtitle: "A compact notation for transformation or filtering, not a contest to make code as short as possible."
        },
        "28-loop-to-comprehension": {
          title: "Collection Transformation",
          codeBlocks: [
            { label: "explicit loop" },
            { label: "list comprehension" }
          ]
        },
        "29-filter-comprehension": {
          title: "Filtering in a Comprehension"
        },
        "30-set-dict-comprehension": {
          title: "Set and Dict Comprehension"
        },
        "31-too-clever-question": {
          title: "When Is Shorter Code Worse?",
          prompt: "Decide whether you would keep this form in production code.",
          code: { label: "too clever" }
        },
        "32-functions-section": {
          title: "Functions and Type Information",
          subtitle: "A familiar concept, but with important Python-specific details."
        },
        "33-keyword-arguments": {
          title: "Keyword Arguments Reduce Ambiguity"
        },
        "34-return-unpacking": {
          title: "Multiple Return Values Are a Tuple"
        },
        "35-mutable-default-question": {
          title: "What Is the Problem?",
          prompt: "A default argument is evaluated once, when the function is defined."
        },
        "36-none-default": {
          title: "`None` as a Safe Default",
          code: { label: "fix" }
        },
        "37-type-hints": {
          title: "Type Hints Do Not Change the Runtime Model",
          body: "Python remains dynamically typed. Hints help the reader, the IDE and static analysis tools."
        },
        "38-dataclass": {
          title: "`dataclass` for Small Data Models",
          body: "When a dictionary starts to have a stable structure, it often deserves a named type."
        },
        "39-errors-section": {
          title: "Errors, Modules and Environment",
          subtitle: "Code should be runnable, importable and maintainable."
        },
        "40-exceptions": {
          title: "Catch a Specific Exception",
          codeBlocks: [
            { label: "problem" },
            {
              label: "better",
              code: `try:
    value = int("abc")
except ValueError:
    print("Invalid number")`
            }
          ]
        },
        "41-main-pattern": {
          title: "A File Can Be Both a Script and a Module",
          body: "Startup code belongs in `main()`. Importing the file then does not run the whole program as a side effect."
        },
        "42-venv-pip": {
          title: "A Project Should Have Its Own Environment",
          body: "A virtual environment separates project dependencies from the system-wide Python installation."
        },
        "43-pyproject": {
          title: "`pyproject.toml` as Project Metadata",
          body: "Modern Python projects often describe the name, version, dependencies and build settings in `pyproject.toml`.",
          points: [
            "PyPI is the public package index",
            "`pip` installs packages into the current environment",
            "for this course, understanding the workflow is enough; packaging will be covered only to a practical extent"
          ]
        },
        "44-demo": {
          title: "Demo",
          points: [
            "REPL: aliasing, slicing, comprehension",
            "file: `main()`, type hints, dataclass",
            "environment: `.venv` and installing a small dependency"
          ]
        },
        "45-synthesis": {
          title: "Natural Python",
          diagramItems: ["object model", "collections", "iteration", "functions", "type hints", "modules", "environment"]
        }
      }
    }
  }
} satisfies Lecture;
