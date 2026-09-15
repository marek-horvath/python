import path from "node:path";
import pptxgen from "pptxgenjs";

const outputDirectory = path.resolve("presentations");

const colors = {
  navy: "16324F",
  blue: "1877B9",
  teal: "167C80",
  ink: "18212B",
  muted: "5E6B78",
  paper: "FFFFFF",
  panel: "F3F6F8",
  line: "D8E0E6",
  code: "17212B",
  codeText: "F4F7FA",
  accent: "E0A03A"
};

const text = (sk, en) => ({ sk, en });

const lecture01 = {
  slug: "01-uvod-ku-pythonu",
  title: text("Úvod ku Pythonu", "Introduction to Python"),
  deck: [
  { kind: "title", title: text("Úvod ku Pythonu", "Introduction to Python"), subtitle: text("Základy jazyka pre programátora", "Language foundations for programmers") },
  { kind: "agenda", title: text("Čo si z prednášky odniesť", "What to take from this lecture"), items: [text("ako Python pracuje s menami, objektmi a typmi", "how Python works with names, objects and types"), text("kedy zvoliť list, tuple, set alebo dict", "when to choose list, tuple, set or dict"), text("ako čítať a písať idiomatický Python", "how to read and write idiomatic Python"), text("ako skladať malé, overiteľné funkcie", "how to compose small, testable functions")] },
  { kind: "diagram", title: text("Python v praxi", "Python in practice"), body: text("Jazyk je spoločný, problém určuje nástroje.", "The language is shared; the problem determines the tools."), items: [text("automatizácia", "automation"), text("dáta", "data"), text("web a API", "web and APIs"), text("desktop nástroje", "desktop tools")] },
  { kind: "theory", title: text("Nie úvod do programovania", "Not an introduction to programming"), body: text("Predpokladáme, že už poznáte vetvenie, cykly, funkcie a základné dátové štruktúry.", "This assumes you already know branching, loops, functions and basic data structures."), items: [text("cieľom je naučiť sa Python používať prirodzene", "the goal is to use Python naturally"), text("stručná syntax nie je jediná vlastnosť dobrého Python kódu", "short syntax is not the only quality of good Python code"), text("dôležité sú čitateľnosť, pomenovanie a práca s objektmi", "readability, naming and object behaviour matter")] },
  { kind: "theory", title: text("Tri bežné spôsoby práce", "Three common ways to work"), items: [text("REPL: rýchly experiment a overenie nápadu", "REPL: a quick experiment and idea check"), text("script: opakovateľná úloha v súbore .py", "script: a repeatable task in a .py file"), text("modul: kód, ktorý môže použiť iný program", "module: code another program can import")] },
  { kind: "code", title: text("REPL, script, modul", "REPL, script, module"), label: "terminal", code: "python --version\npython\npython report.py\npython -m package.module", note: text("Rovnaký interpreter spúšťa krátky experiment aj väčší projekt.", "The same interpreter runs a short experiment and a larger project.") },
  { kind: "section", number: "01", title: text("Mená a objekty", "Names and objects"), subtitle: text("Premenná v Pythone nie je krabica s typom.", "A Python variable is not a typed box.") },
  { kind: "diagram", title: text("Meno ukazuje na objekt", "A name refers to an object"), body: text("Typ patrí objektu. Meno môže neskôr odkazovať na iný objekt.", "The type belongs to the object. A name can later refer to a different object."), items: [text("name: value", "name: value"), text("objekt 42", "object 42"), text("name: value", "name: value"), text("objekt 'Python'", "object 'Python'")] },
  { kind: "code", title: text("Dynamické typovanie", "Dynamic typing"), label: "python", code: "value = 42\nprint(type(value).__name__)\n\nvalue = \"Python\"\nprint(type(value).__name__)", note: text("Neznamená to, že typy neexistujú. Znamená to, že deklarácia mena ich neurčuje natrvalo.", "It does not mean types do not exist. It means a name declaration does not fix them permanently.") },
  { kind: "question", title: text("Otázka: čo sa vypíše?", "Question: what is printed?"), prompt: text("Koľko list objektov vzniklo?", "How many list objects were created?"), label: "python", code: "a = [1, 2]\nb = a\nb.append(3)\n\nprint(a)\nprint(b)" },
  { kind: "compare", title: text("Priradenie nie je kopírovanie", "Assignment is not copying"), columns: [
    { title: text("Rovnaký objekt", "Same object"), items: [text("b = a", "b = a"), text("zmena cez b zmení aj a", "a change through b changes a too"), text("vhodné pri úmyselnom zdieľaní", "useful for intentional sharing")] },
    { title: text("Nový objekt", "New object"), items: [text("b = a.copy()", "b = a.copy()"), text("samostatný list", "an independent list"), text("pozor na vnorené mutabilné hodnoty", "watch for nested mutable values")] }
  ] },
  { kind: "code", title: text("Plytká a hlboká kópia", "Shallow and deep copies"), label: "python", code: "from copy import deepcopy\n\noriginal = {\"scores\": [80, 90]}\nshallow = original.copy()\ndeep = deepcopy(original)\n\nshallow[\"scores\"].append(100)", note: text("Plytká kópia vytvorí nový slovník, ale vnorený list zostáva zdieľaný.", "A shallow copy creates a new dictionary, but the nested list remains shared.") },
  { kind: "theory", title: text("Mutabilita je vlastnosť objektu", "Mutability is a property of an object"), items: [text("list, dict a set vieme meniť na mieste", "list, dict and set can change in place"), text("str, tuple, int a float sú nemenné", "str, tuple, int and float are immutable"), text("pri funkciách si vždy všimnite, či objekt meníte alebo vytvárate nový", "in functions, always notice whether you mutate an object or create a new one")] },
  { kind: "section", number: "02", title: text("Kolekcie a iterovanie", "Collections and iteration"), subtitle: text("Dátová štruktúra vyjadruje zámer programu.", "A data structure communicates the program's intent.") },
  { kind: "table", title: text("Kedy ktorú kolekciu?", "Which collection when?"), headers: [text("Štruktúra", "Structure"), text("Použite, keď", "Use it when"), text("Typický príklad", "Typical example")], rows: [
    [text("list", "list"), text("záleží na poradí a opakovaní", "order and duplicates matter"), text("zoznam úloh", "a task list")],
    [text("tuple", "tuple"), text("údaj má pevnú štruktúru", "data has a fixed shape"), text("(x, y) súradnice", "(x, y) coordinates")],
    [text("set", "set"), text("potrebujete unikátne hodnoty alebo membership", "you need unique values or membership"), text("oprávnenia používateľa", "user permissions")],
    [text("dict", "dict"), text("hodnotu hľadáte podľa kľúča", "you look up a value by key"), text("id → používateľ", "id → user")]
  ] },
  { kind: "code", title: text("List: postupné spracovanie", "List: sequential processing"), label: "python", code: "scores = [72, 91, 45, 88]\npassed = []\n\nfor score in scores:\n    if score >= 51:\n        passed.append(score)\n\nprint(passed)", note: text("Najprv píšte kód, ktorý sa dá ľahko čítať. Skrátenie môže prísť až potom.", "Write code that is easy to read first. Shortening can come later.") },
  { kind: "code", title: text("dict: pomenované hodnoty", "dict: named values"), label: "python", code: "student = {\n    \"name\": \"Anna\",\n    \"points\": 92,\n    \"active\": True,\n}\n\nprint(student[\"name\"])", note: text("Kľúče majú opisovať význam hodnoty, nie poradie v pamäti.", "Keys should describe a value's meaning, not its position in memory.") },
  { kind: "theory", title: text("Iterovanie: pracujte s hodnotou", "Iteration: work with the value"), body: text("Index potrebujete iba vtedy, keď má index samostatný význam.", "You only need an index when the index itself has a separate meaning."), items: [text("for value in values", "for value in values"), text("for key, value in data.items()", "for key, value in data.items()"), text("for index, value in enumerate(values)", "for index, value in enumerate(values)")] },
  { kind: "code", title: text("enumerate a zip", "enumerate and zip"), label: "python", code: "names = [\"Anna\", \"Peter\", \"Lucia\"]\npoints = [92, 67, 81]\n\nfor index, (name, score) in enumerate(zip(names, points), start=1):\n    print(index, name, score)", note: text("zip prepája súvisiace sekvencie. Ak majú dáta vlastnú identitu, zvážte radšej jednu štruktúru objektov.", "zip connects related sequences. If data has its own identity, consider one structure of objects instead.") },
  { kind: "question", title: text("Otázka: ktorý zápis je čitateľnejší?", "Question: which form is more readable?"), prompt: text("Čo vyjadruje index v tomto cykle?", "What does the index mean in this loop?"), label: "python", code: "for i in range(len(names)):\n    print(names[i])" },
  { kind: "theory", title: text("Slicing a unpacking", "Slicing and unpacking"), items: [text("values[1:4] vytvorí časť sekvencie", "values[1:4] creates part of a sequence"), text("values[::-1] vytvorí obrátenú kópiu", "values[::-1] creates a reversed copy"), text("first, *middle, last zrozumiteľne rozdelí sekvenciu", "first, *middle, last clearly splits a sequence")] },
  { kind: "code", title: text("Rozbalenie podľa štruktúry", "Unpacking by structure"), label: "python", code: "record = (\"Anna\", \"Python\", 92)\nname, course, points = record\n\nvalues = [10, 20, 30, 40, 50]\nfirst, *middle, last = values\n\nprint(first, middle, last)", note: text("Unpacking je vhodný, keď počet alebo význam častí poznáme.", "Unpacking is useful when the number or meaning of the parts is known.") },
  { kind: "section", number: "03", title: text("Transformácia dát", "Data transformation"), subtitle: text("Comprehension je nástroj, nie cieľ.", "A comprehension is a tool, not the goal.") },
  { kind: "code", title: text("Od cyklu ku comprehension", "From a loop to a comprehension"), label: "python", code: "scores = [72, 91, 45, 88]\n\npassed = [score for score in scores if score >= 51]\nsquared = [score ** 2 for score in passed]", note: text("Jeden výber alebo transformácia je dobrý kandidát na comprehension.", "One selection or transformation is a good comprehension candidate.") },
  { kind: "compare", title: text("Pythonic neznamená najkratší", "Pythonic does not mean shortest"), columns: [
    { title: text("Dobré použitie", "Good use"), items: [text("jedna jasná transformácia", "one clear transformation"), text("krátke pomenovanie výrazu", "a short expression with clear naming"), text("výsledok sa dá prečítať zľava doprava", "the result reads left to right")] },
    { title: text("Zastavte sa", "Stop and reconsider"), items: [text("tri vnorené cykly", "three nested loops"), text("viac podmienok a pomocných výrazov", "many conditions and helper expressions"), text("čitateľ musí najprv simulovať kód", "the reader must simulate the code first")] }
  ] },
  { kind: "code", title: text("Čitateľný kód je lepší než trik", "Readable code beats a trick"), label: "python", code: "groups = {}\n\nfor result in results:\n    if result.points >= 51:\n        groups.setdefault(result.course, []).append(result.student)", note: text("Tento zápis je často lepší než komplikovaná vnorená comprehension, lebo odhaľuje jednotlivé kroky.", "This is often better than a complicated nested comprehension because it exposes each step.") },
  { kind: "section", number: "04", title: text("Funkcie a malé modely", "Functions and small models"), subtitle: text("Funkcia má mať zrozumiteľnú zodpovednosť.", "A function should have a clear responsibility.") },
  { kind: "diagram", title: text("Zmluva funkcie", "A function contract"), body: text("Dobrý podpis napovie, čo funkcia očakáva a čo vracia.", "A good signature shows what a function expects and returns."), items: [text("vstup", "input"), text("spracovanie", "processing"), text("návratová hodnota", "return value"), text("volajúci kód", "calling code")] },
  { kind: "code", title: text("Type hints ako dokumentácia", "Type hints as documentation"), label: "python", code: "def average(values: list[float]) -> float:\n    if not values:\n        raise ValueError(\"values must not be empty\")\n    return sum(values) / len(values)", note: text("Type hints pomáhajú čitateľovi, IDE aj statickej kontrole. Za behu samy osebe nevynucujú typy.", "Type hints help the reader, IDE and static checks. They do not enforce types at runtime by themselves.") },
  { kind: "theory", title: text("Default argument musí byť bezpečný", "A default argument must be safe"), items: [text("nemenné defaulty sú spravidla bezpečné", "immutable defaults are generally safe"), text("mutabilné defaulty sa vytvoria iba raz", "mutable defaults are created only once"), text("pre list alebo dict používajte None a objekt vytvorte vo funkcii", "for a list or dict, use None and create the object inside the function")] },
  { kind: "code", title: text("Mutable default argument", "Mutable default argument"), label: "python", code: "def add_student(name: str, students: list[str] | None = None) -> list[str]:\n    if students is None:\n        students = []\n    students.append(name)\n    return students", note: text("Tým sa pri každom volaní bez argumentu vytvorí nový list.", "This creates a new list for every call without an argument.") },
  { kind: "code", title: text("dataclass pre dáta s významom", "dataclass for meaningful data"), label: "python", code: "from dataclasses import dataclass\n\n@dataclass\nclass Result:\n    student: str\n    course: str\n    points: int", note: text("Ak sú spolu hodnoty, ktoré opisujú jednu vec, pomenovaný dátový model je čitateľnejší než nejasný tuple.", "When values describe one thing together, a named data model is clearer than an ambiguous tuple.") },
  { kind: "section", number: "05", title: text("Chyby, moduly, prostredie", "Errors, modules, environment"), subtitle: text("Malý program má byť spustiteľný aj mimo vášho počítača.", "A small program should run outside your own computer too.") },
  { kind: "code", title: text("Výnimka nie je normálny návrat", "An exception is not a normal return"), label: "python", code: "try:\n    score = int(user_input)\nexcept ValueError:\n    print(\"Zadajte celé číslo.\")\nelse:\n    print(f\"Skóre: {score}\")", note: text("Zachyťte iba chybu, s ktorou viete konkrétne pracovať. Nepoužívajte except: pass.", "Catch only an error you can handle specifically. Do not use except: pass.") },
  { kind: "code", title: text("Importy a virtuálne prostredie", "Imports and a virtual environment"), label: "terminal", code: "python -m venv .venv\n# Windows\n.venv\\Scripts\\activate\n\npython -m pip install requests\npython -m pip list", note: text("Virtuálne prostredie izoluje dependencies projektu od systémového Pythonu.", "A virtual environment isolates project dependencies from the system Python.") },
  { kind: "theory", title: text("Pracovný návyk", "A working habit"), items: [text("spúšťajte príklady často a v malých krokoch", "run examples often and in small steps"), text("čítajte chybové hlásenie od konca k riadku vo vlastnom kóde", "read an error message from the end to the line in your own code"), text("nezakrývajte chybu ďalším if alebo except blokom", "do not hide an error behind another if or except block"), text("vytvorte malý príklad, ktorý problém izoluje", "create a small example that isolates the problem")] },
  { kind: "demo", title: text("Krátka ukážka", "Short demonstration"), body: text("Z raw dát vytvoríme Result, vyfiltrujeme úspešné výsledky a vypíšeme prehľad podľa predmetu.", "From raw data, create Result, filter passing results and print a summary by course."), items: [text("tuple → dataclass", "tuple → dataclass"), text("funkcia s type hints", "a function with type hints"), text("list / dict / comprehension podľa potreby", "list / dict / comprehension where appropriate"), text("jedna zachytená chyba vstupu", "one handled input error")] },
  { kind: "recap", title: text("Zhrnutie", "Recap"), items: [text("mená odkazujú na objekty; mutabilita ovplyvňuje zdieľanie", "names refer to objects; mutability affects sharing"), text("kolekciu vyberáme podľa operácie, nie podľa zvyku", "choose a collection by operation, not habit"), text("comprehension má zjednodušiť, nie zahmliť", "a comprehension should simplify, not obscure"), text("funkcie, type hints a dataclass dávajú kódu štruktúru", "functions, type hints and dataclass give code structure")] },
  { kind: "title", title: text("Ďalej: Skriptovanie a automatizácia", "Next: Scripting and Automation"), subtitle: text("Ako tieto základy použiť pri práci so súbormi, textom a operačným systémom.", "How to apply these foundations to files, text and the operating system.") }
  ]
};

