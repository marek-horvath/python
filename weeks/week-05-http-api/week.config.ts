import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 5,
  slug: "05-http-api",
  folder: "weeks/week-05-http-api",
  title: "Internet, HTTP a API",
  shortTitle: "HTTP a API",
  description:
    "Ako Python komunikuje so službami cez HTTP, ako čítať API dokumentáciu a ako spracovať odpovede bezpečne a prakticky.",
  status: "published",
  lectureAvailable: true,
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
    "Python program ako HTTP client",
    "client-server model, URL, request a response",
    "HTTP methods a status codes",
    "JSON ako bežný formát API odpovedí",
    "HTTPX: GET, params, headers, POST a Client",
    "error handling, timeout, connection problems a rate limiting",
    "API keys cez environment variables",
    "REST, dokumentácia API, pagination a async teaser",
    "API verzus web scraping"
  ],
  learningOutcomes: [
    "vysvetliť základný HTTP request/response model",
    "rozložiť URL na scheme, host, path a query parameters",
    "zavolať REST API cez HTTPX a spracovať JSON odpoveď",
    "použiť query params, headers a JSON body",
    "ošetriť status code, HTTP chyby a timeout",
    "rozlíšiť HTTP chybu od connection problému",
    "vysvetliť API key, rate limit, pagination a základ REST",
    "rozhodnúť, kedy použiť API namiesto web scrapingu"
  ]
} satisfies WeekConfig;

export default config;
