import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 1,
  slug: "01-uvod-ku-pythonu",
  folder: "weeks/week-01-uvod-ku-pythonu",
  title: "Úvod ku Pythonu",
  shortTitle: "Úvod ku Pythonu",
  description:
    "Pracovný úvod do predmetu a do moderného Pythonu pre študentov, ktorí už poznajú základy programovania.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prezentáciu",
      href: "/prednasky/01-uvod-ku-pythonu/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 01",
      href: "/cvicenia/01-uvod-ku-pythonu-v-praxi/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: [
    "Python ako general-purpose jazyk",
    "object model, mutability a dátové štruktúry",
    "pythonic iteration, slicing, unpacking a comprehensions",
    "funkcie, type hints, dataclass, exceptions a importy",
    "základný workflow s virtual environment"
  ],
  learningOutcomes: [
    "rozlíšiť syntaktickú jednoduchosť Pythonu od jeho idiomatických pravidiel",
    "vysvetliť rozdiel medzi menom, objektom a mutabilitou",
    "použiť idiomatické iterovanie, slicing, unpacking a comprehensions",
    "rozpoznať časté chyby pri funkciách a exceptions",
    "vytvoriť jednoduché izolované Python prostredie"
  ]
} satisfies WeekConfig;

export default config;
