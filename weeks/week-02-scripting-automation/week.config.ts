import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 2,
  slug: "02-skriptovanie-automatizacia",
  folder: "weeks/week-02-scripting-automation",
  title: "Skriptovanie a automatizácia",
  shortTitle: "Skriptovanie",
  description:
    "Postupná tvorba bezpečného organizátora súborov cez pathlib, dry-run a príkazový riadok.",
  status: "published",
  lectureAvailable: true,
  lectureDuration: "90 minút",
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
    "relatívne cesty a aktuálny pracovný priečinok",
    "pathlib a bezpečná práca so súbormi a adresármi",
    "dry-run, kolízie a explicitné vykonanie zmien",
    "organizácia súborov podľa normalizovanej prípony",
    "argumenty príkazového riadku cez argparse"
  ],
  learningOutcomes: [
    "spustiť Python script s explicitným vstupom z príkazového riadku",
    "použiť pathlib na skladanie ciest a rozlíšenie súborov od priečinkov",
    "normalizovať príponu a bezpečne určiť cieľovú cestu",
    "navrhnúť dry-run ako predvolený režim hromadnej zmeny",
    "ošetriť chýbajúci vstup a kolíziu cieľového súboru",
    "použiť argparse s povinným argumentom a prepínačom --vykonat"
  ]
} satisfies WeekConfig;

export default config;
