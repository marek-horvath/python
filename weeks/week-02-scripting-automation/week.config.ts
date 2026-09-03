import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 2,
  slug: "02-skriptovanie-automatizacia",
  folder: "weeks/week-02-scripting-automation",
  title: "Skriptovanie a automatizácia",
  shortTitle: "Skriptovanie",
  description:
    "Praktická práca so súbormi, adresármi, textom, dátovými formátmi a operačným systémom.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prezentáciu",
      href: "/prednasky/02-skriptovanie-automatizacia/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 02",
      href: "/cvicenia/02-skriptovanie-automatizacia/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: [
    "script ako malý opakovateľný program",
    "čítanie a zápis textových súborov",
    "pathlib a bezpečná práca s cestami",
    "organizácia súborov cez priebežný príklad Downloads",
    "JSON, CSV, string metódy a regulárne výrazy",
    "argumenty príkazového riadku, environment variables a subprocess"
  ],
  learningOutcomes: [
    "navrhnúť jednoduchý script s funkciou main() a jasným vstupom",
    "čítať a zapisovať textové súbory s explicitným encodingom",
    "použiť pathlib na kontrolu, skladanie a vyhľadávanie ciest",
    "spracovať jednoduchý JSON a CSV pomocou štandardnej knižnice",
    "zvoliť medzi string metódami a regex podľa zložitosti problému",
    "použiť argparse, os.getenv a subprocess v jednoduchom automatizačnom scenári"
  ]
} satisfies WeekConfig;

export default config;
