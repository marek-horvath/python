import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 7,
  slug: "07-data-science",
  folder: "weeks/week-07-data-science",
  title: "Data Science v Pythone",
  shortTitle: "Data Science",
  description:
    "Praktický úvod do dátového workflow v Pythone: NumPy, pandas, Jupyter a základná vizualizácia.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prednášku",
      href: "/prednasky/07-data-science/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 07",
      href: "/cvicenia/07-data-science/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: ["Jupyter", "NumPy", "pandas", "GroupBy", "Matplotlib"],
  learningOutcomes: [
    "načítať a skontrolovať tabuľkové dáta v pandas",
    "použiť NumPy array, slicing, masky a agregácie",
    "filtrovať a transformovať DataFrame",
    "vypočítať agregácie cez `groupby`",
    "vytvoriť jednoduchú a čitateľnú vizualizáciu dát"
  ]
} satisfies WeekConfig;

export default config;
