import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 9,
  slug: "09-bezpecne-programovanie",
  folder: "weeks/week-09-security",
  title: "Bezpečné programovanie v Pythone",
  shortTitle: "Bezpečnosť",
  description:
    "Praktické bezpečnostné návyky pri práci so vstupmi, SQL, subprocess, súbormi, secrets, závislosťami a logmi.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prednášku",
      href: "/prednasky/09-bezpecne-programovanie/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 09",
      href: "/cvicenia/09-bezpecne-programovanie/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: ["validation", "SQL injection", "subprocess", "secrets", "dependency security"],
  learningOutcomes: [
    "rozpoznať nedôveryhodné vstupy v bežnom Python programe",
    "použiť parametrizované SQL dotazy",
    "vyhnúť sa rizikovému `shell=True`, `eval`, `exec` a nedôveryhodnému pickle",
    "pracovať so secrets mimo source code",
    "vysvetliť rozdiel medzi hashing, encryption a encoding"
  ]
} satisfies WeekConfig;

export default config;
