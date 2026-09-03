import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 6,
  slug: "06-databazy",
  folder: "weeks/week-06-databases",
  title: "Databázy v Pythone",
  shortTitle: "Databázy",
  description:
    "Praktická práca s SQLite, SQL dotazmi, transakciami a základmi SQLAlchemy v Python aplikácii.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prednášku",
      href: "/prednasky/06-databazy/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 06",
      href: "/cvicenia/06-databazy/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: ["SQLite", "SQL", "transakcie", "constraints", "SQLAlchemy"],
  learningOutcomes: [
    "rozhodnúť, kedy použiť databázu namiesto CSV alebo JSON",
    "vytvoriť jednoduchú SQLite databázu z Pythonu",
    "použiť parametrizované SQL dotazy",
    "vysvetliť význam transakcie a `commit`",
    "vytvoriť základný SQLAlchemy model a použiť `Session`"
  ]
} satisfies WeekConfig;

export default config;