const lecture02 = {
  slug: "02-skriptovanie-automatizacia",
  title: text("Skriptovanie a automatizácia", "Scripting and Automation"),
  deck: [
    { kind: "title", title: text("Skriptovanie a automatizácia", "Scripting and Automation"), subtitle: text("Python ako nástroj pre opakovateľnú prácu", "Python as a tool for repeatable work") },
    { kind: "agenda", title: text("Cieľ prednášky", "Lecture objective"), items: [text("premeniť manuálny postup na bezpečný script", "turn a manual procedure into a safe script"), text("pracovať so súbormi a cestami cez pathlib", "work with files and paths through pathlib"), text("čítať a vytvárať JSON, CSV a textové reporty", "read and create JSON, CSV and text reports"), text("použiť CLI, environment variables a subprocess rozumne", "use CLI, environment variables and subprocess responsibly")] },
    { kind: "compare", title: text("Opakovanie je signál", "Repetition is a signal"), columns: [{ title: text("Manuálny postup", "Manual procedure"), items: [text("800 súborov treba premenovať", "800 files need renaming"), text("výnimky sa ľahko prehliadnu", "exceptions are easy to miss"), text("postup sa ťažko zopakuje", "the procedure is hard to repeat")] }, { title: text("Python script", "Python script"), items: [text("pravidlá sú zapísané v kóde", "rules are written in code"), text("vieme spraviť dry-run", "we can run a dry-run"), text("vytvoríme report o výsledku", "we create a report of the result")] }] },
    { kind: "theory", title: text("Čo má automatizácia robiť", "What automation should do"), body: text("Script je malý program s jasným vstupom, postupom a výstupom.", "A script is a small program with a clear input, process and output."), items: [text("prijať vstup od používateľa alebo zo súboru", "accept input from a user or file"), text("validovať pred tým, než niečo zmení", "validate before changing anything"), text("zrozumiteľne oznámiť úspech aj chybu", "communicate success and failure clearly")] },
    { kind: "question", title: text("Otázka: čo najprv nespúšťať naplno?", "Question: what should not run at full scale first?"), prompt: text("Script má presúvať stovky súborov. Akú kontrolu chcete pred prvým reálnym spustením?", "A script will move hundreds of files. What check do you want before its first real run?"), label: "command", code: "python organize.py Downloads --dry-run" },
    { kind: "section", number: "01", title: text("Script ako malý program", "A script as a small program"), subtitle: text("Rozumné hranice aj bez veľkej architektúry.", "Sensible boundaries without a large architecture.") },
    { kind: "diagram", title: text("Tvar praktického scriptu", "Shape of a practical script"), body: text("Každý krok má pomenovanú zodpovednosť.", "Every step has a named responsibility."), items: [text("vstup", "input"), text("validácia", "validation"), text("spracovanie", "processing"), text("report", "report")] },
    { kind: "code", title: text("main() určuje začiatok", "main() defines the entry point"), label: "organize.py", code: "def main() -> None:\n    directory = parse_arguments()\n    organize(directory)\n\nif __name__ == \"__main__\":\n    main()", note: text("Definície funkcií ostanú oddelené od okamihu, keď script spustíme.", "Function definitions stay separate from the moment the script runs.") },
    { kind: "compare", title: text("Globálny postup alebo funkcie", "Global procedure or functions"), columns: [{ title: text("Ťažko meniť", "Hard to change"), items: [text("50 riadkov pod sebou", "50 lines in sequence"), text("cesta, pravidlá aj výpis spolu", "path, rules and output together"), text("ťažko overiteľné kroky", "steps are hard to verify")] }, { title: text("Čitateľný script", "Readable script"), items: [text("find_files()", "find_files()"), text("destination_for()", "destination_for()"), text("organize() a main()", "organize() and main()")] }] },
    { kind: "section", number: "02", title: text("Súbory a pathlib", "Files and pathlib"), subtitle: text("Cesta nie je iba string poskladaný lomkami.", "A path is not merely a string joined with slashes.") },
    { kind: "code", title: text("Čítanie textu", "Reading text"), label: "python", code: "with open(\"data.txt\", encoding=\"utf-8\") as file:\n    content = file.read()\n\nprint(content)", note: text("with spoľahlivo zavrie súbor aj pri výnimke. Pri texte uvádzajte encoding.", "with reliably closes a file even on an exception. Specify an encoding for text.") },
    { kind: "code", title: text("Po riadkoch, nie naraz", "By lines, not all at once"), label: "python", code: "with open(\"app.log\", encoding=\"utf-8\") as file:\n    for line in file:\n        if \"ERROR\" in line:\n            print(line.strip())", note: text("Pri logoch a veľkých súboroch nepotrebujete celý obsah držať v pamäti.", "For logs and large files, you do not need to keep all content in memory.") },
    { kind: "code", title: text("Path je objekt cesty", "Path is a path object"), label: "python", code: "from pathlib import Path\n\npath = Path(\"Downloads\")\nprint(path.exists())\nprint(path.is_dir())\n\nreport = path / \"reports\" / \"summary.txt\"", note: text("Operátor / skladá cestu nezávisle od platformy.", "The / operator composes a path independently of the platform.") },
    { kind: "theory", title: text("Vlastnosti cesty", "Path properties"), items: [text("name: report.final.pdf", "name: report.final.pdf"), text("stem: report.final", "stem: report.final"), text("suffix: .pdf", "suffix: .pdf"), text("parent: nadradený adresár", "parent: parent directory")] },
    { kind: "code", title: text("Vyhľadanie súborov", "Finding files"), label: "python", code: "from pathlib import Path\n\nroot = Path(\"Downloads\")\nfor path in sorted(root.rglob(\"*.pdf\")):\n    print(path.name)", note: text("glob hľadá v jednom adresári; rglob prechádza aj podadresáre.", "glob searches one directory; rglob also traverses subdirectories.") },
    { kind: "question", title: text("Otázka: čo vráti suffix?", "Question: what does suffix return?"), prompt: text("Najprv odpovedzte bez spustenia.", "Answer before running the code."), label: "python", code: "Path(\"report.final.pdf\").suffix" },
    { kind: "section", number: "03", title: text("Priebežný príklad: Downloads", "Running example: Downloads"), subtitle: text("Organizátor najprv ukáže plán, až potom presúva.", "The organizer shows a plan first, then moves files.") },
    { kind: "diagram", title: text("Od súboru ku kategórii", "From file to category"), items: [text("photo.jpg", "photo.jpg"), text(".jpg", ".jpg"), text("images", "images"), text("Downloads/images", "Downloads/images")] },
    { kind: "code", title: text("Pravidlo je samostatná funkcia", "A rule is a separate function"), label: "python", code: "CATEGORIES = {\n    \"documents\": {\".pdf\", \".txt\", \".docx\"},\n    \"images\": {\".jpg\", \".png\"},\n}\n\ndef category_for(path: Path) -> str:\n    return next((name for name, suffixes in CATEGORIES.items()\n                 if path.suffix.lower() in suffixes), \"other\")", note: text("Pravidlá nepatria medzi príkazy na presúvanie. Dajú sa jednoducho upraviť alebo otestovať.", "Rules do not belong among move commands. They are easy to change or test.") },
    { kind: "code", title: text("Dry-run pred zmenou", "Dry-run before change"), label: "python", code: "target = directory / category / path.name\n\nif dry_run:\n    print(f\"MOVE {path.name} -> {target}\")\nelse:\n    target.parent.mkdir(exist_ok=True)\n    shutil.move(path, target)", note: text("Pri hromadnej zmene dát je výpis plánu súčasťou bezpečného návrhu.", "When changing data in bulk, printing the plan is part of safe design.") },
    { kind: "section", number: "04", title: text("Dáta a text", "Data and text"), subtitle: text("Štandardná knižnica stačí na veľa praktických formátov.", "The standard library is enough for many practical formats.") },
    { kind: "diagram", title: text("JSON v Pythone", "JSON in Python"), body: text("JSON prenáša štruktúrované dáta. Python ich načíta do vlastných základných typov.", "JSON carries structured data. Python loads it into its built-in types."), items: [text("object → dict", "object → dict"), text("array → list", "array → list"), text("boolean → bool", "boolean → bool"), text("null → None", "null → None")] },
    { kind: "code", title: text("Načítanie konfigurácie JSON", "Loading JSON configuration"), label: "python", code: "import json\n\nwith open(\"categories.json\", encoding=\"utf-8\") as file:\n    config = json.load(file)\n\nprint(config[\"images\"])", note: text("json.load pracuje so súborom. json.loads pracuje so stringom.", "json.load works with a file. json.loads works with a string.") },
    { kind: "code", title: text("CSV: používajte pomenované stĺpce", "CSV: use named columns"), label: "python", code: "import csv\n\nwith open(\"results.csv\", newline=\"\", encoding=\"utf-8\") as file:\n    reader = csv.DictReader(file)\n    for row in reader:\n        print(row[\"name\"], row[\"points\"])", note: text("DictReader je čitateľnejší než indexy, keď CSV má hlavičku.", "DictReader is clearer than indexes when CSV has a header.") },
    { kind: "compare", title: text("String metóda alebo regex", "String method or regex"), columns: [{ title: text("Najprv jednoduché", "Start simple"), items: [text("\"ERROR\" in line", "\"ERROR\" in line"), text("line.startswith(date)", "line.startswith(date)"), text("text.split() a strip()", "text.split() and strip()")] }, { title: text("Regex až pri vzore", "Regex for a pattern"), items: [text("email alebo dátum v texte", "an email or date in text"), text("viac možných formátov", "multiple possible formats"), text("re.search, findall, sub", "re.search, findall, sub")] }] },
    { kind: "code", title: text("Regex: nájdite konkrétny vzor", "Regex: find a concrete pattern"), label: "python", code: "import re\n\nline = \"2026-09-21 ERROR Cannot open data.csv\"\ndate = re.search(r\"\\d{4}-\\d{2}-\\d{2}\", line)\nprint(date.group())", note: text("Regex použite vtedy, keď obyčajný split alebo in nestačí elegantne.", "Use regex when a simple split or in does not solve the problem cleanly.") },
    { kind: "section", number: "05", title: text("Vstup, prostredie a procesy", "Input, environment and processes"), subtitle: text("Script nemá predpokladať váš počítač.", "A script should not assume your computer.") },
    { kind: "code", title: text("CLI cez argparse", "CLI through argparse"), label: "python", code: "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"directory\")\nparser.add_argument(\"--dry-run\", action=\"store_true\")\nargs = parser.parse_args()", note: text("Cesta patrí do argumentu, nie do hardcoded absolútneho stringu.", "A path belongs in an argument, not in a hardcoded absolute string.") },
    { kind: "code", title: text("Konfigurácia z prostredia", "Configuration from the environment"), label: "python", code: "import os\n\napi_key = os.getenv(\"API_KEY\")\nif api_key is None:\n    raise RuntimeError(\"Missing API_KEY\")", note: text("Heslá a API keys nepatria do source code ani do commitu.", "Passwords and API keys do not belong in source code or a commit.") },
    { kind: "code", title: text("Externý proces cez subprocess", "An external process through subprocess"), label: "python", code: "import subprocess\n\nresult = subprocess.run(\n    [\"git\", \"status\"],\n    capture_output=True,\n    text=True,\n)\nprint(result.returncode, result.stdout)", note: text("Odovzdajte argumenty ako list. shell=True nie je vhodná skratka pre používateľský input.", "Pass arguments as a list. shell=True is not a suitable shortcut for user input.") },
    { kind: "theory", title: text("Script sa musí vedieť zastaviť", "A script must know when to stop"), items: [text("súbor nemusí existovať", "a file may not exist"), text("cieľ môže byť bez oprávnenia", "the target may lack permission"), text("JSON môže byť poškodený", "JSON may be invalid"), text("chybu zachyťte iba tam, kde viete použiť zmysluplnú reakciu", "catch an error only where you can provide a meaningful response")] },
    { kind: "code", title: text("Konkrétna chyba, konkrétna reakcia", "A concrete error, a concrete reaction"), label: "python", code: "try:\n    content = path.read_text(encoding=\"utf-8\")\nexcept FileNotFoundError:\n    print(f\"Súbor neexistuje: {path}\")\nexcept PermissionError:\n    print(f\"Bez oprávnenia: {path}\")", note: text("except: pass iba schová problém. Script potom nemá dôveryhodný výsledok.", "except: pass only hides a problem. The script then has no trustworthy result.") },
    { kind: "recap", title: text("Zhrnutie", "Recap"), items: [text("script je opakovateľný postup, nie iba pár príkazov", "a script is a repeatable procedure, not merely a few commands"), text("Path, JSON a CSV dávajú vstupom štruktúru", "Path, JSON and CSV give inputs structure"), text("dry-run, validácia a konkrétne výnimky chránia dáta", "dry-run, validation and concrete exceptions protect data"), text("CLI a environment variables oddeľujú konfiguráciu od kódu", "CLI and environment variables separate configuration from code")] },
    { kind: "title", title: text("Ďalej: GUI a event-driven programovanie", "Next: GUI and Event-Driven Programming"), subtitle: text("Čo sa zmení, keď program nečaká na ďalší riadok kódu, ale na používateľa?", "What changes when a program waits not for the next line of code, but for the user?") }
  ]
};

