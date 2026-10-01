import type { Lecture, LectureSlide } from "../../shared/slide.types";

type SlideSpec = readonly [
  id: string,
  type: LectureSlide["type"],
  skTitle: string,
  enTitle: string
];

const specs: SlideSpec[] = [
  ["01-title", "title", "Internet, HTTP a API", "Internet, HTTP and APIs"],
  ["02-program", "code", "Čo bude náš program robiť", "What will our program do?"],
  ["03-data-location", "compare", "Kde sa nachádzajú údaje?", "Where is the data?"],
  ["04-internet-web", "compare", "Internet a web nie sú synonymá", "The internet and the web are not synonyms"],
  ["05-client", "diagram", "Python skript je klient", "A Python script is a client"],
  ["06-request-flow", "diagram", "Čo sa deje pri otvorení adresy", "What happens when an address is opened"],
  ["07-url", "table", "URL má pomenované časti", "A URL has named parts"],
  ["08-query", "compare", "Parametre menia požiadavku na rovnaký endpoint", "Parameters change a request to the same endpoint"],
  ["09-url-building", "compare", "URL neskladáme ručne", "Do not build URLs by hand"],
  ["10-request", "code", "HTTP požiadavka má metódu, cieľ a hlavičky", "An HTTP request has a method, target and headers"],
  ["11-response", "code", "HTTP odpoveď oddeľuje stav, hlavičky a telo", "An HTTP response separates status, headers and body"],
  ["12-status", "code", "Stavový kód je výsledok na úrovni HTTP", "A status code is the result at the HTTP level"],
  ["13-content-type", "compare", "Hlavička opisuje formát tela", "A header describes the body format"],
  ["14-page-api", "compare", "Webová stránka a API slúžia iným klientom", "A web page and an API serve different clients"],
  ["15-requests", "code", "requests je externá knižnica", "requests is an external library"],
  ["16-first-get", "code", "Prvá požiadavka GET", "The first GET request"],
  ["17-response-object", "table", "Objekt response drží viac pohľadov na odpoveď", "The response object provides several views of the response"],
  ["18-timeout", "split-code", "Timeout obmedzuje čakanie na sieť", "A timeout bounds network waiting"],
  ["19-params", "code", "Parametre odovzdáme cez params", "Pass parameters through params"],
  ["20-http-error", "code", "Úspešné spojenie nemusí znamenať úspešnú požiadavku", "A successful connection does not imply a successful request"],
  ["21-first-script", "code", "Celý prvý skript", "The complete first script"],
  ["22-json", "code", "JSON je text s dohodnutou štruktúrou", "JSON is text with an agreed structure"],
  ["23-json-python", "table", "JSON hodnoty sa mapujú na Python objekty", "JSON values map to Python objects"],
  ["24-response-json", "code", ".json() parsuje telo odpovede", ".json() parses the response body"],
  ["25-nested-data", "code", "K vnoreným údajom pristupujeme po vrstvách", "Access nested data one layer at a time"],
  ["26-multiple-results", "code", "Rovnaký názov môže mať viac miest", "The same name can match multiple places"],
  ["27-empty-results", "code", "Keď sa mesto nenájde, [0] nie je bezpečné", "When a city is not found, [0] is unsafe"],
  ["28-check-results", "compare", "Obsah odpovede kontrolujeme explicitne", "Check response content explicitly"],
  ["29-find-city", "code", "Funkcia najdi_mesto() uzavrie prvú požiadavku", "find_city() encapsulates the first request"],
  ["30-chain", "diagram", "Výstup prvého API je vstup druhého", "The first API output becomes the second API input"],
  ["31-weather-request", "code", "Druhá požiadavka žiada aktuálne počasie", "The second request asks for current weather"],
  ["32-weather-response", "code", "Odpoveď počasia: relevantný výrez", "Weather response: the relevant excerpt"],
  ["33-units", "table", "Hodnota bez jednotky nestačí", "A value without a unit is not enough"],
  ["34-output", "split-code", "Zo surových dát vytvoríme používateľský výstup", "Turn raw data into user-facing output"],
  ["35-get-weather", "code", "Funkcia ziskaj_pocasie() rieši druhú požiadavku", "get_weather() handles the second request"],
  ["36-whole-program", "split-code", "Celý priebeh programu", "The complete program flow"],
  ["37-failures", "table", "Tri odlišné neúspechy", "Three distinct failures"],
  ["38-exceptions", "code", "Sieťové a HTTP chyby ošetrujeme konkrétne", "Handle network and HTTP failures specifically"],
  ["39-validation", "diagram", "HTTP 200 je iba prvá kontrola", "HTTP 200 is only the first check"],
  ["40-limits", "compare", "API môže obmedziť alebo overovať klienta", "An API may limit or authenticate a client"],
  ["41-get-post", "split-code", "GET číta, POST môže vytvárať", "GET reads; POST may create"],
  ["42-find-bug", "question", "Nájdite chybu v spracovaní odpovede", "Find the response-processing bug"],
  ["43-documentation", "takeaway", "Čo treba zistiť z dokumentácie API", "What to learn from API documentation"],
  ["44-recap", "takeaway", "Od požiadavky k použiteľnému výsledku", "From a request to a useful result"]
];

const slides: LectureSlide[] = specs.map(([id, type, title]) => ({
  id,
  type,
  title
}));

const englishSlides = Object.fromEntries(
  specs.map(([id, , , title]) => [id, { title }])
);

export const lecture05 = {
  weekNumber: 5,
  slug: "05-http-api",
  title: "Internet, HTTP a API",
  description:
    "Od URL a HTTP požiadavky k programu, ktorý cez dve Open-Meteo API nájde mesto a zobrazí aktuálne počasie.",
  duration: "90 minút",
  slides,
  translations: {
    en: {
      title: "Internet, HTTP and APIs",
      description:
        "From URLs and HTTP requests to a program that finds a city and displays current weather through two Open-Meteo APIs.",
      duration: "90 minutes",
      slides: englishSlides
    }
  }
} satisfies Lecture;
