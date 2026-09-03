import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 10,
  slug: "10-web-backend",
  folder: "weeks/week-10-web-backend",
  title: "Web backend v Pythone",
  shortTitle: "Web backend",
  description:
    "Základy tvorby vlastného HTTP API vo FastAPI s validáciou, databázou, testovaním a bezpečnými návykmi.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prednášku",
      href: "/prednasky/10-web-backend/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 10",
      href: "/cvicenia/10-web-backend/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: ["FastAPI", "Pydantic", "routing", "SQLAlchemy", "API testing"],
  learningOutcomes: [
    "vytvoriť jednoduchú FastAPI aplikáciu",
    "použiť path parameters, query parameters a request body",
    "validovať vstupné dáta cez Pydantic",
    "prepojiť endpoint s databázovou vrstvou",
    "vysvetliť základné bezpečnostné a deployment rozdiely medzi development a production"
  ]
} satisfies WeekConfig;

export default config;
