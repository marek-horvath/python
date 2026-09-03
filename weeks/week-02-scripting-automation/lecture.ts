import type { Lecture } from "../../shared/slide.types";

export const lecture02 = {
  weekNumber: 2,
  slug: "02-skriptovanie-automatizacia",
  title: "Skriptovanie a automatizácia",
  description: "Python ako praktický nástroj na automatizáciu práce so súbormi, textom, dátovými formátmi a operačným systémom.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Skriptovanie a automatizácia"
    },
    {
      id: "02-automation-scope",
      type: "statement",
      title: "Script automatizuje opakovateľný postup",
      body: "Ak má úloha jasný vstup, pravidlá a očakávaný výstup, nemusí zostať ručnou prácou.",
      points: [
        "cieľom nie je veľká aplikácia",
        "cieľom je spoľahlivý malý program, ktorý sa dá spustiť znova"
      ]
    },
    {
      id: "03-real-tasks",
      type: "bullets",
      title: "Typické úlohy pre Python script",
      points: [
        "premenenovať alebo roztriediť veľa súborov",
        "nájsť konkrétne typy súborov v adresároch",
        "spracovať logy a textové exporty",
        "načítať CSV alebo JSON",
        "vytvoriť jednoduchý report",
        "spustiť externý program nad viacerými vstupmi"
      ]
    },
    {
      id: "04-manual-vs-script",
      type: "compare",
      title: "Ručný postup a script",
      columns: [
        {
          title: "Manuálne",
          items: ["klikám a kopírujem", "ľahko prehliadnem výnimku", "postup nie je presne zaznamenaný", "opakované spustenie znamená opakovanú prácu"]
        },
        {
          title: "Script",
          items: ["postup je v kóde", "rovnaký vstup dá rovnaký postup", "dá sa spustiť na malej vzorke", "môže vypísať, čo urobil"]
        }
      ]
    },
    {
      id: "05-risk-question",
      type: "question",
      title: "Kedy script najprv nespúšťať naplno?",
      prompt: "Script má presunúť alebo prepísať stovky súborov. Aké kontroly pridáte pred prvým reálnym spustením?"
    },
    {
      id: "06-script-shape-section",
      type: "section",
      title: "Script ako malý program",
      subtitle: "Aj krátky script má mať čitateľný vstup, spracovanie a výstup."
    },
    {
      id: "07-three-forms",
      type: "table",
      title: "Tri formy práce",
      table: {
        headers: ["Forma", "Vhodné použitie"],
        rows: [
          ["REPL / notebook", "rýchle overenie jedného výrazu alebo nápadu"],
          [".py script", "opakovateľná úloha s jasným vstupom a výstupom"],
          ["aplikácia", "dlhšia údržba, viac modulov, stabilné rozhranie"]
        ]
      }
    },
    {
      id: "08-main-pattern",
      type: "code",
      title: "Základný tvar scriptu",
      body: "`main()` oddelí definície od spustenia. Súbor sa potom dá aj importovať.",
      code: {
        language: "python",
        label: "script.py",
        runnable: true,
        highlightLines: [1, 4, 5],
        code: `def main() -> None:
    print("Spúšťam script")

if __name__ == "__main__":
    main()`
      }
    },
    {
      id: "09-functions-in-script",
      type: "split-code",
      title: "Funkcie pomenúvajú kroky",
      codeBlocks: [
        {
          language: "python",
          label: "ťažšie upraviteľné",
          variant: "bad",
          runnable: false,
          code: `for path in files:
    text = path.read_text()
    if "ERROR" in text:
        print(path)`
        },
        {
          language: "python",
          label: "jasnejšie delenie",
          variant: "good",
          runnable: false,
          code: `def contains_error(path):
    return "ERROR" in path.read_text()

for path in files:
    if contains_error(path):
        print(path)`
        }
      ]
    },
    {
      id: "10-good-script-contract",
      type: "bullets",
      title: "Dobrý script má kontrakt",
      points: [
        "odkiaľ berie vstup",
        "čo mení na disku alebo v systéme",
        "čo vypíše pri úspechu",
        "ako hlási chyby",
        "ako sa dá bezpečne vyskúšať"
      ]
    },
    {
      id: "11-files-section",
      type: "section",
      title: "Súbory a text",
      subtitle: "Praktické minimum: čítanie, zápis, riadky, encoding a `with`."
    },
    {
      id: "12-read-file",
      type: "code",
      title: "Čítanie textového súboru",
      body: "`with` zabezpečí zatvorenie súboru aj vtedy, keď počas práce vznikne výnimka.",
      code: {
        language: "python",
        label: "read",
        runnable: false,
        highlightLines: [1],
        code: `with open("data.txt", encoding="utf-8") as file:
    content = file.read()

print(content)`
      }
    },
    {
      id: "13-write-file",
      type: "code",
      title: "Zápis textového súboru",
      body: "Pri texte explicitne uvádzajte encoding. Chyba sa často prejaví až na inom počítači.",
      code: {
        language: "python",
        label: "write",
        runnable: false,
        code: `with open("report.txt", "w", encoding="utf-8") as file:
    file.write("Spracované súbory: 12\\n")
    file.write("Chyby: 0\\n")`
      }
    },
    {
      id: "14-lines",
      type: "code",
      title: "Veľké texty čítajte po riadkoch",
      code: {
        language: "python",
        label: "lines",
        runnable: false,
        code: `with open("app.log", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())`
      }
    },
    {
      id: "15-context-manager",
      type: "statement",
      title: "Context manager riadi životnosť zdroja",
      body: "`with` používame tam, kde treba niečo otvoriť a spoľahlivo zavrieť: súbor, spojenie, lock alebo dočasný zdroj.",
      points: [
        "nezabudnuté zatvorenie súboru",
        "čitateľný rozsah práce so zdrojom",
        "lepšie správanie pri výnimkách"
      ]
    },
    {
      id: "16-pathlib-section",
      type: "section",
      title: "`pathlib`",
      subtitle: "Cesta k súboru nie je iba obyčajný string."
    },
    {
      id: "17-path-object",
      type: "code",
      title: "`Path` je objekt cesty",
      code: {
        language: "python",
        label: "Path",
        runnable: true,
        highlightLines: [1, 3],
        code: `from pathlib import Path

path = Path("data")

print(path)
print(type(path).__name__)`
      }
    },
    {
      id: "18-path-checks",
      type: "code",
      title: "Existencia a typ objektu na disku",
      code: {
        language: "python",
        label: "checks",
        runnable: true,
        code: `from pathlib import Path

path = Path("data")

print(path.exists())
print(path.is_file())
print(path.is_dir())`
      }
    },
    {
      id: "19-path-parts",
      type: "code",
      title: "Časti cesty majú pomenované vlastnosti",
      code: {
        language: "python",
        label: "parts",
        runnable: true,
        code: `from pathlib import Path

path = Path("reports/report.final.pdf")

print(path.name)
print(path.stem)
print(path.suffix)
print(path.parent)`
      }
    },
    {
      id: "20-path-question",
      type: "question",
      title: "Čo vráti `suffix`?",
      prompt: "Najprv odpovedzte bez spustenia.",
      code: {
        language: "python",
        label: "otázka",
        runnable: true,
        code: `from pathlib import Path

path = Path("report.final.pdf")

print(path.suffix)
print(path.stem)`
      }
    },
    {
      id: "21-build-paths",
      type: "split-code",
      title: "Cesty neskladajte ručne",
      codeBlocks: [
        {
          language: "python",
          label: "krehké",
          variant: "bad",
          runnable: false,
          code: `directory = "data"
name = "report.txt"
path = directory + "/" + name`
        },
        {
          language: "python",
          label: "pathlib",
          variant: "good",
          runnable: true,
          code: `from pathlib import Path

path = Path("data") / "reports" / "report.txt"
print(path)`
        }
      ]
    },
    {
      id: "22-find-files",
      type: "code",
      title: "Prechádzanie adresára",
      body: "`glob` hľadá v jednom adresári, `rglob` rekurzívne v podadresároch.",
      code: {
        language: "python",
        label: "search",
        runnable: false,
        code: `from pathlib import Path

directory = Path("data")

for path in directory.iterdir():
    print(path.name)

for path in directory.glob("*.txt"):
    print(path)

for path in directory.rglob("*.py"):
    print(path)`
      }
    },
    {
      id: "23-path-shortcuts",
      type: "code",
      title: "Krátke operácie nad textovými súbormi",
      code: {
        language: "python",
        label: "read_text / write_text",
        runnable: false,
        code: `from pathlib import Path

source = Path("notes.txt")
target = Path("output/notes-copy.txt")

text = source.read_text(encoding="utf-8")
target.parent.mkdir(exist_ok=True)
target.write_text(text, encoding="utf-8")`
      }
    },
    {
      id: "24-organizer-section",
      type: "section",
      title: "Priebežný príklad: organizátor súborov",
      subtitle: "Jednoduchý problém, na ktorom vidno dobré aj rizikové rozhodnutia."
    },
    {
      id: "25-before-after",
      type: "split-code",
      title: "Vstup a cieľ",
      codeBlocks: [
        {
          language: "text",
          label: "Downloads pred",
          code: `Downloads/
    report.pdf
    photo.jpg
    notes.txt
    cv.pdf
    screenshot.png`
        },
        {
          language: "text",
          label: "Downloads po",
          code: `Downloads/
    documents/
        report.pdf
        cv.pdf
    images/
        photo.jpg
        screenshot.png
    text/
        notes.txt`
        }
      ]
    },
    {
      id: "26-find-downloads-files",
      type: "code",
      title: "Krok 1: nájdi iba súbory",
      code: {
        language: "python",
        label: "files",
        runnable: false,
        code: `from pathlib import Path

downloads = Path("Downloads")

for path in downloads.iterdir():
    if path.is_file():
        print(path.name)`
      }
    },
    {
      id: "27-destination-function",
      type: "code",
      title: "Krok 2: rozhodni cieľ podľa prípony",
      body: "Logika rozhodovania je samostatná funkcia. Dá sa použiť aj bez presúvania súborov.",
      code: {
        language: "python",
        label: "category",
        runnable: true,
        highlightLines: [1, 2],
        code: `def category_for(suffix: str) -> str:
    suffix = suffix.lower()
    if suffix in {".pdf", ".docx"}:
        return "documents"
    if suffix in {".jpg", ".jpeg", ".png"}:
        return "images"
    if suffix == ".txt":
        return "text"
    return "other"

print(category_for(".PDF"))`
      }
    },
    {
      id: "28-mkdir-move",
      type: "code",
      title: "Krok 3: vytvor adresár a presuň súbor",
      code: {
        language: "python",
        label: "shutil.move",
        runnable: false,
        highlightLines: [7, 8],
        code: `from pathlib import Path
import shutil

source = Path("Downloads/report.pdf")
target_dir = source.parent / "documents"
target = target_dir / source.name

target_dir.mkdir(exist_ok=True)
shutil.move(source, target)`
      }
    },
    {
      id: "29-shutil-tools",
      type: "bullets",
      title: "`shutil` pre operácie so súbormi",
      points: [
        "`copy()` kopíruje súbor",
        "`copytree()` kopíruje adresár",
        "`move()` presúva alebo premenúva",
        "`make_archive()` vytvára archív",
        "pred deštruktívnou zmenou použite malú vzorku alebo dry-run"
      ]
    },
    {
      id: "30-dry-run-pattern",
      type: "code",
      title: "Dry-run pattern",
      body: "Pri skriptoch, ktoré modifikujú veľa dát, je často dobré najprv vypísať plánované kroky.",
      code: {
        language: "python",
        label: "dry-run",
        runnable: false,
        highlightLines: [1, 2],
        code: `if dry_run:
    print(f"MOVE {source.name} -> {target}")
else:
    shutil.move(source, target)`
      }
    },
    {
      id: "31-demo-organizer",
      type: "demo",
      title: "Demo: mini file organizer",
      points: [
        "testovací adresár, nie reálny Downloads",
        "`Path.iterdir()` a `suffix`",
        "cieľový adresár cez `/`",
        "`dry-run` pred reálnym presunom"
      ]
    },
    {
      id: "32-formats-section",
      type: "section",
      title: "JSON a CSV",
      subtitle: "Dátové formáty, ktoré sa často objavia okolo skriptov."
    },
    {
      id: "33-json-mapping",
      type: "table",
      title: "JSON typy a Python typy",
      table: {
        headers: ["JSON", "Python"],
        rows: [
          ["object", "<code>dict</code>"],
          ["array", "<code>list</code>"],
          ["string", "<code>str</code>"],
          ["number", "<code>int</code> alebo <code>float</code>"],
          ["boolean", "<code>bool</code>"],
          ["null", "<code>None</code>"]
        ]
      }
    },
    {
      id: "34-json-string-file",
      type: "split-code",
      title: "String vs. súbor",
      codeBlocks: [
        {
          language: "python",
          label: "loads / dumps",
          runnable: true,
          code: `import json

raw = '{"name": "Anna", "points": 82}'
data = json.loads(raw)

print(json.dumps(data, ensure_ascii=False))`
        },
        {
          language: "python",
          label: "load / dump",
          runnable: false,
          code: `import json

with open("config.json", encoding="utf-8") as file:
    config = json.load(file)

with open("config.json", "w", encoding="utf-8") as file:
    json.dump(config, file, indent=2)`
        }
      ]
    },
    {
      id: "35-json-question",
      type: "question",
      title: "Aký je rozdiel?",
      prompt: "`json.load(file)` a `json.loads(text)` robia podobnú vec, ale vstup nie je rovnaký."
    },
    {
      id: "36-csv-dictreader",
      type: "code",
      title: "CSV čítajte podľa názvov stĺpcov",
      code: {
        language: "python",
        label: "csv.DictReader",
        runnable: true,
        highlightLines: [6],
        code: `import csv
from io import StringIO

data = "name,course,points\\nAnna,Python,92\\nPeter,Python,67\\n"

for row in csv.DictReader(StringIO(data)):
    print(row["name"], int(row["points"]))`
      }
    },
    {
      id: "37-text-section",
      type: "section",
      title: "Spracovanie textu",
      subtitle: "Najprv jednoduché string operácie, regex až pri vzore."
    },
    {
      id: "38-string-tools",
      type: "code",
      title: "String metódy sú prvý nástroj",
      code: {
        language: "python",
        label: "text",
        runnable: true,
        code: `line = "  ERROR: Cannot open data.csv  "
clean = line.strip()

print(clean.lower())
print(clean.startswith("ERROR"))
print(clean.endswith(".csv"))
print("open" in clean)`
      }
    },
    {
      id: "39-split-log",
      type: "question",
      title: "Potrebujeme regex?",
      prompt: "Riadok má stabilný tvar: dátum, level, správa.",
      code: {
        language: "python",
        label: "split",
        runnable: true,
        code: `line = "2026-09-21 ERROR Cannot open file"
date, level, message = line.split(" ", 2)

print(date)
print(level)
print(message)`
      }
    },
    {
      id: "40-regex-pattern",
      type: "code",
      title: "Regex použite pri textovom vzore",
      code: {
        language: "python",
        label: "re",
        runnable: true,
        highlightLines: [5, 6, 7],
        code: `import re

text = "Kontakt: anna@example.com, peter.h@fei.tuke.sk"

print(re.search(r"[\\w.]+@[\\w.]+", text))
print(re.findall(r"[\\w.]+@[\\w.]+", text))
print(re.sub(r"[\\w.]+@[\\w.]+", "<email>", text))`
      }
    },
    {
      id: "41-cli-section",
      type: "section",
      title: "CLI, prostredie a externé procesy",
      subtitle: "Script nemá byť viazaný na jeden hardcoded počítač."
    },
    {
      id: "42-hardcoded-path",
      type: "question",
      title: "Čo je problém?",
      prompt: "Tento script funguje len vtedy, keď má používateľ rovnaký počítač a rovnakú cestu.",
      code: {
        language: "python",
        label: "hardcoded",
        variant: "bad",
        runnable: true,
        code: `directory = "C:/Users/Marek/Downloads"
print(directory)`
      }
    },
    {
      id: "43-argparse-env",
      type: "code",
      title: "Argumenty a environment variables",
      code: {
        language: "python",
        label: "argparse",
        runnable: true,
        code: `import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument("directory")
parser.add_argument("--dry-run", action="store_true")
args = parser.parse_args(["Downloads", "--dry-run"])

api_key = os.getenv("API_KEY")
print(args.directory, args.dry_run, api_key)`
      }
    },
    {
      id: "44-subprocess",
      type: "code",
      title: "Externý proces cez `subprocess`",
      body: "Rozlišujte stdout, stderr a return code. Pri používateľskom inpute sa vyhýbajte `shell=True`.",
      code: {
        language: "python",
        label: "subprocess",
        runnable: false,
        code: `import subprocess

result = subprocess.run(
    ["git", "status"],
    capture_output=True,
    text=True
)

print(result.returncode)
print(result.stdout)
print(result.stderr)`
      }
    },
    {
      id: "45-script-synthesis",
      type: "split-code",
      title: "Script, ktorý sa dá bezpečne opakovať",
      codeBlocks: [
        {
          language: "python",
          label: "problém",
          variant: "bad",
          runnable: false,
          code: `directory = "C:/Users/Marek/Downloads"
for file in files:
    try:
        move_file(file)
    except:
        pass`
        },
        {
          language: "python",
          label: "lepší tvar",
          variant: "good",
          runnable: false,
          code: `def main() -> None:
    args = parse_args()
    config = load_config(args.config)
    organize_files(args.directory, config, args.dry_run)

if __name__ == "__main__":
    main()`
        }
      ]
    }
  ],
  translations: {
    en: {
      title: "Scripting and Automation",
      description: "Python as a practical tool for automating work with files, text, data formats and the operating system.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Scripting and Automation"
        },
        "02-automation-scope": {
          title: "A Script Automates a Repeatable Procedure",
          body: "If a task has a clear input, rules and expected output, it does not have to remain manual work.",
          points: [
            "the goal is not a large application",
            "the goal is a reliable small program that can be run again"
          ]
        },
        "03-real-tasks": {
          title: "Typical Tasks for a Python Script",
          points: [
            "rename or sort many files",
            "find specific file types in directories",
            "process logs and text exports",
            "read CSV or JSON",
            "create a simple report",
            "run an external program over multiple inputs"
          ]
        },
        "04-manual-vs-script": {
          title: "Manual Procedure and Script",
          columns: [
            {
              title: "Manual",
              items: [
                "clicking and copying",
                "easy to miss an exception",
                "the procedure is not recorded precisely",
                "running it again means doing the work again"
              ]
            },
            {
              title: "Script",
              items: [
                "the procedure is in code",
                "the same input follows the same steps",
                "it can be run on a small sample",
                "it can print what it did"
              ]
            }
          ]
        },
        "05-risk-question": {
          title: "When Should You Avoid a Full Run First?",
          prompt: "A script is supposed to move or overwrite hundreds of files. What checks would you add before the first real run?"
        },
        "06-script-shape-section": {
          title: "Script as a Small Program",
          subtitle: "Even a short script should have readable input, processing and output."
        },
        "07-three-forms": {
          title: "Three Forms of Work",
          table: {
            headers: ["Form", "Appropriate use"],
            rows: [
              ["REPL / notebook", "quickly checking one expression or idea"],
              [".py script", "a repeatable task with clear input and output"],
              ["application", "longer maintenance, multiple modules, stable interface"]
            ]
          }
        },
        "08-main-pattern": {
          title: "Basic Script Shape",
          body: "`main()` separates definitions from execution. The file can then also be imported.",
          code: {
            code: `def main() -> None:
    print("Starting script")

if __name__ == "__main__":
    main()`
          }
        },
        "09-functions-in-script": {
          title: "Functions Name the Steps",
          codeBlocks: [
            { label: "harder to change" },
            { label: "clearer separation" }
          ]
        },
        "10-good-script-contract": {
          title: "A Good Script Has a Contract",
          points: [
            "where it takes input from",
            "what it changes on disk or in the system",
            "what it prints on success",
            "how it reports errors",
            "how it can be tried safely"
          ]
        },
        "11-files-section": {
          title: "Files and Text",
          subtitle: "The practical minimum: reading, writing, lines, encoding and `with`."
        },
        "12-read-file": {
          title: "Reading a Text File",
          body: "`with` ensures that the file is closed even if an exception occurs while working with it."
        },
        "13-write-file": {
          title: "Writing a Text File",
          body: "When working with text, specify the encoding explicitly. The problem often appears only on another computer.",
          code: {
            code: `with open("report.txt", "w", encoding="utf-8") as file:
    file.write("Processed files: 12\\n")
    file.write("Errors: 0\\n")`
          }
        },
        "14-lines": {
          title: "Read Large Texts Line by Line"
        },
        "15-context-manager": {
          title: "A Context Manager Controls Resource Lifetime",
          body: "`with` is used when something must be opened and reliably closed: a file, connection, lock or temporary resource.",
          points: [
            "the file is not accidentally left open",
            "the scope of working with the resource is readable",
            "better behavior when exceptions occur"
          ]
        },
        "16-pathlib-section": {
          title: "`pathlib`",
          subtitle: "A file path is not just an ordinary string."
        },
        "17-path-object": {
          title: "`Path` Is a Path Object"
        },
        "18-path-checks": {
          title: "Existence and Type of an Object on Disk"
        },
        "19-path-parts": {
          title: "Path Parts Have Named Properties"
        },
        "20-path-question": {
          title: "What Does `suffix` Return?",
          prompt: "Answer first without running the code.",
          code: { label: "question" }
        },
        "21-build-paths": {
          title: "Do Not Build Paths by Hand",
          codeBlocks: [
            { label: "fragile" },
            { label: "pathlib" }
          ]
        },
        "22-find-files": {
          title: "Walking a Directory",
          body: "`glob` searches in one directory, `rglob` searches recursively in subdirectories."
        },
        "23-path-shortcuts": {
          title: "Short Operations on Text Files"
        },
        "24-organizer-section": {
          title: "Running Example: File Organizer",
          subtitle: "A simple problem that shows both good and risky decisions."
        },
        "25-before-after": {
          title: "Input and Target",
          codeBlocks: [
            { label: "Downloads before" },
            { label: "Downloads after" }
          ]
        },
        "26-find-downloads-files": {
          title: "Step 1: Find Files Only"
        },
        "27-destination-function": {
          title: "Step 2: Choose a Destination by Suffix",
          body: "The decision logic is a separate function. It can be used even without moving files."
        },
        "28-mkdir-move": {
          title: "Step 3: Create the Directory and Move the File"
        },
        "29-shutil-tools": {
          title: "`shutil` for File Operations",
          points: [
            "`copy()` copies a file",
            "`copytree()` copies a directory",
            "`move()` moves or renames",
            "`make_archive()` creates an archive",
            "before a destructive change, use a small sample or dry-run"
          ]
        },
        "30-dry-run-pattern": {
          title: "Dry-Run Pattern",
          body: "For scripts that modify a lot of data, it is often useful to print the planned steps first."
        },
        "31-demo-organizer": {
          title: "Demo: Mini File Organizer",
          points: [
            "test directory, not the real Downloads folder",
            "`Path.iterdir()` and `suffix`",
            "target directory with `/`",
            "`dry-run` before a real move"
          ]
        },
        "32-formats-section": {
          title: "JSON and CSV",
          subtitle: "Data formats that often appear around scripts."
        },
        "33-json-mapping": {
          title: "JSON Types and Python Types",
          table: {
            headers: ["JSON", "Python"],
            rows: [
              ["object", "<code>dict</code>"],
              ["array", "<code>list</code>"],
              ["string", "<code>str</code>"],
              ["number", "<code>int</code> or <code>float</code>"],
              ["boolean", "<code>bool</code>"],
              ["null", "<code>None</code>"]
            ]
          }
        },
        "34-json-string-file": {
          title: "String vs. File",
          codeBlocks: [
            { label: "loads / dumps" },
            { label: "load / dump" }
          ]
        },
        "35-json-question": {
          title: "What Is the Difference?",
          prompt: "`json.load(file)` and `json.loads(text)` do a similar thing, but the input is not the same."
        },
        "36-csv-dictreader": {
          title: "Read CSV by Column Names"
        },
        "37-text-section": {
          title: "Text Processing",
          subtitle: "Use simple string operations first; use regex when you need a pattern."
        },
        "38-string-tools": {
          title: "String Methods Are the First Tool"
        },
        "39-split-log": {
          title: "Do We Need Regex?",
          prompt: "The line has a stable shape: date, level, message."
        },
        "40-regex-pattern": {
          title: "Use Regex for Text Patterns"
        },
        "41-cli-section": {
          title: "CLI, Environment and External Processes",
          subtitle: "A script should not be tied to one hardcoded computer."
        },
        "42-hardcoded-path": {
          title: "What Is the Problem?",
          prompt: "This script works only if the user has the same computer and the same path."
        },
        "43-argparse-env": {
          title: "Arguments and Environment Variables"
        },
        "44-subprocess": {
          title: "External Process with `subprocess`",
          body: "Distinguish stdout, stderr and return code. When user input is involved, avoid `shell=True`."
        },
        "45-script-synthesis": {
          title: "A Script That Can Be Repeated Safely",
          codeBlocks: [
            { label: "problem" },
            { label: "better shape" }
          ]
        }
      }
    }
  }
} satisfies Lecture;
