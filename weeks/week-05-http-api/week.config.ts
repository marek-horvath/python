import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 5,
  slug: "05-http-api",
  folder: "weeks/week-05-http-api",
  title: "Internet, HTTP a API",
  shortTitle: "HTTP a API",
  description:
    "Od URL a HTTP požiadavky k programu, ktorý cez dve Open-Meteo API nájde mesto a zobrazí aktuálne počasie.",
  status: "published",
  lectureAvailable: true,
  lectureDuration: "90 minút",
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prezentáciu",
      href: "/prednasky/05-http-api/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 05",
      href: "/cvicenia/05-http-api/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: [
    "internet, web a client-server model",
    "URL, HTTP request, response, hlavičky a status codes",
    "GET požiadavky cez knižnicu requests",
    "query parameters, timeout a raise_for_status()",
    "JSON odpoveď a mapovanie na Python objekty",
    "geocoding mesta cez Open-Meteo Geocoding API",
    "prepojenie geocoding a weather API",
    "ošetrenie prázdnych dát, HTTP a sieťových chýb",
    "rozdiel medzi GET a POST"
  ],
  learningOutcomes: [
    "vysvetliť client-server model a priebeh HTTP komunikácie",
    "rozložiť URL na scheme, host, path a query parameters",
    "rozlíšiť status, hlavičky a telo HTTP odpovede",
    "odoslať GET požiadavku cez requests s params a timeout",
    "skontrolovať status cez raise_for_status()",
    "spracovať JSON odpoveď a bezpečne čítať vnorené hodnoty",
    "prepojiť výstup jedného API so vstupom druhého",
    "rozlíšiť nenájdené dáta, HTTP chybu a problém siete",
    "čítať API dokumentáciu podľa endpointu, parametrov a odpovede"
  ]
} satisfies WeekConfig;

export default config;
