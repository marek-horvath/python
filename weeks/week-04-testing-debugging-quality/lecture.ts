import type { Lecture } from "../../shared/slide.types";

export const lecture04 = {
  weekNumber: 4,
  slug: "04-testovanie-debugging-kvalita",
  title: "Testovanie, debugging a kvalita kódu",
  description: "Ako overovať správanie programu, hľadať chyby a udržiavať Python kód čitateľný.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Testovanie, debugging a kvalita kódu"
    },
    {
      id: "02-works-on-my-machine",
      type: "statement",
      title: "„Funguje to u mňa“ je slabý dôkaz",
      body: "Manuálne spustenie je užitočné, ale nie je reprodukovateľné a často nepokrýva hraničné prípady.",
      points: [
        "chyba sa môže objaviť pri inom vstupe",
        "zmena v helper funkcii môže pokaziť GUI aj script",
        "bez testu nevieme rýchlo overiť, či sa bug nevrátil"
      ]
    },
    {
      id: "03-workflow",
      type: "diagram",
      title: "Praktický workflow pri chybe",
      diagramItems: ["bug", "reproduction", "test", "debugging", "fix", "regression test"]
    },
    {
      id: "04-manual-vs-test",
      type: "compare",
      title: "Manuálne skúšanie a automatický test",
      columns: [
        {
          title: "Manuálne",
          items: ["rýchle pri prvom overení", "závisí od pozornosti", "ťažko zopakovateľné presne rovnako", "často obíde edge cases"]
        },
        {
          title: "Automatický test",
          items: ["rovnaký postup pri každom spustení", "dá sa pustiť po každej zmene", "dokumentuje očakávané správanie", "chytá regresie"]
        }
      ]
    },
    {
      id: "05-test-question",
      type: "question",
      title: "Je jeden príklad dosť?",
      prompt: "Funkciu sme spustili s hodnotou 100 a výsledok vyzerá správne. Čo ešte nevieme?"
    },
    {
      id: "06-test-anatomy-section",
      type: "section",
      title: "Test ako špecifikácia správania",
      subtitle: "Konkrétny vstup, očakávaný výsledok a kontrola rozdielu."
    },
    {
      id: "07-function-under-test",
      type: "code",
      title: "Funkcia pod testom",
      body: "Čistá funkcia bez súborov, GUI a internetu sa testuje najľahšie.",
      code: {
        language: "python",
        label: "discount.py",
        runnable: true,
        code: `def calculate_discount(price: float, discount: float) -> float:
    return price * (1 - discount)`
      }
    },
    {
      id: "08-first-test",
      type: "code",
      title: "Prvý test",
      body: "`assert` porovná skutočný výsledok s očakávaným výsledkom.",
      code: {
        language: "python",
        label: "test_discount.py",
        runnable: false,
        highlightLines: [2],
        code: `def test_calculate_discount():
    assert calculate_discount(100, 0.2) == 80`
      }
    },
    {
      id: "09-test-vocabulary",
      type: "table",
      title: "Slovník testu",
      table: {
        headers: ["Pojem", "Význam"],
        rows: [
          ["input", "hodnoty, s ktorými funkciu voláme"],
          ["expected output", "čo má program vrátiť"],
          ["actual output", "čo program skutočne vrátil"],
          ["assertion", "kontrola, že očakávanie platí"]
        ]
      }
    },
    {
      id: "10-pytest-section",
      type: "section",
      title: "pytest",
      subtitle: "Praktický nástroj na písanie a spúšťanie testov v Pythone."
    },
    {
      id: "11-pytest-discovery",
      type: "split-code",
      title: "Ako pytest nájde testy",
      codeBlocks: [
        {
          language: "bash",
          label: "terminal",
          code: `python -m pytest`
        },
        {
          language: "text",
          label: "conventions",
          code: `test_*.py
*_test.py

def test_something():
    ...`
        }
      ]
    },
    {
      id: "12-pytest-output",
      type: "code",
      title: "Čitateľný výstup testov",
      code: {
        language: "text",
        label: "passed",
        code: `collected 3 items

test_discount.py ...                       [100%]

3 passed in 0.04s`
      }
    },
    {
      id: "13-failing-test",
      type: "code",
      title: "Zlyhanie ukáže rozdiel",
      body: "Dobrý test povie, ktoré očakávanie neplatí.",
      code: {
        language: "text",
        label: "failed assertion",
        code: `E       assert 75.0 == 80
E        +  where 75.0 = calculate_discount(100, 0.25)`
      }
    },
    {
      id: "14-arrange-act-assert",
      type: "code",
      title: "Arrange - Act - Assert",
      body: "Užitočná štruktúra testu, keď test obsahuje viac než jeden riadok.",
      code: {
        language: "python",
        label: "AAA",
        runnable: false,
        code: `def test_discount():
    price = 100
    discount = 0.2

    result = calculate_discount(price, discount)

    assert result == 80`
      }
    },
    {
      id: "15-edge-cases-question",
      type: "question",
      title: "Ktoré prípady chýbajú?",
      prompt: "Máme iba `divide(10, 2) == 5`. Aké vstupy môžu odhaliť chybu?",
      code: {
        language: "python",
        label: "minimum test",
        runnable: false,
        code: `def test_divide():
    assert divide(10, 2) == 5`
      }
    },
    {
      id: "16-test-design",
      type: "table",
      title: "Test design",
      table: {
        headers: ["Typ prípadu", "Príklad"],
        rows: [
          ["bežný vstup", "<code>calculate_discount(100, 0.2)</code>"],
          ["hraničná hodnota", "zľava <code>0</code> alebo <code>1</code>"],
          ["neplatný vstup", "záporná cena"],
          ["typická chyba", "percentá ako <code>20</code> namiesto <code>0.2</code>"],
          ["regresia", "konkrétny vstup, ktorý už raz zlyhal"]
        ]
      }
    },
    {
      id: "17-parametrize",
      type: "code",
      title: "Parametrizácia",
      body: "Rovnaký test spustíme pre viac vstupov bez kopírovania kódu.",
      code: {
        language: "python",
        label: "pytest.mark.parametrize",
        runnable: false,
        code: `import pytest

@pytest.mark.parametrize(
    "price, discount, expected",
    [
        (100, 0.2, 80),
        (50, 0.1, 45),
        (10, 0.0, 10),
    ],
)
def test_calculate_discount(price, discount, expected):
    assert calculate_discount(price, discount) == expected`
      }
    },
    {
      id: "18-raises",
      type: "code",
      title: "Testovanie očakávanej výnimky",
      body: "Ak má funkcia odmietnuť vstup, výnimka je súčasť kontraktu.",
      code: {
        language: "python",
        label: "pytest.raises",
        runnable: false,
        code: `import pytest

def test_negative_price_is_invalid():
    with pytest.raises(ValueError):
        calculate_discount(-10, 0.2)`
      }
    },
    {
      id: "19-fixtures",
      type: "code",
      title: "Fixture pripraví spoločné dáta",
      code: {
        language: "python",
        label: "fixture",
        runnable: false,
        code: `import pytest

@pytest.fixture
def sample_results():
    return [
        ("Anna", "Python", 92),
        ("Peter", "Python", 67),
    ]

def test_result_count(sample_results):
    assert len(sample_results) == 2`
      }
    },
    {
      id: "20-testable-design-section",
      type: "section",
      title: "Testovateľný návrh",
      subtitle: "Kód sa testuje ľahšie, keď je logika oddelená od okolia."
    },
    {
      id: "21-what-is-easy-to-test",
      type: "table",
      title: "Čo sa testuje ľahko",
      table: {
        headers: ["Časť programu", "Poznámka"],
        rows: [
          ["pure business logic", "najstabilnejšia na testovanie"],
          ["filesystem", "testovateľný cez dočasné adresáre"],
          ["HTTP klient", "testovať bez stáleho volania reálneho API"],
          ["GUI callback", "držať krátky; logiku presunúť do funkcií"]
        ]
      }
    },
    {
      id: "22-gui-logic-test",
      type: "split-code",
      title: "Logika z GUI ako testovateľná funkcia",
      codeBlocks: [
        {
          language: "python",
          label: "business logic",
          runnable: false,
          code: `def analyze_text(text: str) -> TextStats:
    return TextStats(
        lines=len(text.splitlines()),
        words=len(text.split()),
        characters=len(text),
    )`
        },
        {
          language: "python",
          label: "test",
          runnable: false,
          code: `def test_analyze_text():
    stats = analyze_text("Ahoj\\nPython")

    assert stats.lines == 2
    assert stats.words == 2`
        }
      ]
    },
    {
      id: "23-tmp-path",
      type: "code",
      title: "Súbory testujte cez `tmp_path`",
      body: "`tmp_path` je dočasný `Path` objekt. Test nepoškodí reálne dáta.",
      code: {
        language: "python",
        label: "tmp_path",
        runnable: false,
        code: `def test_write_report(tmp_path):
    output = tmp_path / "report.txt"

    write_report(output, "Hotovo")

    assert output.read_text(encoding="utf-8") == "Hotovo"`
      }
    },
    {
      id: "24-mocking-concept",
      type: "diagram",
      title: "Mocking",
      diagramItems: ["external dependency", "replace in test", "controlled fake", "stable result"]
    },
    {
      id: "25-mock-example",
      type: "code",
      title: "Kontrolovaná externá závislosť",
      code: {
        language: "python",
        label: "unittest.mock",
        runnable: false,
        code: `from unittest.mock import Mock

client = Mock()
client.get_temperature.return_value = 22.4

result = weather_report(client, "Kosice")

assert "22.4" in result`
      }
    },
    {
      id: "26-regression-test",
      type: "diagram",
      title: "Regression test zostáva v projekte",
      diagramItems: ["bug report", "minimal reproduction", "failing test", "fix", "test stays"]
    },
    {
      id: "27-debugging-section",
      type: "section",
      title: "Debugging",
      subtitle: "Systematické zisťovanie, kde sa realita líši od očakávania."
    },
    {
      id: "28-print-debugging",
      type: "split-code",
      title: "`print` debugging má limity",
      codeBlocks: [
        {
          language: "python",
          label: "rýchla kontrola",
          runnable: true,
          code: `value = 42
print("HERE")
print(value)`
        },
        {
          language: "text",
          label: "limity",
          code: `veľa výpisov
nejasné poradie
zabudnuté debug printy
ťažké filtrovanie`
        }
      ]
    },
    {
      id: "29-debugger-tools",
      type: "table",
      title: "Debugger",
      table: {
        headers: ["Nástroj", "Otázka"],
        rows: [
          ["breakpoint", "kde program zastavíme?"],
          ["step over", "čo spraví ďalší riadok?"],
          ["step into", "čo sa deje vo volanej funkcii?"],
          ["variables", "aké hodnoty práve máme?"],
          ["call stack", "ako sme sa sem dostali?"]
        ]
      }
    },
    {
      id: "30-debug-question",
      type: "question",
      title: "Kde začať debugging?",
      prompt: "Test čakal 80, funkcia vrátila 75. Ktorú hodnotu alebo riadok by ste skontrolovali ako prvý?"
    },
    {
      id: "31-stack-trace",
      type: "code",
      title: "Traceback čítajte odspodu",
      code: {
        language: "text",
        label: "traceback",
        code: `Traceback (most recent call last):
  File "app.py", line 8, in <module>
    age = int(text)
ValueError: invalid literal for int()
with base 10: 'abc'`
      }
    },
    {
      id: "32-traceback-question",
      type: "question",
      title: "Čo program nezvládol?",
      prompt: "Ktorý vstup spôsobil výnimku a kde sa nachádza riadok, ktorý ju vyvolal?"
    },
    {
      id: "33-logging-section",
      type: "section",
      title: "Logging",
      subtitle: "Diagnostické výpisy s úrovňou závažnosti."
    },
    {
      id: "34-logging-levels",
      type: "code",
      title: "Logging levely",
      code: {
        language: "python",
        label: "logging",
        runnable: true,
        code: `import logging

logging.basicConfig(level=logging.INFO)

logging.debug("Detail pre vývojára")
logging.info("Spracúvam súbor")
logging.warning("Chýba voliteľná hodnota")
logging.error("Súbor sa nepodarilo načítať")`
      }
    },
    {
      id: "35-print-vs-logging",
      type: "table",
      title: "`print` a `logging`",
      table: {
        headers: ["print", "logging"],
        rows: [
          ["jednoduchý výstup pre používateľa", "diagnostika behu programu"],
          ["ťažko filtrovať podľa závažnosti", "levely: debug, info, warning, error"],
          ["vhodný pre malé demo", "vhodný pre dlhšie bežiaci script alebo aplikáciu"]
        ]
      }
    },
    {
      id: "36-assert-vs-validation",
      type: "split-code",
      title: "`assert` nie je input validation",
      codeBlocks: [
        {
          language: "python",
          label: "invariant počas vývoja",
          runnable: true,
          code: `items = [1, 2, 3]
assert len(items) > 0`
        },
        {
          language: "python",
          label: "validácia vstupu",
          runnable: false,
          code: `text = "abc"

if not text.isdigit():
    raise ValueError("Očakávam číslo")`
        }
      ]
    },
    {
      id: "37-quality-tools-section",
      type: "section",
      title: "Quality tools",
      subtitle: "Formatter, linter, type checker a testy riešia rôzne druhy problémov."
    },
    {
      id: "38-tooling-map",
      type: "table",
      title: "Ktorý nástroj odpovedá na ktorú otázku",
      table: {
        headers: ["Nástroj", "Otázka"],
        rows: [
          ["formatter", "vyzerá kód konzistentne?"],
          ["linter", "sú v kóde podozrivé vzory?"],
          ["type checker", "sedia typové očakávania?"],
          ["tests", "správa sa program správne?"]
        ]
      }
    },
    {
      id: "39-ruff",
      type: "split-code",
      title: "Ruff",
      codeBlocks: [
        {
          language: "bash",
          label: "commands",
          code: `ruff check .
ruff format .`
        },
        {
          language: "text",
          label: "typicky nájde",
          code: `nepoužitý import
nedosiahnuteľný kód
podozrivé porovnanie
nekonzistentný štýl`
        }
      ]
    },
    {
      id: "40-type-checking",
      type: "split-code",
      title: "Type checker využíva type hints",
      codeBlocks: [
        {
          language: "python",
          label: "code",
          runnable: false,
          code: `def total(values: list[int]) -> int:
    return sum(values)

total(["1", "2"])`
        },
        {
          language: "text",
          label: "static checker",
          code: `Argument of type "list[str]"
cannot be assigned to parameter
"values" of type "list[int]"`
        }
      ]
    },
    {
      id: "41-quality-pipeline",
      type: "diagram",
      title: "Jednoduchá quality pipeline",
      diagramItems: ["write code", "format", "lint", "type check", "tests", "run"]
    },
    {
      id: "42-live-demo",
      type: "demo",
      title: "Demo: od bugu k regression testu",
      points: [
        "chybná funkcia",
        "reprodukcia chyby",
        "test, ktorý zlyhá",
        "oprava implementácie",
        "test zostane v projekte"
      ]
    },
    {
      id: "43-next",
      type: "diagram",
      title: "Lokálny program a internet",
      diagramItems: ["function", "test", "debug", "HTTP request", "API response"]
    }
  ],
  translations: {
    en: {
      title: "Testing, Debugging and Code Quality",
      description: "How to verify program behavior, find bugs and keep Python code readable.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Testing, Debugging and Code Quality"
        },
        "02-works-on-my-machine": {
          title: "“It Works on My Machine” Is Weak Evidence",
          body: "Running a program manually is useful, but it is not reproducible and often misses edge cases.",
          points: [
            "a bug may appear with a different input",
            "a change in a helper function can break both a GUI and a script",
            "without a test, we cannot quickly check whether a bug has returned"
          ]
        },
        "03-workflow": {
          title: "Practical Workflow When a Bug Appears",
          diagramItems: ["bug", "reproduction", "test", "debugging", "fix", "regression test"]
        },
        "04-manual-vs-test": {
          title: "Manual Checking and Automated Test",
          columns: [
            {
              title: "Manual",
              items: [
                "fast for the first check",
                "depends on attention",
                "hard to repeat exactly the same way",
                "often skips edge cases"
              ]
            },
            {
              title: "Automated test",
              items: [
                "same procedure on every run",
                "can be run after every change",
                "documents expected behavior",
                "catches regressions"
              ]
            }
          ]
        },
        "05-test-question": {
          title: "Is One Example Enough?",
          prompt: "We ran the function with value 100 and the result looks correct. What do we still not know?"
        },
        "06-test-anatomy-section": {
          title: "A Test as a Behavior Specification",
          subtitle: "Concrete input, expected result and a check for the difference."
        },
        "07-function-under-test": {
          title: "Function Under Test",
          body: "A pure function without files, GUI or internet access is the easiest to test."
        },
        "08-first-test": {
          title: "First Test",
          body: "`assert` compares the actual result with the expected result."
        },
        "09-test-vocabulary": {
          title: "Test Vocabulary",
          table: {
            headers: ["Term", "Meaning"],
            rows: [
              ["input", "values used when calling the function"],
              ["expected output", "what the program should return"],
              ["actual output", "what the program actually returned"],
              ["assertion", "a check that the expectation holds"]
            ]
          }
        },
        "10-pytest-section": {
          title: "pytest",
          subtitle: "A practical tool for writing and running tests in Python."
        },
        "11-pytest-discovery": {
          title: "How pytest Finds Tests"
        },
        "12-pytest-output": {
          title: "Readable Test Output"
        },
        "13-failing-test": {
          title: "A Failure Shows the Difference",
          body: "A good test says which expectation was not met."
        },
        "14-arrange-act-assert": {
          title: "Arrange - Act - Assert",
          body: "A useful test structure when a test contains more than one line."
        },
        "15-edge-cases-question": {
          title: "Which Cases Are Missing?",
          prompt: "We only have `divide(10, 2) == 5`. Which inputs could reveal a bug?"
        },
        "16-test-design": {
          title: "Test Design",
          table: {
            headers: ["Case type", "Example"],
            rows: [
              ["normal input", "<code>calculate_discount(100, 0.2)</code>"],
              ["boundary value", "discount <code>0</code> or <code>1</code>"],
              ["invalid input", "negative price"],
              ["typical mistake", "percent as <code>20</code> instead of <code>0.2</code>"],
              ["regression", "a concrete input that has already failed once"]
            ]
          }
        },
        "17-parametrize": {
          title: "Parametrization",
          body: "Run the same test for multiple inputs without copying code."
        },
        "18-raises": {
          title: "Testing an Expected Exception",
          body: "If a function should reject an input, the exception is part of its contract."
        },
        "19-fixtures": {
          title: "A Fixture Prepares Shared Data"
        },
        "20-testable-design-section": {
          title: "Testable Design",
          subtitle: "Code is easier to test when logic is separated from its environment."
        },
        "21-what-is-easy-to-test": {
          title: "What Is Easy to Test",
          table: {
            headers: ["Part of the program", "Note"],
            rows: [
              ["pure business logic", "the most stable part to test"],
              ["filesystem", "testable with temporary directories"],
              ["HTTP client", "test without repeatedly calling the real API"],
              ["GUI callback", "keep it short; move logic into functions"]
            ]
          }
        },
        "22-gui-logic-test": {
          title: "GUI Logic as a Testable Function",
          codeBlocks: [
            { label: "business logic" },
            {
              label: "test",
              code: `def test_analyze_text():
    stats = analyze_text("Hello\\nPython")

    assert stats.lines == 2
    assert stats.words == 2`
            }
          ]
        },
        "23-tmp-path": {
          title: "Test Files with `tmp_path`",
          body: "`tmp_path` is a temporary `Path` object. The test does not damage real data.",
          code: {
            code: `def test_write_report(tmp_path):
    output = tmp_path / "report.txt"

    write_report(output, "Done")

    assert output.read_text(encoding="utf-8") == "Done"`
          }
        },
        "24-mocking-concept": {
          title: "Mocking",
          diagramItems: ["external dependency", "replace in test", "controlled fake", "stable result"]
        },
        "25-mock-example": {
          title: "Controlled External Dependency"
        },
        "26-regression-test": {
          title: "Regression Test Stays in the Project",
          diagramItems: ["bug report", "minimal reproduction", "failing test", "fix", "test stays"]
        },
        "27-debugging-section": {
          title: "Debugging",
          subtitle: "A systematic way to find where reality differs from expectation."
        },
        "28-print-debugging": {
          title: "`print` Debugging Has Limits",
          codeBlocks: [
            { label: "quick check" },
            {
              label: "limits",
              code: `too many prints
unclear order
forgotten debug prints
hard to filter`
            }
          ]
        },
        "29-debugger-tools": {
          title: "Debugger",
          table: {
            headers: ["Tool", "Question"],
            rows: [
              ["breakpoint", "where do we stop the program?"],
              ["step over", "what will the next line do?"],
              ["step into", "what happens inside the called function?"],
              ["variables", "what values do we currently have?"],
              ["call stack", "how did we get here?"]
            ]
          }
        },
        "30-debug-question": {
          title: "Where Should Debugging Start?",
          prompt: "The test expected 80, but the function returned 75. Which value or line would you check first?"
        },
        "31-stack-trace": {
          title: "Read a Traceback from the Bottom"
        },
        "32-traceback-question": {
          title: "What Did the Program Fail to Handle?",
          prompt: "Which input caused the exception and where is the line that raised it?"
        },
        "33-logging-section": {
          title: "Logging",
          subtitle: "Diagnostic output with severity levels."
        },
        "34-logging-levels": {
          title: "Logging Levels",
          code: {
            code: `import logging

logging.basicConfig(level=logging.INFO)

logging.debug("Detail for the developer")
logging.info("Processing file")
logging.warning("Optional value is missing")
logging.error("The file could not be loaded")`
          }
        },
        "35-print-vs-logging": {
          title: "`print` and `logging`",
          table: {
            headers: ["print", "logging"],
            rows: [
              ["simple output for the user", "runtime diagnostics"],
              ["hard to filter by severity", "levels: debug, info, warning, error"],
              ["useful for a small demo", "useful for a longer-running script or application"]
            ]
          }
        },
        "36-assert-vs-validation": {
          title: "`assert` Is Not Input Validation",
          codeBlocks: [
            { label: "development-time invariant" },
            {
              label: "input validation",
              code: `text = "abc"

if not text.isdigit():
    raise ValueError("Expected a number")`
            }
          ]
        },
        "37-quality-tools-section": {
          title: "Quality Tools",
          subtitle: "Formatter, linter, type checker and tests solve different kinds of problems."
        },
        "38-tooling-map": {
          title: "Which Tool Answers Which Question",
          table: {
            headers: ["Tool", "Question"],
            rows: [
              ["formatter", "does the code look consistent?"],
              ["linter", "are there suspicious patterns in the code?"],
              ["type checker", "do type expectations match?"],
              ["tests", "does the program behave correctly?"]
            ]
          }
        },
        "39-ruff": {
          title: "Ruff",
          codeBlocks: [
            { label: "commands" },
            {
              label: "typically finds",
              code: `unused import
unreachable code
suspicious comparison
inconsistent style`
            }
          ]
        },
        "40-type-checking": {
          title: "A Type Checker Uses Type Hints"
        },
        "41-quality-pipeline": {
          title: "Simple Quality Pipeline",
          diagramItems: ["write code", "format", "lint", "type check", "tests", "run"]
        },
        "42-live-demo": {
          title: "Demo: From Bug to Regression Test",
          points: [
            "buggy function",
            "bug reproduction",
            "a test that fails",
            "implementation fix",
            "the test stays in the project"
          ]
        },
        "43-next": {
          title: "Local Program and the Internet",
          diagramItems: ["function", "test", "debug", "HTTP request", "API response"]
        }
      }
    }
  }
} satisfies Lecture;
