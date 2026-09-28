import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 3,
  slug: "03-gui-event-driven",
  folder: "weeks/week-03-gui-event-driven",
  title: "GUI a event-driven programovanie",
  shortTitle: "GUI",
  description:
    "Postupná tvorba malej Tkinter aplikácie cez udalosti, callbacky, widgety a oddelený stav úloh.",
  status: "published",
  lectureAvailable: true,
  lectureDuration: "90 minút",
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prezentáciu",
      href: "/prednasky/03-gui-event-driven/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 03",
      href: "/cvicenia/03-gui-event-driven/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: [
    "prechod od terminálového programu k GUI aplikácii",
    "event loop, udalosť a callback",
    "základy Tkinter: okno, Label, Entry, Button a Listbox",
    "rozloženie prvkov cez grid()",
    "command, bind() a reakcia na kláves Enter",
    "dátový stav aplikácie a obnova zobrazenia",
    "pridanie, prepínanie a odstránenie úloh"
  ],
  learningOutcomes: [
    "vysvetliť rozdiel medzi lineárnym programom a event-driven aplikáciou",
    "vytvoriť jednoduché Tkinter okno s event loopom",
    "použiť základné widgety a rozložiť ich cez grid()",
    "pripojiť callback cez command a bind()",
    "čítať a validovať vstup z Entry",
    "pracovať s výberom v Listbox bez predpokladu, že položka je označená",
    "udržať zhodu medzi dátovým zoznamom a obsahom okna"
  ]
} satisfies WeekConfig;

export default config;