const lecture03 = {
  slug: "03-gui-event-driven",
  title: text("GUI a event-driven programovanie", "GUI and Event-Driven Programming"),
  deck: [
    { kind: "title", title: text("GUI a event-driven programovanie", "GUI and Event-Driven Programming"), subtitle: text("Program čaká na používateľa, nie na ďalší riadok kódu", "A program waits for the user, not for the next line of code") },
    { kind: "agenda", title: text("Cieľ prednášky", "Lecture objective"), items: [text("porozumieť event loopu a callbackom", "understand the event loop and callbacks"), text("postaviť malé Tkinter/ttk okno", "build a small Tkinter/ttk window"), text("oddeliť UI od aplikačnej logiky", "separate UI from application logic"), text("použiť udalosti, dialógy a Canvas", "use events, dialogs and Canvas")] },
    { kind: "compare", title: text("Lineárny program a GUI", "A linear program and a GUI"), columns: [{ title: text("Terminál", "Terminal"), items: [text("input → spracovanie → output", "input → processing → output"), text("poradie krokov určuje program", "the program determines the order"), text("program skončí", "the program finishes")] }, { title: text("GUI", "GUI"), items: [text("používateľ si vyberá ďalšiu akciu", "the user chooses the next action"), text("kliknutie, kláves, výber súboru", "click, key press, file selection"), text("aplikácia zostáva otvorená", "the application stays open")] }] },
    { kind: "code", title: text("Terminálový program má pevné poradie", "A terminal program has a fixed order"), label: "python", code: "name = input(\"Meno: \")\nprint(f\"Ahoj {name}\")", note: text("Tento program vie, čo bude nasledovať. GUI to vedieť nemôže.", "This program knows what comes next. A GUI cannot know that.") },
    { kind: "section", number: "01", title: text("Event loop", "The event loop"), subtitle: text("Najdôležitejší model celej prednášky.", "The most important model of this lecture.") },
    { kind: "diagram", title: text("Ako GUI reaguje", "How a GUI reacts"), items: [text("vytvorenie okna", "create window"), text("mainloop()", "mainloop()"), text("udalosť", "event"), text("callback", "callback")] },
    { kind: "theory", title: text("Pojmy, ktoré potrebujeme", "Concepts we need"), items: [text("widget: prvok rozhrania, napríklad Button alebo Entry", "widget: an interface element such as Button or Entry"), text("event: kliknutie, stlačenie klávesu alebo zmena hodnoty", "event: a click, key press or value change"), text("callback: funkcia zavolaná po udalosti", "callback: a function called after an event"), text("state: údaje, ktoré si aplikácia pamätá", "state: data remembered by the application")] },
    { kind: "code", title: text("Prvé okno", "The first window"), label: "python", code: "import tkinter as tk\n\nroot = tk.Tk()\nroot.title(\"Moja aplikácia\")\nroot.mainloop()", note: text("mainloop() neukončuje program. Odovzdá riadenie event loopu.", "mainloop() does not finish the program. It hands control to the event loop.") },
    { kind: "section", number: "02", title: text("Widgety a callbacky", "Widgets and callbacks"), subtitle: text("Tkinter je nástroj na vysvetlenie modelu, nie jediný GUI framework.", "Tkinter explains the model; it is not the only GUI framework.") },
    { kind: "code", title: text("Label a Button", "Label and Button"), label: "python", code: "from tkinter import ttk\n\nlabel = ttk.Label(root, text=\"Ahoj\")\nlabel.pack()\n\nbutton = ttk.Button(root, text=\"Klikni\")\nbutton.pack()", note: text("ttk poskytuje themed widgety. V príkladoch ho používame tam, kde je vhodný.", "ttk provides themed widgets. We use it where appropriate in examples.") },
    { kind: "code", title: text("Callback odovzdávame, nevoláme", "Pass a callback; do not call it"), label: "python", code: "def say_hello() -> None:\n    print(\"Ahoj\")\n\nbutton = ttk.Button(\n    root,\n    text=\"Klikni\",\n    command=say_hello,\n)", note: text("command=say_hello odovzdá funkciu. command=say_hello() ju zavolá hneď pri tvorbe tlačidla.", "command=say_hello passes a function. command=say_hello() calls it immediately while creating the button.") },
    { kind: "question", title: text("Otázka: kedy sa funkcia zavolá?", "Question: when is the function called?"), prompt: text("Porovnajte tieto dva zápisy ešte pred spustením.", "Compare the two forms before running them."), label: "python", code: "command=save\ncommand=save()" },
    { kind: "code", title: text("Callback aktualizuje UI", "A callback updates the UI"), label: "python", code: "def say_hello() -> None:\n    label.config(text=\"Ahoj!\")\n\nlabel = ttk.Label(root, text=\"Čakám\")\nbutton = ttk.Button(root, text=\"Pozdraviť\", command=say_hello)", note: text("Udalosť spustí callback; callback zmení stav alebo widget; UI zobrazí nový výsledok.", "An event starts a callback; the callback changes state or a widget; the UI shows the result.") },
    { kind: "section", number: "03", title: text("Vstup, layout a stav", "Input, layout and state"), subtitle: text("Malý formulár už ukáže všetky základné vzťahy.", "A small form already shows the essential relationships.") },
    { kind: "code", title: text("Entry a výsledok", "Entry and result"), label: "python", code: "entry = ttk.Entry(root)\nresult = ttk.Label(root, text=\"\")\n\ndef greet() -> None:\n    name = entry.get().strip()\n    result.config(text=f\"Ahoj, {name}!\")", note: text("Text z Entry čítame v momente udalosti, nie pri jeho vytvorení.", "Read text from an Entry at the moment of the event, not when creating it.") },
    { kind: "diagram", title: text("grid() pre formulár", "grid() for a form"), items: [text("Meno:", "Name:"), text("Entry", "Entry"), text("Email:", "Email:"), text("Uložiť", "Save")] },
    { kind: "code", title: text("Základ grid layoutu", "Basic grid layout"), label: "python", code: "ttk.Label(root, text=\"Meno:\").grid(row=0, column=0, padx=8, pady=8)\nentry.grid(row=0, column=1, padx=8, pady=8)\nbutton.grid(row=1, column=1, sticky=\"e\")", note: text("V jednom kontajneri nemiešajte pack() a grid().", "Do not mix pack() and grid() in one container.") },
    { kind: "theory", title: text("Stav aplikácie", "Application state"), items: [text("text v Entry je stav rozhrania", "text in an Entry is UI state"), text("selected_file je stav vybraného vstupu", "selected_file is state of selected input"), text("výsledok analýzy je aplikačný stav", "an analysis result is application state"), text("StringVar a BooleanVar sú pomocné prepojenia, nie povinnosť", "StringVar and BooleanVar are helpful bindings, not a requirement")] },
    { kind: "section", number: "04", title: text("Events a dialógy", "Events and dialogs"), subtitle: text("Tlačidlo nie je jediný zdroj udalosti.", "A button is not the only event source.") },
    { kind: "code", title: text("Enter spustí tú istú akciu", "Enter triggers the same action"), label: "python", code: "def submit(event=None) -> None:\n    greet()\n\nbutton.config(command=submit)\nentry.bind(\"<Return>\", submit)", note: text("Handler z bind dostane event argument. Default None dovolí použiť tú istú funkciu aj pre command.", "A bind handler receives an event argument. A default None lets the same function work for command too.") },
    { kind: "code", title: text("Súborový dialóg", "A file dialog"), label: "python", code: "from tkinter import filedialog\n\nfilename = filedialog.askopenfilename(\n    filetypes=[(\"Text files\", \"*.txt\")],\n)\nif filename:\n    print(filename)", note: text("Cancel nie je chyba. Používateľ jednoducho nevybral súbor.", "Cancel is not an error. The user simply did not choose a file.") },
    { kind: "section", number: "05", title: text("Text Analyzer", "Text Analyzer"), subtitle: text("GUI zmysluplne prepája Prednášku 02 a Prednášku 03.", "The GUI meaningfully connects Lectures 02 and 03.") },
    { kind: "code", title: text("Logika mimo callbacku", "Logic outside the callback"), label: "python", code: "from dataclasses import dataclass\n\n@dataclass\nclass TextStats:\n    lines: int\n    words: int\n    characters: int\n\ndef analyze_text(text: str) -> TextStats:\n    return TextStats(text.count(\"\\n\") + 1, len(text.split()), len(text))", note: text("Táto funkcia sa dá testovať bez okna. Callback má len koordinovať vstup a výstup.", "This function can be tested without a window. A callback should only coordinate input and output.") },
    { kind: "compare", title: text("GUI logika a aplikačná logika", "GUI logic and application logic"), columns: [{ title: text("Callback", "Callback"), items: [text("prečíta widget", "reads a widget"), text("otvorí dialóg", "opens a dialog"), text("aktualizuje Label", "updates a Label")] }, { title: text("Funkcia", "Function"), items: [text("spracuje text alebo dáta", "processes text or data"), text("vráti výsledok", "returns a result"), text("dá sa samostatne testovať", "can be tested independently")] }] },
    { kind: "code", title: text("Validácia v GUI", "Validation in a GUI"), label: "python", code: "from tkinter import messagebox\n\ndef read_age() -> int | None:\n    try:\n        return int(entry.get())\n    except ValueError:\n        messagebox.showerror(\"Chybný vstup\", \"Zadajte celé číslo.\")\n        return None", note: text("Výnimku premeníme na správu, ktorej používateľ rozumie.", "We turn an exception into a message the user can understand.") },
    { kind: "section", number: "06", title: text("Canvas a čas", "Canvas and time"), subtitle: text("Event loop spracúva aj myš a naplánované udalosti.", "The event loop also processes the mouse and scheduled events.") },
    { kind: "code", title: text("Kliknutie kreslí kruh", "A click draws a circle"), label: "python", code: "canvas = tk.Canvas(root, width=500, height=300)\n\ndef draw_circle(event) -> None:\n    x, y = event.x, event.y\n    canvas.create_oval(x - 12, y - 12, x + 12, y + 12, fill=\"#1877B9\")\n\ncanvas.bind(\"<Button-1>\", draw_circle)", note: text("Event nesie súradnice kliknutia. Callback ich použije pri kreslení.", "The event carries click coordinates. The callback uses them for drawing.") },
    { kind: "code", title: text("after() namiesto sleep()", "after() instead of sleep()"), label: "python", code: "def update_clock() -> None:\n    clock.config(text=time.strftime(\"%H:%M:%S\"))\n    root.after(1000, update_clock)\n\nupdate_clock()", note: text("time.sleep() v callbacku zablokuje event loop a okno prestane reagovať.", "time.sleep() in a callback blocks the event loop and the window stops responding.") },
    { kind: "recap", title: text("Zhrnutie", "Recap"), items: [text("GUI je event-driven: reaguje na udalosti v ľubovoľnom poradí", "A GUI is event-driven: it responds to events in any order"), text("mainloop() čaká; callbacky robia krátku konkrétnu prácu", "mainloop() waits; callbacks do short, specific work"), text("aplikačná logika má byť mimo widgetov", "application logic should live outside widgets"), text("event loop je všeobecný koncept aj mimo Tkinter", "the event loop is a general concept beyond Tkinter")] },
    { kind: "title", title: text("Ďalej: Testovanie, debugging a kvalita kódu", "Next: Testing, Debugging and Code Quality"), subtitle: text("Ako overiť funkcie, ktoré vznikli v scriptoch aj GUI aplikáciách.", "How to verify functions created in scripts and GUI applications.") }
  ]
};

