import type { Lecture } from "../../shared/slide.types";

export const lecture07 = {
  weekNumber: 7,
  slug: "07-data-science",
  title: "Data Science v Pythone",
  description: "Praktický úvod do dátového workflow v Pythone: NumPy, pandas, Jupyter a základná vizualizácia.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Data Science v Pythone"
    },
    {
      id: "02-practical-questions",
      type: "statement",
      title: "Dátová práca začína otázkou",
      body: "Tabuľka sama o sebe nie je výsledok. Výsledkom je odpoveď, rozhodnutie, graf, report alebo dátovo podložené zistenie.",
      points: [
        "ktorý predmet má najnižší priemer",
        "koľko odovzdaní bolo neúspešných",
        "či sú v dátach duplicity alebo chýbajúce hodnoty",
        "ako sa výsledky menia medzi pokusmi"
      ]
    },
    {
      id: "03-data-workflow",
      type: "diagram",
      title: "Typický dátový workflow",
      diagramItems: ["question", "load data", "inspect", "clean", "transform", "aggregate", "visualize", "communicate"]
    },
    {
      id: "04-data-science-not-only-ml",
      type: "statement",
      title: "Data Science nie je iba machine learning",
      body: "Veľká časť praktickej dátovej práce je obyčajné, presné a opakovateľné spracovanie dát.",
      points: [
        "načítať dáta z CSV, databázy alebo API",
        "pochopiť typy, rozsahy a chýbajúce hodnoty",
        "vytvoriť agregácie a reporty",
        "zobraziť výsledok tak, aby sa dal čítať"
      ]
    },
    {
      id: "05-ecosystem",
      type: "diagram",
      title: "Python dátový ekosystém",
      diagramItems: ["NumPy", "pandas", "Matplotlib", "Jupyter", "SciPy / scikit-learn", "reports"]
    },
    {
      id: "06-jupyter",
      type: "statement",
      title: "Jupyter je pracovný zošit",
      body: "Notebook spája kód, výsledky, text a grafy. Je praktický pri explorácii a vysvetľovaní dátovej analýzy.",
      points: [
        "cell -> execute -> result",
        "rýchle experimentovanie",
        "dobrý formát pre priebežnú analytickú prácu"
      ]
    },
    {
      id: "07-notebook-risk",
      type: "takeaway",
      title: "Notebook si pamätá stav",
      points: [
        "bunky nemusia byť spustené v poradí zhora nadol",
        "premenné môžu zostať v pamäti z predchádzajúceho experimentu",
        "pred odovzdaním použite Restart kernel + Run All"
      ]
    },
    {
      id: "08-notebook-question",
      type: "question",
      title: "Prečo výsledok niekedy nejde zopakovať?",
      prompt: "Notebook funguje u autora, ale po reštarte kernelu zlyhá. Aké premenné alebo kroky mohli byť závislé od predchádzajúceho poradia buniek?"
    },
    {
      id: "09-numpy-section",
      type: "section",
      title: "NumPy",
      subtitle: "Efektívna práca s číselnými poľami."
    },
    {
      id: "10-list-vs-array",
      type: "compare",
      title: "Python list vs. NumPy array",
      columns: [
        {
          title: "list",
          items: ["všeobecná kolekcia", "môže miešať typy", "výborný pre bežné programovanie", "numeriku často riešime cyklom"]
        },
        {
          title: "NumPy array",
          items: ["homogénne číselné dáta", "vektorové operácie", "efektívnejšia pamäť", "základ vedeckého Pythonu"]
        }
      ]
    },
    {
      id: "11-array-shape-dtype",
      type: "code",
      title: "Array má tvar a typ",
      code: {
        language: "python",
        label: "numpy_basics.py",
        runnable: false,
        highlightLines: [3, 5, 6],
        code: `import numpy as np

values = np.array([10, 20, 30, 40])

print(values.shape)
print(values.dtype)`
      }
    },
    {
      id: "12-vectorization",
      type: "split-code",
      title: "Vektorová operácia namiesto cyklu",
      codeBlocks: [
        {
          language: "python",
          label: "list",
          runnable: true,
          code: `values = [10, 20, 30]
doubled = []

for value in values:
    doubled.append(value * 2)`
        },
        {
          language: "python",
          label: "NumPy",
          runnable: false,
          code: `import numpy as np

values = np.array([10, 20, 30])
doubled = values * 2`
        }
      ]
    },
    {
      id: "13-broadcasting",
      type: "code",
      title: "Broadcasting v jednoduchom prípade",
      body: "Operácia so skalárom sa aplikuje na celé pole.",
      code: {
        language: "python",
        label: "broadcasting.py",
        runnable: false,
        code: `points = np.array([92, 67, 45, 81])

bonus_points = points + 5
percent = points / 100`
      }
    },
    {
      id: "14-indexing-slicing",
      type: "code",
      title: "Indexing a slicing sú známe koncepty",
      code: {
        language: "python",
        label: "slicing.py",
        runnable: false,
        code: `values = np.array([10, 20, 30, 40, 50])

first = values[0]
last = values[-1]
middle = values[1:4]
reversed_values = values[::-1]`
      }
    },
    {
      id: "15-2d-array",
      type: "code",
      title: "Dvojrozmerné dáta majú osi",
      code: {
        language: "python",
        label: "matrix.py",
        runnable: false,
        highlightLines: [6, 7],
        code: `matrix = np.array([
    [92, 85, 78],
    [67, 74, 81],
])

first_row = matrix[0, :]
first_column = matrix[:, 0]`
      }
    },
    {
      id: "16-boolean-indexing",
      type: "code",
      title: "Maska vyberá hodnoty podľa podmienky",
      code: {
        language: "python",
        label: "mask.py",
        runnable: false,
        highlightLines: [3, 4],
        code: `points = np.array([92, 67, 45, 81])

passed_mask = points >= 50
passed_points = points[passed_mask]`
      }
    },
    {
      id: "17-aggregations",
      type: "code",
      title: "Agregácie nad poľom",
      code: {
        language: "python",
        label: "aggregate.py",
        runnable: false,
        code: `points = np.array([92, 67, 45, 81])

print(points.mean())
print(points.min())
print(points.max())
print(points.sum())`
      }
    },
    {
      id: "18-numpy-question",
      type: "question",
      title: "Čo bude výsledok?",
      prompt: "Ak `points = np.array([40, 50, 90])`, čo reprezentuje výraz `points >= 50`?"
    },
    {
      id: "19-pandas-section",
      type: "section",
      title: "pandas",
      subtitle: "Tabuľkové dáta ako prvotriedny objekt."
    },
    {
      id: "20-series-dataframe",
      type: "table",
      title: "Series a DataFrame",
      table: {
        headers: ["Objekt", "Mentálny model"],
        rows: [
          ["`Series`", "jeden pomenovaný stĺpec"],
          ["`DataFrame`", "tabuľka so stĺpcami a riadkami"]
        ]
      }
    },
    {
      id: "21-dataset",
      type: "code",
      title: "Priebežný dataset",
      body: "Malý výrez predstavuje tabuľku s výsledkami študentov.",
      code: {
        language: "text",
        label: "results.csv",
        code: `student,course,points,attempt,submitted_at,duration_min
Anna,Python,92,1,2026-10-01,48
Peter,Python,67,1,2026-10-01,65
Lucia,Databázy,88,1,2026-10-03,54
Martin,Python,45,2,2026-10-04,90`
      }
    },
    {
      id: "22-read-csv",
      type: "code",
      title: "Dáta najprv načítať a pozrieť",
      code: {
        language: "python",
        label: "load_data.py",
        runnable: false,
        highlightLines: [3, 5, 6, 7],
        code: `import pandas as pd

df = pd.read_csv("results.csv")

print(df.head())
print(df.shape)
print(df.columns)`
      }
    },
    {
      id: "23-inspect",
      type: "code",
      title: "Rýchla diagnostika",
      code: {
        language: "python",
        label: "inspect.py",
        runnable: false,
        code: `df.info()

print(df.describe())
print(df.dtypes)`
      }
    },
    {
      id: "24-select-columns",
      type: "split-code",
      title: "Výber stĺpcov",
      codeBlocks: [
        {
          language: "python",
          label: "Series",
          runnable: false,
          code: `points = df["points"]`
        },
        {
          language: "python",
          label: "DataFrame",
          runnable: false,
          code: `short_table = df[["student", "course", "points"]]`
        }
      ]
    },
    {
      id: "25-filtering",
      type: "code",
      title: "Filtrovanie riadkov",
      body: "Pri viacerých podmienkach používame zátvorky a `&` alebo `|`.",
      code: {
        language: "python",
        label: "filter.py",
        runnable: false,
        highlightLines: [2, 3],
        code: `passed_python = df[
    (df["course"] == "Python")
    & (df["points"] >= 50)
]`
      }
    },
    {
      id: "26-filter-question",
      type: "question",
      title: "Čo vyberie tento filter?",
      prompt: "`(df[\"course\"] == \"Python\") & (df[\"points\"] >= 50)`"
    },
    {
      id: "27-loc-iloc",
      type: "table",
      title: "`loc` a `iloc`",
      table: {
        headers: ["Výber", "Použitie"],
        rows: [
          ["`df.loc[...]`", "podľa labelov a boolean masiek"],
          ["`df.iloc[...]`", "podľa číselných pozícií"]
        ]
      }
    },
    {
      id: "28-sorting",
      type: "code",
      title: "Triedenie dá prvé odpovede",
      code: {
        language: "python",
        label: "sort.py",
        runnable: false,
        code: `top_results = df.sort_values(
    by="points",
    ascending=False,
).head(5)

print(top_results[["student", "course", "points"]])`
      }
    },
    {
      id: "29-derived-column",
      type: "code",
      title: "Odvodený stĺpec",
      code: {
        language: "python",
        label: "derived.py",
        runnable: false,
        code: `df["passed"] = df["points"] >= 50
df["points_per_minute"] = df["points"] / df["duration_min"]

print(df[["student", "passed", "points_per_minute"]])`
      }
    },
    {
      id: "30-missing-values",
      type: "code",
      title: "Chýbajúce hodnoty najprv zmeraj",
      code: {
        language: "python",
        label: "missing.py",
        runnable: false,
        code: `missing = df.isna().sum()
print(missing)

clean = df.dropna(subset=["points"])
filled = df.fillna({"duration_min": 0})`
      }
    },
    {
      id: "31-missing-question",
      type: "question",
      title: "Čo znamená prázdna hodnota?",
      prompt: "Ak chýba `duration_min`, je to nula minút, neodovzdané riešenie alebo iba chýbajúce meranie?"
    },
    {
      id: "32-duplicates",
      type: "code",
      title: "Duplicity môžu byť chyba aj realita",
      code: {
        language: "python",
        label: "duplicates.py",
        runnable: false,
        code: `duplicates = df.duplicated(
    subset=["student", "course", "attempt"]
)

print(df[duplicates])`
      }
    },
    {
      id: "33-groupby-section",
      type: "section",
      title: "GroupBy",
      subtitle: "Otázky typu: podľa predmetu, podľa študenta, podľa kategórie."
    },
    {
      id: "34-groupby-model",
      type: "diagram",
      title: "Split - apply - combine",
      diagramItems: ["split by course", "calculate mean", "combine result table"]
    },
    {
      id: "35-groupby-code",
      type: "code",
      title: "Priemer bodov podľa predmetu",
      code: {
        language: "python",
        label: "groupby.py",
        runnable: false,
        highlightLines: [1],
        code: `average_by_course = df.groupby("course")["points"].mean()

print(average_by_course.sort_values(ascending=False))`
      }
    },
    {
      id: "36-groupby-agg",
      type: "code",
      title: "Viac agregácií naraz",
      code: {
        language: "python",
        label: "agg.py",
        runnable: false,
        code: `summary = df.groupby("course")["points"].agg(
    count="count",
    mean="mean",
    minimum="min",
    maximum="max",
)

print(summary)`
      }
    },
    {
      id: "37-value-counts",
      type: "code",
      title: "`value_counts()` ako frekvenčná tabuľka",
      code: {
        language: "python",
        label: "counts.py",
        runnable: false,
        code: `print(df["course"].value_counts())
print(df["passed"].value_counts())`
      }
    },
    {
      id: "38-merge",
      type: "split-code",
      title: "Merge je pandas verzia JOIN",
      codeBlocks: [
        {
          language: "text",
          label: "SQL",
          code: `SELECT *
FROM results
JOIN courses ON courses.id = results.course_id;`
        },
        {
          language: "python",
          label: "pandas",
          runnable: false,
          code: `merged = results.merge(
    courses,
    left_on="course_id",
    right_on="id",
)`
        }
      ]
    },
    {
      id: "39-apply-careful",
      type: "takeaway",
      title: "`apply()` nie je prvá voľba",
      points: [
        "najprv hľadajte vektorový pandas zápis",
        "`apply()` môže byť čitateľné pre jednoduchú vlastnú logiku",
        "pri veľkých dátach býva výrazne pomalšie než vektorová operácia"
      ]
    },
    {
      id: "40-visualization-section",
      type: "section",
      title: "Vizualizácia",
      subtitle: "Graf má odpovedať na konkrétnu otázku."
    },
    {
      id: "41-bar-chart",
      type: "code",
      title: "Bar chart: porovnanie kategórií",
      code: {
        language: "python",
        label: "bar.py",
        runnable: false,
        code: `import matplotlib.pyplot as plt

average_by_course.plot(kind="bar")
plt.ylabel("Priemerný počet bodov")
plt.title("Priemer podľa predmetu")
plt.tight_layout()
plt.show()`
      }
    },
    {
      id: "42-histogram",
      type: "code",
      title: "Histogram: rozdelenie hodnôt",
      code: {
        language: "python",
        label: "hist.py",
        runnable: false,
        code: `df["points"].plot(kind="hist", bins=10)
plt.xlabel("Body")
plt.title("Rozdelenie bodov")
plt.show()`
      }
    },
    {
      id: "43-chart-question",
      type: "question",
      title: "Aký graf zvoliť?",
      prompt: "Chceme porovnať priemerný počet bodov v predmetoch. Je vhodnejší bar chart, histogram alebo scatter plot?"
    },
    {
      id: "44-sql-to-pandas",
      type: "code",
      title: "DataFrame môže vzniknúť aj zo SQL",
      body: "Dáta uložené v databáze vieme načítať priamo do pandas a pokračovať v analýze.",
      code: {
        language: "python",
        label: "from_sql.py",
        runnable: false,
        code: `query = """
SELECT students.name, courses.title, results.points
FROM results
JOIN students ON students.id = results.student_id
JOIN courses ON courses.id = results.course_id
"""

df = pd.read_sql(query, connection)`
      }
    },
    {
      id: "45-demo-next",
      type: "demo",
      title: "Demo: CSV -> otázka -> odpoveď",
      points: [
        "načítať CSV cez `read_csv`",
        "skontrolovať `head`, `shape`, `info`",
        "vyfiltrovať jeden predmet",
        "spraviť `groupby`",
        "nakresliť jeden jednoduchý graf",
        "ďalšia téma: získavanie dát z webu"
      ]
    }
  ],
  translations: {
    en: {
      title: "Data Science in Python",
      description: "A practical introduction to the data workflow in Python: NumPy, pandas, Jupyter and basic visualization.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Data Science in Python"
        },
        "02-practical-questions": {
          title: "Data Work Starts with a Question",
          body: "A table itself is not the result. The result is an answer, decision, chart, report or data-supported finding.",
          points: [
            "which course has the lowest average",
            "how many submissions were unsuccessful",
            "whether the data contains duplicates or missing values",
            "how results change between attempts"
          ]
        },
        "03-data-workflow": {
          title: "Typical Data Workflow",
          diagramItems: ["question", "load data", "inspect", "clean", "transform", "aggregate", "visualize", "communicate"]
        },
        "04-data-science-not-only-ml": {
          title: "Data Science Is Not Only Machine Learning",
          body: "A large part of practical data work is ordinary, precise and repeatable data processing.",
          points: [
            "load data from CSV, a database or an API",
            "understand types, ranges and missing values",
            "create aggregations and reports",
            "present the result in a readable form"
          ]
        },
        "05-ecosystem": {
          title: "Python Data Ecosystem",
          diagramItems: ["NumPy", "pandas", "Matplotlib", "Jupyter", "SciPy / scikit-learn", "reports"]
        },
        "06-jupyter": {
          title: "Jupyter Is a Notebook",
          body: "A notebook combines code, results, text and charts. It is practical for exploration and explaining data analysis.",
          points: [
            "cell -> execute -> result",
            "quick experimentation",
            "a good format for ongoing analytical work"
          ]
        },
        "07-notebook-risk": {
          title: "A Notebook Remembers State",
          points: [
            "cells may not have been run from top to bottom",
            "variables may remain in memory from a previous experiment",
            "before submission, use Restart kernel + Run All"
          ]
        },
        "08-notebook-question": {
          title: "Why Can a Result Be Hard to Reproduce?",
          prompt: "A notebook works for its author, but fails after restarting the kernel. Which variables or steps may have depended on the previous cell order?"
        },
        "09-numpy-section": {
          title: "NumPy",
          subtitle: "Efficient work with numerical arrays."
        },
        "10-list-vs-array": {
          title: "Python List vs. NumPy Array",
          columns: [
            {
              title: "list",
              items: [
                "general-purpose collection",
                "can mix types",
                "excellent for ordinary programming",
                "numeric work is often done with loops"
              ]
            },
            {
              title: "NumPy array",
              items: [
                "homogeneous numerical data",
                "vectorized operations",
                "more efficient memory use",
                "foundation of scientific Python"
              ]
            }
          ]
        },
        "11-array-shape-dtype": {
          title: "An Array Has Shape and Type"
        },
        "12-vectorization": {
          title: "Vectorized Operation Instead of a Loop"
        },
        "13-broadcasting": {
          title: "Broadcasting in a Simple Case",
          body: "An operation with a scalar is applied to the whole array."
        },
        "14-indexing-slicing": {
          title: "Indexing and Slicing Are Familiar Concepts"
        },
        "15-2d-array": {
          title: "Two-Dimensional Data Has Axes"
        },
        "16-boolean-indexing": {
          title: "A Mask Selects Values by a Condition"
        },
        "17-aggregations": {
          title: "Aggregations over an Array"
        },
        "18-numpy-question": {
          title: "What Will the Result Be?",
          prompt: "If `points = np.array([40, 50, 90])`, what does the expression `points >= 50` represent?"
        },
        "19-pandas-section": {
          title: "pandas",
          subtitle: "Tabular data as a first-class object."
        },
        "20-series-dataframe": {
          title: "Series and DataFrame",
          table: {
            headers: ["Object", "Mental model"],
            rows: [
              ["`Series`", "one named column"],
              ["`DataFrame`", "a table with columns and rows"]
            ]
          }
        },
        "21-dataset": {
          title: "Running Dataset",
          body: "A small slice represents a table with student results.",
          code: {
            code: `student,course,points,attempt,submitted_at,duration_min
Anna,Python,92,1,2026-10-01,48
Peter,Python,67,1,2026-10-01,65
Lucia,Databases,88,1,2026-10-03,54
Martin,Python,45,2,2026-10-04,90`
          }
        },
        "22-read-csv": {
          title: "First Load and Inspect the Data"
        },
        "23-inspect": {
          title: "Quick Diagnostics"
        },
        "24-select-columns": {
          title: "Selecting Columns"
        },
        "25-filtering": {
          title: "Filtering Rows",
          body: "For multiple conditions, use parentheses and `&` or `|`."
        },
        "26-filter-question": {
          title: "What Does This Filter Select?",
          prompt: "`(df[\"course\"] == \"Python\") & (df[\"points\"] >= 50)`"
        },
        "27-loc-iloc": {
          title: "`loc` and `iloc`",
          table: {
            headers: ["Selection", "Use"],
            rows: [
              ["`df.loc[...]`", "by labels and boolean masks"],
              ["`df.iloc[...]`", "by numeric positions"]
            ]
          }
        },
        "28-sorting": {
          title: "Sorting Gives First Answers"
        },
        "29-derived-column": {
          title: "Derived Column"
        },
        "30-missing-values": {
          title: "Measure Missing Values First"
        },
        "31-missing-question": {
          title: "What Does a Missing Value Mean?",
          prompt: "If `duration_min` is missing, is it zero minutes, an unsubmitted solution, or only a missing measurement?"
        },
        "32-duplicates": {
          title: "Duplicates Can Be an Error or Reality"
        },
        "33-groupby-section": {
          title: "GroupBy",
          subtitle: "Questions such as: by course, by student, by category."
        },
        "34-groupby-model": {
          title: "Split - Apply - Combine",
          diagramItems: ["split by course", "calculate mean", "combine result table"]
        },
        "35-groupby-code": {
          title: "Average Points by Course"
        },
        "36-groupby-agg": {
          title: "Multiple Aggregations at Once"
        },
        "37-value-counts": {
          title: "`value_counts()` as a Frequency Table"
        },
        "38-merge": {
          title: "Merge Is the pandas Version of JOIN"
        },
        "39-apply-careful": {
          title: "`apply()` Is Not the First Choice",
          points: [
            "first look for a vectorized pandas expression",
            "`apply()` can be readable for simple custom logic",
            "on large data it is often much slower than a vectorized operation"
          ]
        },
        "40-visualization-section": {
          title: "Visualization",
          subtitle: "A chart should answer a concrete question."
        },
        "41-bar-chart": {
          title: "Bar Chart: Comparing Categories",
          code: {
            code: `import matplotlib.pyplot as plt

average_by_course.plot(kind="bar")
plt.ylabel("Average points")
plt.title("Average by course")
plt.tight_layout()
plt.show()`
          }
        },
        "42-histogram": {
          title: "Histogram: Distribution of Values",
          code: {
            code: `df["points"].plot(kind="hist", bins=10)
plt.xlabel("Points")
plt.title("Point distribution")
plt.show()`
          }
        },
        "43-chart-question": {
          title: "Which Chart Should We Choose?",
          prompt: "We want to compare the average number of points in courses. Is a bar chart, histogram or scatter plot more suitable?"
        },
        "44-sql-to-pandas": {
          title: "A DataFrame Can Also Come from SQL",
          body: "Data stored in a database can be loaded directly into pandas and then analyzed."
        },
        "45-demo-next": {
          title: "Demo: CSV -> Question -> Answer",
          points: [
            "load CSV with `read_csv`",
            "check `head`, `shape`, `info`",
            "filter one course",
            "use `groupby`",
            "draw one simple chart",
            "next topic: getting data from the web"
          ]
        }
      }
    }
  }
} satisfies Lecture;
