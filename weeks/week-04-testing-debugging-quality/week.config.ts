import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 4,
  slug: "04-testovanie-debugging-kvalita",
  folder: "weeks/week-04-testing-debugging-quality",
  title: "Testovanie, debugging a kvalita kódu",
  shortTitle: "Testovanie",
  description:
    "Praktiky, ktoré pomáhajú písať udržiavateľný Python: testy, debugging, typy, linting a čitateľná štruktúra.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prezentáciu",
      href: "/prednasky/04-testovanie-debugging-kvalita/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 04",
      href: "/cvicenia/04-testovanie-debugging-kvalita/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: [
    "manuálne skúšanie verzus reprodukovateľný test",
    "pytest, assert, test discovery a výstup testov",
    "edge cases, parametrizované testy, exceptions a fixtures",
    "testovanie súborových operácií cez tmp_path",
    "oddelenie GUI logiky od testovateľnej business logiky",
    "debugger, traceback a logging",
    "Ruff, formatting, linting a stručný static type checking"
  ],
  learningOutcomes: [
    "napísať jednoduchý pytest test s assert",
    "navrhnúť viac testovacích prípadov vrátane edge cases",
    "použiť pytest.raises, parametrize a jednoduchú fixture",
    "otestovať funkciu pracujúcu so súborom cez tmp_path",
    "čítať základný traceback a určiť miesto chyby",
    "rozlíšiť print debugging, debugger a logging",
    "vysvetliť rozdiel medzi formatterom, linterom, type checkerom a testami"
  ]
} satisfies WeekConfig;

export default config;