const lectureId = process.argv[2] ?? "01";
const lecture = { "01": lecture01, "02": lecture02, "03": lecture03 }[lectureId];

if (!lecture) {
  throw new Error(`Neznáma prednáška: ${lectureId}`);
}

const deck = lecture.deck;

function value(item, language) {
  return typeof item === "string" ? item : item[language];
}

function addText(slide, content, x, y, w, h, options = {}) {
  slide.addText(content, {
    x, y, w, h,
    fontFace: options.fontFace ?? "Aptos",
    fontSize: options.fontSize ?? 18,
    color: options.color ?? colors.ink,
    bold: options.bold ?? false,
    margin: options.margin ?? 0,
    breakLine: false,
    fit: "shrink",
    valign: options.valign ?? "mid",
    align: options.align ?? "left",
    ...options
  });
}

function addHeader(slide, index, language) {
  slide.addShape("rect", { x: 0, y: 0, w: 13.333, h: 0.17, fill: { color: colors.blue }, line: { color: colors.blue } });
  addText(slide, language === "sk" ? "PROGRAMOVANIE V PYTHONE" : "PROGRAMMING IN PYTHON", 0.62, 0.35, 5.1, 0.2, { fontSize: 9, bold: true, color: colors.blue, charSpacing: 0.8 });
  addText(slide, language === "sk" ? "PREDNÁŠKA 01" : "LECTURE 01", 10.75, 0.35, 1.95, 0.2, { fontSize: 9, bold: true, color: colors.muted, align: "right", fontFace: "Consolas" });
  slide.addShape("line", { x: 0.62, y: 0.72, w: 12.08, h: 0, line: { color: colors.line, pt: 0.7 } });
}

