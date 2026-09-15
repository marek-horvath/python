import { weeks } from "./weeks";

export type ExerciseStatus = "planned" | "published";

export type Exercise = {
  number: number;
  weekNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  status: ExerciseStatus;
  href: string;
  taskCount?: number;
  starterPath?: string;
  solutionPath?: string;
  translations?: {
    en?: {
      title?: string;
      subtitle?: string;
      description?: string;
      duration?: string;
    };
  };
};

export const exercises: Exercise[] = [
  {
    number: 1,
    weekNumber: 1,
    slug: "01-uvod-ku-pythonu-v-praxi",
    title: "Cvičenie 01",
    subtitle: "Úvod ku Pythonu v praxi",
    description: "Lab k dátovým štruktúram, transformácii dát, funkciám, type hints a dataclass.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/01-uvod-ku-pythonu-v-praxi/",
    taskCount: 10,
    starterPath: "exercises/exercise-01/",
    solutionPath: "solutions/exercise-01/",
    translations: {
      en: {
        title: "Exercise 01",
        subtitle: "Introduction to Python in Practice",
        description: "A lab on data structures, data transformation, functions, type hints and dataclass.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 2,
    weekNumber: 2,
    slug: "02-skriptovanie-automatizacia",
    title: "Cvičenie 02",
    subtitle: "Skriptovanie a automatizácia",
    description: "Praktický file organizer, JSON/CSV konfigurácia, textové logy, CLI argumenty a dry-run.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/02-skriptovanie-automatizacia/",
    taskCount: 10,
    starterPath: "exercises/exercise-02/",
    solutionPath: "solutions/exercise-02/",
    translations: {
      en: {
        title: "Exercise 02",
        subtitle: "Scripting and Automation",
        description: "A practical file organizer, JSON/CSV configuration, text logs, CLI arguments and dry-run.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 3,
    weekNumber: 3,
    slug: "03-gui-event-driven",
    title: "Cvičenie 03",
    subtitle: "GUI a event-driven programovanie",
    description: "Postupná tvorba Tkinter/ttk aplikácie Text Analyzer s callbackmi, stavom, súborovým dialógom a Canvas.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/03-gui-event-driven/",
    taskCount: 10,
    starterPath: "exercises/exercise-03/",
    solutionPath: "solutions/exercise-03/",
    translations: {
      en: {
        title: "Exercise 03",
        subtitle: "GUI and Event-Driven Programming",
        description: "Incremental development of a Tkinter/ttk Text Analyzer with callbacks, state, file dialog and Canvas.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 4,
    weekNumber: 4,
    slug: "04-testovanie-debugging-kvalita",
    title: "Cvičenie 04",
    subtitle: "Testovanie, debugging a kvalita kódu",
    description: "Malý starter projekt s úmyselnými chybami: pytest, edge cases, regression testy, tmp_path, logging a Ruff.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/04-testovanie-debugging-kvalita/",
    taskCount: 10,
    starterPath: "exercises/exercise-04/",
    solutionPath: "solutions/exercise-04/",
    translations: {
      en: {
        title: "Exercise 04",
        subtitle: "Testing, Debugging and Code Quality",
        description: "A small starter project with intentional bugs: pytest, edge cases, regression tests, tmp_path, logging and Ruff.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 5,
    weekNumber: 5,
    slug: "05-http-api",
    title: "Cvičenie 05",
    subtitle: "Internet, HTTP a API",
    description: "HTTPX klient pre verejné API, query params, JSON, dataclass, timeout a error handling.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/05-http-api/",
    taskCount: 10,
    starterPath: "exercises/exercise-05/",
    solutionPath: "solutions/exercise-05/",
    translations: {
      en: {
        title: "Exercise 05",
        subtitle: "Internet, HTTP and APIs",
        description: "An HTTPX client for a public API, query params, JSON, dataclass, timeout and error handling.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 6,
    weekNumber: 6,
    slug: "06-databazy",
    title: "Cvičenie 06",
    subtitle: "Databázy v Pythone",
    description: "SQLite databáza, parametrizované dotazy, JOIN, transakcie a základný SQLAlchemy ORM model.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/06-databazy/",
    taskCount: 10,
    starterPath: "exercises/exercise-06/",
    solutionPath: "solutions/exercise-06/",
    translations: {
      en: {
        title: "Exercise 06",
        subtitle: "Databases in Python",
        description: "SQLite database, parameterized queries, JOIN, transactions and a basic SQLAlchemy ORM model.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 7,
    weekNumber: 7,
    slug: "07-data-science",
    title: "Cvičenie 07",
    subtitle: "Data Science v Pythone",
    description: "pandas workflow nad datasetom výsledkov: preskúmanie, cleaning, filtering, groupby, merge a grafy.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/07-data-science/",
    taskCount: 10,
    starterPath: "exercises/exercise-07/",
    solutionPath: "solutions/exercise-07/",
    translations: {
      en: {
        title: "Exercise 07",
        subtitle: "Data Science in Python",
        description: "pandas workflow over a results dataset: inspection, cleaning, filtering, groupby, merge and charts.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 8,
    weekNumber: 8,
    slug: "08-web-scraping-browser",
    title: "Cvičenie 08",
    subtitle: "Web scraping a automatizácia prehliadača",
    description: "Lokálny HTML katalóg, BeautifulSoup parser, pagination, HTTPX a jednoduchá Playwright interakcia.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/08-web-scraping-browser/",
    taskCount: 10,
    starterPath: "exercises/exercise-08/",
    solutionPath: "solutions/exercise-08/",
    translations: {
      en: {
        title: "Exercise 08",
        subtitle: "Web Scraping and Browser Automation",
        description: "A local HTML catalog, BeautifulSoup parser, pagination, HTTPX and a simple Playwright interaction.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 9,
    weekNumber: 9,
    slug: "09-bezpecne-programovanie",
    title: "Cvičenie 09",
    subtitle: "Bezpečné programovanie v Pythone",
    description: "Security cleanup problematického Python projektu: SQL, subprocess, secrets, paths, pickle a Bandit.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/09-bezpecne-programovanie/",
    taskCount: 10,
    starterPath: "exercises/exercise-09/",
    solutionPath: "solutions/exercise-09/",
    translations: {
      en: {
        title: "Exercise 09",
        subtitle: "Secure Programming in Python",
        description: "Security cleanup of a problematic Python project: SQL, subprocess, secrets, paths, pickle and Bandit.",
        duration: "approximately 90 min"
      }
    }
  },
  {
    number: 10,
    weekNumber: 10,
    slug: "10-web-backend",
    title: "Cvičenie 10",
    subtitle: "Web backend v Pythone",
    description: "FastAPI Notes API s Pydantic modelmi, SQLite/SQLAlchemy, status kódmi, validáciou a API testami.",
    duration: "približne 90 minút",
    status: "published",
    href: "/cvicenia/10-web-backend/",
    taskCount: 10,
    starterPath: "exercises/exercise-10/",
    solutionPath: "solutions/exercise-10/",
    translations: {
      en: {
        title: "Exercise 10",
        subtitle: "Web Backends in Python",
        description: "A FastAPI Notes API with Pydantic models, SQLite/SQLAlchemy, status codes, validation and API tests.",
        duration: "approximately 90 min"
      }
    }
  }
];

export function getExerciseBySlug(slug: string) {
  return exercises.find((exercise) => exercise.slug === slug);
}

export function getExerciseSummary() {
  return weeks.map((week) => ({
    week,
    exercise: exercises.find((exercise) => exercise.weekNumber === week.number)
  }));
}
