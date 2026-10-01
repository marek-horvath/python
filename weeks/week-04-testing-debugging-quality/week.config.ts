import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 4,
  slug: "04-testovanie-debugging-kvalita",
  folder: "weeks/week-04-testing-debugging-quality",
  title: "Testovanie, debugging a kvalita kódu",
  shortTitle: "Testovanie",
  description:
    "Systematické hľadanie chyby v TODO aplikácii, automatické testy cez unittest a oddelenie dátovej logiky od GUI.",
  status: "published",
  lectureAvailable: true,
  lectureDuration: "90 minút",
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
    "reprodukovateľný opis chyby, expected a actual výsledok",
    "rozdiel medzi výnimkou a logickou chybou",
    "diagnostika cez print, traceback, breakpoint a pdb",
    "automatické testy cez unittest a TestCase",
    "hraničné prípady a izolácia testov cez setUp",
    "testovanie pridania, prepnutia a odstránenia úlohy",
    "oddelenie dátových pravidiel od Tkinter callbackov"
  ],
  learningOutcomes: [
    "zapísať presný a reprodukovateľný bug report",
    "čítať traceback a preskúmať stav programu v pdb",
    "napísať a spustiť unittest test s konkrétnym očakávaním",
    "navrhnúť testy pre bežné aj hraničné vstupy",
    "overiť, že neplatný index nemení dáta",
    "vysvetliť význam izolácie testov a metódy setUp",
    "oddeliť testovateľné funkcie nad dátami od GUI vrstvy"
  ]
} satisfies WeekConfig;

export default config;