function addFooter(slide, index) {
  slide.addShape("line", { x: 0.62, y: 7.02, w: 12.08, h: 0, line: { color: colors.line, pt: 0.7 } });
  addText(slide, String(index).padStart(2, "0"), 12.15, 7.11, 0.5, 0.16, { fontSize: 8, color: colors.muted, align: "right", fontFace: "Consolas" });
}

function addHeading(slide, title) {
  addText(slide, title, 0.72, 1.02, 11.8, 0.78, { fontSize: 29, bold: true, color: colors.navy, valign: "top" });
}

function addBullets(slide, items, language, x = 0.95, y = 2.18, w = 11.25, fontSize = 18) {
  const runs = items.map((item) => ({ text: value(item, language), options: { bullet: { indent: 18 }, hanging: 4, breakLine: true } }));
  slide.addText(runs, { x, y, w, h: 4.25, fontFace: "Aptos", fontSize, color: colors.ink, breakLine: false, paraSpaceAfterPt: 13, margin: 0.04, valign: "top", fit: "shrink" });
}

function addCode(slide, label, code, note) {
  slide.addShape("roundRect", { x: 0.72, y: 2.0, w: 7.45, h: 4.45, rectRadius: 0.06, fill: { color: colors.code }, line: { color: colors.code } });
  addText(slide, label, 0.95, 2.22, 6.9, 0.2, { fontFace: "Consolas", fontSize: 8.5, color: "8FD3FF", bold: true, charSpacing: 0.7 });
  addText(slide, code, 0.96, 2.62, 6.92, 3.55, { fontFace: "Consolas", fontSize: 16.5, color: colors.codeText, valign: "top", breakLine: false, margin: 0, fit: "shrink" });
  slide.addShape("line", { x: 8.65, y: 2.08, w: 0, h: 3.9, line: { color: colors.blue, pt: 1.5 } });
  addText(slide, note, 9.0, 2.33, 3.0, 2.7, { fontSize: 18, color: colors.muted, valign: "top", fit: "shrink" });
}

