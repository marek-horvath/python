import type { WeekConfig } from "../../shared/week.types";

const config = {
  number: 8,
  slug: "08-web-scraping-browser",
  folder: "weeks/week-08-web-scraping-browser",
  title: "Web scraping a automatizácia prehliadača",
  shortTitle: "Web scraping",
  description:
    "Získavanie dát z HTML stránok, parsovanie cez BeautifulSoup a automatizácia dynamických webov cez Playwright.",
  status: "published",
  lectureAvailable: true,
  exerciseAvailable: true,
  materials: [
    {
      label: "Prezerať prednášku",
      href: "/prednasky/08-web-scraping-browser/",
      type: "viewer",
      public: true
    },
    {
      label: "Cvičenie 08",
      href: "/cvicenia/08-web-scraping-browser/",
      type: "exercise",
      public: true
    }
  ],
  plannedFocus: ["HTTPX", "BeautifulSoup", "CSS selectors", "pagination", "Playwright"],
  learningOutcomes: [
    "rozlíšiť API, statický scraping a browser automation",
    "získať HTML cez HTTPX a spracovať chyby requestu",
    "extrahovať dáta z HTML cez BeautifulSoup a CSS selectors",
    "oddeliť download, parsing a export dát",
    "rozhodnúť, kedy použiť Playwright namiesto statického scrapingu"
  ]
} satisfies WeekConfig;

export default config;
