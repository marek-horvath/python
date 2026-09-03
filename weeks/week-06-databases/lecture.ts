import type { Lecture } from "../../shared/slide.types";

export const lecture06 = {
  weekNumber: 6,
  slug: "06-databazy",
  title: "Databázy v Pythone",
  description: "Praktická práca s SQLite, SQL dotazmi, transakciami a základmi SQLAlchemy v Python aplikácii.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Databázy v Pythone"
    },
    {
      id: "02-persistence-problem",
      type: "statement",
      title: "Program potrebuje dáta aj po ďalšom spustení",
      body: "Premenná žije iba počas behu programu. Ak aplikácia eviduje používateľov, výsledky, objednávky alebo nastavenia, potrebuje spoľahlivú persistenciu.",
      points: [
        "CSV a JSON sú užitočné pri výmene dát",
        "databáza je lepšia pri častom vyhľadávaní a zmenách",
        "konzistencia dát nemá stáť iba na disciplíne programátora"
      ]
    },
    {
      id: "03-files-vs-database",
      type: "compare",
      title: "Súbor a databáza riešia iný problém",
      columns: [
        {
          title: "CSV / JSON",
          items: ["jednoduchý import alebo export", "ľahko čitateľný formát", "horšia práca so vzťahmi", "zmeny často rieši celý program"]
        },
        {
          title: "Databáza",
          items: ["dotazy nad veľkým množstvom riadkov", "vzťahy medzi tabuľkami", "constraints a transakcie", "efektívne čiastočné zmeny"]
        }
      ]
    },
    {
      id: "04-decision-question",
      type: "question",
      title: "Stačí ešte JSON?",
      prompt: "Máme 20 000 výsledkov študentov. Potrebujeme filtrovať podľa predmetu, meniť body, počítať priemery a strážiť duplicity. Kde začína byť databáza rozumnejšia voľba?"
    },
    {
      id: "05-relational-model",
      type: "diagram",
      title: "Relačný model",
      diagramItems: ["tables", "rows", "columns", "keys", "relationships", "queries"]
    },
    {
      id: "06-student-results",
      type: "table",
      title: "Dáta majú štruktúru",
      table: {
        headers: ["student", "course", "points"],
        rows: [
          ["Anna", "Python", "92"],
          ["Peter", "Python", "67"],
          ["Anna", "Databázy", "85"],
          ["Lucia", "Python", "78"]
        ]
      }
    },
    {
      id: "07-sqlite",
      type: "statement",
      title: "SQLite: databáza v jednom súbore",
      body: "SQLite je relačná databáza bez samostatného servera. Python program pracuje napríklad so súborom `course_results.db`.",
      points: [
        "vhodná na výučbu, prototypy a menšie aplikácie",
        "používa SQL",
        "v Pythone je dostupná cez modul `sqlite3`"
      ]
    },
    {
      id: "08-sqlite-mental-model",
      type: "diagram",
      title: "Mentálny model SQLite",
      diagramItems: ["Python program", "sqlite3", "SQL query", "course_results.db", "rows"]
    },
    {
      id: "09-sqlite3-section",
      type: "section",
      title: "sqlite3",
      subtitle: "Najprv budeme SQL vidieť priamo."
    },
    {
      id: "10-connect",
      type: "code",
      title: "Pripojenie k databáze",
      body: "`connect()` otvorí databázový súbor. Ak neexistuje, SQLite ho vytvorí.",
      code: {
        language: "python",
        label: "database.py",
        runnable: false,
        highlightLines: [3, 4],
        code: `import sqlite3

connection = sqlite3.connect("course_results.db")
cursor = connection.cursor()

connection.close()`
      }
    },
    {
      id: "11-create-table-sql",
      type: "code",
      title: "Schéma tabuľky",
      body: "Tabuľka definuje stĺpce, dátové typy a pravidlá, ktoré má databáza strážiť.",
      code: {
        language: "text",
        label: "SQL",
        code: `CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);`
      }
    },
    {
      id: "12-create-table-python",
      type: "code",
      title: "SQL spúšťame z Pythonu",
      code: {
        language: "python",
        label: "create_schema.py",
        runnable: false,
        highlightLines: [4, 11],
        code: `import sqlite3

connection = sqlite3.connect("course_results.db")
connection.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
""")
connection.commit()
connection.close()`
      }
    },
    {
      id: "13-insert",
      type: "code",
      title: "INSERT pridá riadok",
      body: "Hodnoty vkladáme ako parametre, nie skladaním SQL stringu.",
      code: {
        language: "python",
        label: "insert_student.py",
        runnable: false,
        highlightLines: [4, 6],
        code: `connection.execute(
    """
    INSERT INTO students (name, email)
    VALUES (?, ?)
    """,
    ("Anna", "anna@example.com"),
)
connection.commit()`
      }
    },
    {
      id: "14-parameterized-query",
      type: "split-code",
      title: "F-string do SQL nepatrí",
      codeBlocks: [
        {
          language: "python",
          label: "krehké a nebezpečné",
          variant: "bad",
          runnable: false,
          code: `name = "Anna"

connection.execute(
    f"SELECT * FROM students WHERE name = '{name}'"
)`
        },
        {
          language: "python",
          label: "parametrizované",
          variant: "good",
          runnable: false,
          code: `name = "Anna"

connection.execute(
    "SELECT * FROM students WHERE name = ?",
    (name,),
)`
        }
      ]
    },
    {
      id: "15-injection-question",
      type: "question",
      title: "Kto skladá SQL?",
      prompt: "Ak používateľský input vložíme priamo do SQL stringu, zostáva input iba hodnotou, alebo môže meniť štruktúru dotazu?"
    },
    {
      id: "16-select",
      type: "code",
      title: "SELECT číta riadky",
      body: "Výsledok dotazu môžeme načítať naraz alebo cez neho iterovať.",
      code: {
        language: "python",
        label: "select_students.py",
        runnable: false,
        highlightLines: [1, 5],
        code: `cursor = connection.execute(
    "SELECT id, name, email FROM students ORDER BY name"
)

for row in cursor:
    print(row)`
      }
    },
    {
      id: "17-fetchone",
      type: "code",
      title: "`fetchone()` môže vrátiť `None`",
      code: {
        language: "python",
        label: "find_student.py",
        runnable: false,
        code: `row = connection.execute(
    "SELECT id, name FROM students WHERE email = ?",
    ("anna@example.com",),
).fetchone()

if row is None:
    print("Študent neexistuje")
else:
    print(row[1])`
      }
    },
    {
      id: "18-row-factory",
      type: "code",
      title: "Riadok nemusí byť iba tuple",
      body: "`sqlite3.Row` dovolí pristupovať k stĺpcom podľa názvu.",
      code: {
        language: "python",
        label: "row_factory.py",
        runnable: false,
        highlightLines: [2, 8],
        code: `connection = sqlite3.connect("course_results.db")
connection.row_factory = sqlite3.Row

row = connection.execute(
    "SELECT id, name, email FROM students WHERE id = ?",
    (1,),
).fetchone()

print(row["name"])`
      }
    },
    {
      id: "19-crud",
      type: "table",
      title: "CRUD je slovník základných operácií",
      table: {
        headers: ["Operácia", "SQL"],
        rows: [
          ["Create", "`INSERT`"],
          ["Read", "`SELECT`"],
          ["Update", "`UPDATE`"],
          ["Delete", "`DELETE`"]
        ]
      }
    },
    {
      id: "20-parameterized-select",
      type: "code",
      title: "Parametre patria aj do SELECT",
      code: {
        language: "python",
        label: "query_results.py",
        runnable: false,
        code: `course = "Python"
minimum_points = 50

rows = connection.execute(
    """
    SELECT student_name, points
    FROM results
    WHERE course = ? AND points >= ?
    ORDER BY points DESC
    """,
    (course, minimum_points),
).fetchall()`
      }
    },
    {
      id: "21-commit",
      type: "diagram",
      title: "Commit potvrdí zmenu",
      diagramItems: ["INSERT / UPDATE / DELETE", "pending change", "commit()", "saved in database"]
    },
    {
      id: "22-commit-question",
      type: "question",
      title: "Čo ak chýba `commit()`?",
      prompt: "Program vykoná `INSERT`, potom zavrie connection. Prečo nemusí byť nový riadok v databáze uložený?"
    },
    {
      id: "23-rollback",
      type: "statement",
      title: "Rollback zruší nedokončenú zmenu",
      body: "Ak séria databázových zmien zlyhá uprostred, `rollback()` vráti databázu do konzistentného stavu pred transakciou.",
      points: [
        "vložiť študenta a jeho výsledok je jedna logická operácia",
        "polovične uložená operácia býva horšia než žiadna",
        "transakcia dáva operácii vlastnosť all-or-nothing"
      ]
    },
    {
      id: "24-context-manager",
      type: "code",
      title: "Connection ako context manager",
      body: "`with` pri úspechu potvrdí transakciu, pri chybe ju vráti späť.",
      code: {
        language: "python",
        label: "with_connection.py",
        runnable: false,
        code: `import sqlite3

with sqlite3.connect("course_results.db") as connection:
    connection.execute(
        "INSERT INTO students (name, email) VALUES (?, ?)",
        ("Anna", "anna@example.com"),
    )`
      }
    },
    {
      id: "25-all-or-nothing",
      type: "code",
      title: "All-or-nothing v praxi",
      code: {
        language: "python",
        label: "transaction.py",
        runnable: false,
        code: `try:
    with sqlite3.connect("course_results.db") as connection:
        connection.execute("INSERT INTO students (name) VALUES (?)", ("Anna",))
        connection.execute(
            "INSERT INTO results (student_id, points) VALUES (?, ?)",
            (1, 92),
        )
except sqlite3.Error as error:
    print(f"Databázová chyba: {error}")`
      }
    },
    {
      id: "26-constraints",
      type: "table",
      title: "Databáza môže strážiť pravidlá",
      table: {
        headers: ["Constraint", "Význam v aplikácii"],
        rows: [
          ["`PRIMARY KEY`", "jednoznačná identita riadku"],
          ["`NOT NULL`", "hodnota musí existovať"],
          ["`UNIQUE`", "email sa neopakuje"],
          ["`CHECK`", "body sú v povolenom rozsahu"],
          ["`FOREIGN KEY`", "výsledok patrí existujúcemu študentovi"]
        ]
      }
    },
    {
      id: "27-integrity-question",
      type: "question",
      title: "Kde má byť kontrola?",
      prompt: "Ak email musí byť unikátny, stačí kontrola v Python kóde, alebo má pravidlo poznať aj databáza?"
    },
    {
      id: "28-relations",
      type: "diagram",
      title: "Vzťahy medzi tabuľkami",
      diagramItems: ["students", "results", "courses", "foreign keys", "JOIN"]
    },
    {
      id: "29-foreign-keys",
      type: "code",
      title: "Výsledok odkazuje na študenta aj predmet",
      code: {
        language: "text",
        label: "SQL",
        code: `CREATE TABLE results (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`
      }
    },
    {
      id: "30-join",
      type: "code",
      title: "JOIN spojí viac tabuliek",
      code: {
        language: "text",
        label: "SQL",
        code: `SELECT students.name, courses.title, results.points
FROM results
JOIN students ON students.id = results.student_id
JOIN courses ON courses.id = results.course_id
WHERE courses.title = 'Python'
ORDER BY results.points DESC;`
      }
    },
    {
      id: "31-errors",
      type: "bullets",
      title: "Databázové chyby sú očakávané situácie",
      points: [
        "duplicitná hodnota v `UNIQUE` stĺpci",
        "neplatný foreign key",
        "poškodený alebo zamknutý databázový súbor",
        "chýbajúca tabuľka alebo stĺpec",
        "aplikácia nemá právo zapisovať"
      ]
    },
    {
      id: "32-integrity-error",
      type: "code",
      title: "Chybu treba riešiť konkrétne",
      code: {
        language: "python",
        label: "integrity_error.py",
        runnable: false,
        code: `try:
    connection.execute(
        "INSERT INTO students (email) VALUES (?)",
        ("anna@example.com",),
    )
    connection.commit()
except sqlite3.IntegrityError:
    print("Email už v databáze existuje")`
      }
    },
    {
      id: "33-sqlalchemy-section",
      type: "section",
      title: "SQLAlchemy",
      subtitle: "Objektová vrstva nad relačnou databázou."
    },
    {
      id: "34-sql-vs-orm-idea",
      type: "statement",
      title: "ORM neruší SQL",
      body: "ORM mapuje tabuľky na Python objekty a generuje SQL. Stále je užitočné rozumieť tomu, aké dotazy aplikácia vykonáva.",
      points: [
        "menej ručného mapovania riadkov na objekty",
        "príjemnejšia práca s bežným CRUD",
        "riziko nejasného výkonu, ak ignorujeme SQL"
      ]
    },
    {
      id: "35-orm-model",
      type: "code",
      title: "Model ako Python trieda",
      code: {
        language: "python",
        label: "models.py",
        runnable: false,
        highlightLines: [4, 8, 10, 11],
        code: `from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)`
      }
    },
    {
      id: "36-engine",
      type: "code",
      title: "Engine určuje databázu",
      code: {
        language: "python",
        label: "database.py",
        runnable: false,
        code: `from sqlalchemy import create_engine

engine = create_engine(
    "sqlite:///course_results.db",
    echo=False,
)`
      }
    },
    {
      id: "37-create-schema-orm",
      type: "code",
      title: "Schému vie vytvoriť metadata",
      body: "Pri väčších projektoch sa používajú migrácie. Tu stačí ukázať základný mechanizmus.",
      code: {
        language: "python",
        label: "schema.py",
        runnable: false,
        code: `from database import engine
from models import Base

Base.metadata.create_all(engine)`
      }
    },
    {
      id: "38-session",
      type: "statement",
      title: "Session je pracovná jednotka",
      body: "`Session` načíta objekty, sleduje zmeny a pri `commit()` ich zapíše do databázy.",
      points: [
        "podobná logická úloha ako transakcia",
        "pracujeme s objektmi namiesto tuple riadkov",
        "commit je stále explicitné rozhodnutie"
      ]
    },
    {
      id: "39-orm-insert",
      type: "code",
      title: "Vloženie objektu",
      code: {
        language: "python",
        label: "insert_student.py",
        runnable: false,
        highlightLines: [3, 5, 6],
        code: `from sqlalchemy.orm import Session

student = Student(name="Anna", email="anna@example.com")

with Session(engine) as session:
    session.add(student)
    session.commit()`
      }
    },
    {
      id: "40-orm-select",
      type: "code",
      title: "SELECT v SQLAlchemy 2.x",
      code: {
        language: "python",
        label: "select_student.py",
        runnable: false,
        highlightLines: [3, 6],
        code: `from sqlalchemy import select

statement = select(Student).where(Student.email == "anna@example.com")

with Session(engine) as session:
    students = session.scalars(statement).all()

for student in students:
    print(student.name)`
      }
    },
    {
      id: "41-relationship",
      type: "code",
      title: "Vzťah môže byť objektový",
      code: {
        language: "python",
        label: "relationship.py",
        runnable: false,
        code: `class Result(Base):
    __tablename__ = "results"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    points: Mapped[int]

    student: Mapped[Student] = relationship()`
      }
    },
    {
      id: "42-sql-or-orm",
      type: "compare",
      title: "Explicitné SQL alebo ORM",
      columns: [
        {
          title: "SQL",
          items: ["presne vidíme dotaz", "výborné pre reporting", "dobré pri zložitých agregáciách", "viac ručného mapovania"]
        },
        {
          title: "ORM",
          items: ["pracujeme s objektmi", "menej opakovaného CRUD", "ľahšie refaktorovanie modelov", "treba chápať generované SQL"]
        }
      ]
    },
    {
      id: "43-demo",
      type: "demo",
      title: "Demo: minimálna databáza",
      points: [
        "vytvoriť `course_results.db`",
        "vytvoriť tabuľku",
        "vložiť riadok cez parametre",
        "prečítať riadky cez `SELECT`",
        "ukázať chybu pri duplicite"
      ]
    },
    {
      id: "44-summary",
      type: "takeaway",
      title: "Čo si odniesť",
      points: [
        "Databáza je vhodná pre štruktúrované dáta, dotazy a konzistenciu.",
        "SQLite stačí na veľa menších Python aplikácií.",
        "Parametrizované dotazy sú základný bezpečnostný návyk.",
        "Transakcie chránia dáta pred polovičnými zmenami.",
        "SQLAlchemy zjednodušuje prácu s objektmi, ale SQL nezmizne."
      ]
    },
    {
      id: "45-next",
      type: "statement",
      title: "Ďalej",
      subtitle: "Data Science v Pythone",
      body: "Databáza vie dáta uložiť a vyhľadať. Ďalšia téma je spracovanie, agregácia a vizualizácia dát v Pythone."
    }
  ],
  translations: {
    en: {
      title: "Databases in Python",
      description: "Practical work with SQLite, SQL queries, transactions and SQLAlchemy basics in a Python application.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Databases in Python"
        },
        "02-persistence-problem": {
          title: "A Program Needs Data After the Next Run",
          body: "A variable lives only while the program is running. If an application records users, results, orders or settings, it needs reliable persistence.",
          points: [
            "CSV and JSON are useful for data exchange",
            "a database is better for frequent searching and changes",
            "data consistency should not depend only on programmer discipline"
          ]
        },
        "03-files-vs-database": {
          title: "A File and a Database Solve Different Problems",
          columns: [
            {
              title: "CSV / JSON",
              items: [
                "simple import or export",
                "easy-to-read format",
                "weaker support for relationships",
                "changes are often handled by the whole program"
              ]
            },
            {
              title: "Database",
              items: [
                "queries over many rows",
                "relationships between tables",
                "constraints and transactions",
                "efficient partial updates"
              ]
            }
          ]
        },
        "04-decision-question": {
          title: "Is JSON Still Enough?",
          prompt: "We have 20,000 student results. We need to filter by course, change points, compute averages and prevent duplicates. Where does a database become the more reasonable choice?"
        },
        "05-relational-model": {
          title: "Relational Model",
          diagramItems: ["tables", "rows", "columns", "keys", "relationships", "queries"]
        },
        "06-student-results": {
          title: "Data Has Structure",
          table: {
            headers: ["student", "course", "points"],
            rows: [
              ["Anna", "Python", "92"],
              ["Peter", "Python", "67"],
              ["Anna", "Databases", "85"],
              ["Lucia", "Python", "78"]
            ]
          }
        },
        "07-sqlite": {
          title: "SQLite: a Database in One File",
          body: "SQLite is a relational database without a separate server. A Python program can work with a file such as `course_results.db`.",
          points: [
            "useful for teaching, prototypes and smaller applications",
            "uses SQL",
            "available in Python through the `sqlite3` module"
          ]
        },
        "08-sqlite-mental-model": {
          title: "SQLite Mental Model",
          diagramItems: ["Python program", "sqlite3", "SQL query", "course_results.db", "rows"]
        },
        "09-sqlite3-section": {
          title: "sqlite3",
          subtitle: "First we will see SQL directly."
        },
        "10-connect": {
          title: "Connecting to a Database",
          body: "`connect()` opens a database file. If it does not exist, SQLite creates it."
        },
        "11-create-table-sql": {
          title: "Table Schema",
          body: "A table defines columns, data types and rules that the database should enforce."
        },
        "12-create-table-python": {
          title: "Running SQL from Python"
        },
        "13-insert": {
          title: "INSERT Adds a Row",
          body: "Insert values as parameters, not by concatenating an SQL string."
        },
        "14-parameterized-query": {
          title: "An F-String Does Not Belong in SQL",
          codeBlocks: [
            { label: "fragile and unsafe" },
            { label: "parameterized" }
          ]
        },
        "15-injection-question": {
          title: "Who Builds the SQL?",
          prompt: "If user input is inserted directly into an SQL string, does it remain only a value, or can it change the structure of the query?"
        },
        "16-select": {
          title: "SELECT Reads Rows",
          body: "The query result can be loaded at once or iterated over."
        },
        "17-fetchone": {
          title: "`fetchone()` Can Return `None`",
          code: {
            code: `row = connection.execute(
    "SELECT id, name FROM students WHERE email = ?",
    ("anna@example.com",),
).fetchone()

if row is None:
    print("Student does not exist")
else:
    print(row[1])`
          }
        },
        "18-row-factory": {
          title: "A Row Does Not Have to Be Only a Tuple",
          body: "`sqlite3.Row` allows access to columns by name."
        },
        "19-crud": {
          title: "CRUD Is Vocabulary for Basic Operations",
          table: {
            headers: ["Operation", "SQL"],
            rows: [
              ["Create", "`INSERT`"],
              ["Read", "`SELECT`"],
              ["Update", "`UPDATE`"],
              ["Delete", "`DELETE`"]
            ]
          }
        },
        "20-parameterized-select": {
          title: "Parameters Belong in SELECT Too"
        },
        "21-commit": {
          title: "Commit Confirms a Change",
          diagramItems: ["INSERT / UPDATE / DELETE", "pending change", "commit()", "saved in database"]
        },
        "22-commit-question": {
          title: "What If `commit()` Is Missing?",
          prompt: "The program runs `INSERT` and then closes the connection. Why might the new row not be stored in the database?"
        },
        "23-rollback": {
          title: "Rollback Cancels an Unfinished Change",
          body: "If a series of database changes fails in the middle, `rollback()` returns the database to the consistent state before the transaction.",
          points: [
            "inserting a student and their result is one logical operation",
            "a half-saved operation is often worse than no operation",
            "a transaction gives the operation an all-or-nothing property"
          ]
        },
        "24-context-manager": {
          title: "Connection as a Context Manager",
          body: "`with` commits the transaction on success and rolls it back on error."
        },
        "25-all-or-nothing": {
          title: "All-or-Nothing in Practice",
          code: {
            code: `try:
    with sqlite3.connect("course_results.db") as connection:
        connection.execute("INSERT INTO students (name) VALUES (?)", ("Anna",))
        connection.execute(
            "INSERT INTO results (student_id, points) VALUES (?, ?)",
            (1, 92),
        )
except sqlite3.Error as error:
    print(f"Database error: {error}")`
          }
        },
        "26-constraints": {
          title: "A Database Can Enforce Rules",
          table: {
            headers: ["Constraint", "Meaning in an application"],
            rows: [
              ["`PRIMARY KEY`", "unique identity of a row"],
              ["`NOT NULL`", "the value must exist"],
              ["`UNIQUE`", "the email is not repeated"],
              ["`CHECK`", "points are in an allowed range"],
              ["`FOREIGN KEY`", "a result belongs to an existing student"]
            ]
          }
        },
        "27-integrity-question": {
          title: "Where Should the Check Live?",
          prompt: "If an email must be unique, is a check in Python code enough, or should the database know the rule too?"
        },
        "28-relations": {
          title: "Relationships Between Tables",
          diagramItems: ["students", "results", "courses", "foreign keys", "JOIN"]
        },
        "29-foreign-keys": {
          title: "A Result References Both a Student and a Course"
        },
        "30-join": {
          title: "JOIN Combines Multiple Tables"
        },
        "31-errors": {
          title: "Database Errors Are Expected Situations",
          points: [
            "duplicate value in a `UNIQUE` column",
            "invalid foreign key",
            "corrupted or locked database file",
            "missing table or column",
            "the application has no write permission"
          ]
        },
        "32-integrity-error": {
          title: "Handle an Error Specifically",
          code: {
            code: `try:
    connection.execute(
        "INSERT INTO students (email) VALUES (?)",
        ("anna@example.com",),
    )
    connection.commit()
except sqlite3.IntegrityError:
    print("This email already exists in the database")`
          }
        },
        "33-sqlalchemy-section": {
          title: "SQLAlchemy",
          subtitle: "An object layer over a relational database."
        },
        "34-sql-vs-orm-idea": {
          title: "An ORM Does Not Remove SQL",
          body: "An ORM maps tables to Python objects and generates SQL. It is still useful to understand which queries the application runs.",
          points: [
            "less manual mapping from rows to objects",
            "more convenient work with common CRUD",
            "risk of unclear performance if we ignore SQL"
          ]
        },
        "35-orm-model": {
          title: "Model as a Python Class"
        },
        "36-engine": {
          title: "Engine Defines the Database"
        },
        "37-create-schema-orm": {
          title: "Metadata Can Create the Schema",
          body: "Larger projects use migrations. Here it is enough to show the basic mechanism."
        },
        "38-session": {
          title: "Session Is a Unit of Work",
          body: "`Session` loads objects, tracks changes and writes them to the database on `commit()`.",
          points: [
            "similar logical role as a transaction",
            "we work with objects instead of tuple rows",
            "commit is still an explicit decision"
          ]
        },
        "39-orm-insert": {
          title: "Inserting an Object"
        },
        "40-orm-select": {
          title: "SELECT in SQLAlchemy 2.x"
        },
        "41-relationship": {
          title: "A Relationship Can Be Object-Based"
        },
        "42-sql-or-orm": {
          title: "Explicit SQL or ORM",
          columns: [
            {
              title: "SQL",
              items: [
                "we see the query precisely",
                "excellent for reporting",
                "good for complex aggregations",
                "more manual mapping"
              ]
            },
            {
              title: "ORM",
              items: [
                "we work with objects",
                "less repeated CRUD code",
                "easier model refactoring",
                "we still need to understand generated SQL"
              ]
            }
          ]
        },
        "43-demo": {
          title: "Demo: Minimal Database",
          points: [
            "create `course_results.db`",
            "create a table",
            "insert a row with parameters",
            "read rows with `SELECT`",
            "show an error on a duplicate"
          ]
        },
        "44-summary": {
          title: "What to Take Away",
          points: [
            "A database is useful for structured data, queries and consistency.",
            "SQLite is enough for many smaller Python applications.",
            "Parameterized queries are a basic security habit.",
            "Transactions protect data from half-finished changes.",
            "SQLAlchemy simplifies working with objects, but SQL does not disappear."
          ]
        },
        "45-next": {
          title: "Next",
          subtitle: "Data Science in Python",
          body: "A database can store and search data. The next topic is processing, aggregation and visualization of data in Python."
        }
      }
    }
  }
} satisfies Lecture;