function renderSlide(pptx, item, index, language) {
  const slide = pptx.addSlide();
  slide.background = { color: colors.paper };
  const title = value(item.title, language);

  if (item.kind === "title") {
    slide.addShape("rect", { x: 0, y: 0, w: 0.26, h: 7.5, fill: { color: colors.blue }, line: { color: colors.blue } });
    addText(slide, language === "sk" ? "PROGRAMOVANIE V PYTHONE" : "PROGRAMMING IN PYTHON", 0.82, 0.75, 5.4, 0.25, { fontSize: 10, color: colors.blue, bold: true, charSpacing: 1.1 });
    addText(slide, title, 0.82, 2.35, 10.7, 1.0, { fontSize: 42, color: colors.navy, bold: true, valign: "top" });
    if (item.subtitle) addText(slide, value(item.subtitle, language), 0.86, 3.62, 9.1, 0.42, { fontSize: 20, color: colors.muted, valign: "top" });
    slide.addShape("rect", { x: 0.82, y: 5.68, w: 2.8, h: 0.13, fill: { color: colors.accent }, line: { color: colors.accent } });
    addText(slide, "TUKE FEI", 0.82, 6.02, 2.0, 0.2, { fontSize: 10, color: colors.muted, bold: true });
    addText(slide, String(index).padStart(2, "0"), 11.95, 6.84, 0.62, 0.2, { fontSize: 9, color: colors.muted, fontFace: "Consolas", align: "right" });
    return;
  }

  addHeader(slide, index, language);
  addFooter(slide, index);

  if (item.kind === "section") {
    addText(slide, item.number, 0.78, 1.48, 1.4, 0.6, { fontSize: 18, color: colors.blue, bold: true, fontFace: "Consolas" });
    addText(slide, title, 0.78, 2.2, 10.8, 0.9, { fontSize: 37, bold: true, color: colors.navy, valign: "top" });
    addText(slide, value(item.subtitle, language), 0.82, 3.35, 8.6, 0.45, { fontSize: 20, color: colors.muted, valign: "top" });
    slide.addShape("rect", { x: 0.8, y: 4.35, w: 3.1, h: 0.14, fill: { color: colors.blue }, line: { color: colors.blue } });
    return;
  }

  addHeading(slide, title);
  if (item.kind === "agenda" || item.kind === "theory" || item.kind === "recap" || item.kind === "demo") {
    if (item.body) addText(slide, value(item.body, language), 0.75, 1.88, 10.9, 0.52, { fontSize: 18, color: colors.muted, valign: "top" });
    addBullets(slide, item.items, language, 0.95, item.body ? 2.72 : 2.12, 10.85, item.kind === "recap" ? 19 : 18);
    return;
  }
  if (item.kind === "code") {
    addCode(slide, item.label, item.code, value(item.note, language));
    return;
  }
  if (item.kind === "question") {
    addText(slide, value(item.prompt, language), 0.76, 1.87, 10.1, 0.5, { fontSize: 20, color: colors.muted, valign: "top" });
    slide.addShape("roundRect", { x: 0.72, y: 2.65, w: 8.6, h: 3.45, rectRadius: 0.06, fill: { color: colors.panel }, line: { color: colors.line, pt: 0.8 } });
    addText(slide, item.label, 0.98, 2.9, 7.8, 0.2, { fontFace: "Consolas", fontSize: 8.5, color: colors.blue, bold: true });
    addText(slide, item.code, 0.98, 3.27, 7.8, 2.35, { fontFace: "Consolas", fontSize: 18, color: colors.ink, valign: "top", margin: 0 });
    addText(slide, language === "sk" ? "Najprv si odpoveď zdôvodnite. Potom kód spustite." : "Justify your answer first. Then run the code.", 9.75, 3.15, 2.2, 1.35, { fontSize: 17, color: colors.muted, valign: "top" });
    return;
  }
  if (item.kind === "diagram") {
    if (item.body) addText(slide, value(item.body, language), 0.76, 1.85, 10.4, 0.45, { fontSize: 18, color: colors.muted, valign: "top" });
    const startX = 0.8; const y = 3.1; const width = 2.68; const gap = 0.45;
    item.items.forEach((entry, position) => {
      const x = startX + position * (width + gap);
      if (position > 0) slide.addShape("chevron", { x: x - 0.3, y: y + 0.41, w: 0.2, h: 0.32, fill: { color: colors.blue }, line: { color: colors.blue } });
      slide.addShape("roundRect", { x, y, w: width, h: 1.14, rectRadius: 0.05, fill: { color: position % 2 ? "EAF3F7" : colors.panel }, line: { color: position % 2 ? "9DCCDD" : colors.line, pt: 0.8 } });
      addText(slide, value(entry, language), x + 0.16, y + 0.25, width - 0.32, 0.6, { fontSize: 17, color: colors.navy, bold: true, align: "center", valign: "mid" });
    });
    return;
  }
  if (item.kind === "compare") {
    const width = 5.48;
    item.columns.forEach((column, position) => {
      const x = position === 0 ? 0.78 : 6.97;
      slide.addShape("rect", { x, y: 2.05, w: width, h: 0.12, fill: { color: position === 0 ? colors.teal : colors.accent }, line: { color: position === 0 ? colors.teal : colors.accent } });
      addText(slide, value(column.title, language), x, 2.42, width, 0.4, { fontSize: 20, bold: true, color: colors.navy });
      addBullets(slide, column.items, language, x + 0.06, 3.05, width - 0.1, 16.5);
    });
    return;
  }
  if (item.kind === "table") {
    const rows = [[...item.headers.map((header) => value(header, language))], ...item.rows.map((row) => row.map((cell) => value(cell, language)))];
    slide.addTable(rows, { x: 0.72, y: 2.02, w: 11.92, h: 3.85, border: { type: "solid", color: colors.line, pt: 0.6 }, fill: colors.paper, fontFace: "Aptos", fontSize: 15.5, color: colors.ink, bold: false, margin: 0.09, rowH: 0.6, autoFit: false, colW: [2.0, 5.3, 4.62],
      bold: false,
      fill: colors.paper,
      color: colors.ink,
      // PptxGenJS applies these options to the header when supplied as an array.
      autoPage: false,
      valign: "mid"
    });
    slide.addShape("rect", { x: 0.72, y: 2.02, w: 11.92, h: 0.6, fill: { color: colors.navy }, line: { color: colors.navy } });
    item.headers.forEach((header, column) => addText(slide, value(header, language), [0.86, 2.86, 8.16][column], 2.18, [1.7, 5.05, 4.2][column], 0.22, { fontSize: 14, bold: true, color: colors.paper }));
  }
}

async function build(language) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "TUKE FEI";
  pptx.company = "Technická univerzita v Košiciach";
  pptx.subject = language === "sk" ? "Programovanie v Pythone" : "Programming in Python";
  pptx.title = value(lecture.title, language);
  pptx.lang = language === "sk" ? "sk-SK" : "en-US";
  pptx.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: pptx.lang };
  deck.forEach((item, index) => renderSlide(pptx, item, index + 1, language));
  const output = path.join(outputDirectory, `${lecture.slug}.${language}.pptx`);
  await pptx.writeFile({ fileName: output });
  console.log(`Vytvorený PPTX: ${output}`);
}

await build("sk");
await build("en");
