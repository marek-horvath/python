import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 3,
  slug: "03-gui-event-driven",
  folder: "weeks/week-03-gui-event-driven",
  title: "GUI a event-driven programovanie",
  shortTitle: "GUI",
  description:
    "Základné princípy používateľských rozhraní, udalostí, stavov aplikácie a reakcií na vstup používateľa.",
  status: "published",
  lectureAvailable: true,
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
    "event loop, event, callback a stav aplikácie",
    "základy Tkinter a ttk: okno, Label, Entry, Button",
    "layout cez pack() a grid()",
    "dialogs, validácia vstupu a praktické exceptions v GUI",
    "oddelenie GUI callbackov od aplikačnej logiky",
    "Canvas, súradnice, kliknutie a jednoduché časované udalosti"
  ],
  learningOutcomes: [
    "vysvetliť rozdiel medzi lineárnym programom a event-driven aplikáciou",
    "vytvoriť jednoduché Tkinter okno s event loopom",
    "použiť ttk widgety, callbacky a základný layout",
    "čítať vstup z Entry a aktualizovať UI podľa udalosti",
    "oddeliť aplikačnú logiku od GUI callbacku",
    "použiť filedialog, messagebox a základné ošetrenie chýb",
    "vysvetliť, prečo dlhý callback alebo time.sleep() blokuje GUI"
  ]
} satisfies WeekConfig;

export default config;
