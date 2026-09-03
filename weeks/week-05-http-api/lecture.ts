import type { Lecture } from "../../shared/slide.types";

export const lecture05 = {
  weekNumber: 5,
  slug: "05-http-api",
  title: "Internet, HTTP a API",
  description: "Request/response model, HTTPX, JSON, chyby, timeouty a práca s verejným API v Pythone.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Internet, HTTP a API"
    },
    {
      id: "02-local-vs-remote",
      type: "statement",
      title: "Program môže pracovať s dátami mimo počítača",
      body: "Python aplikácia môže byť klient služby: pošle request, dostane response a preloží odpoveď na bežné Python dáta.",
      points: [
        "JSON zo skriptovania teraz čítame ako API response",
        "exceptions a testovanie z minulého týždňa použijeme na sieťové chyby",
        "program sa musí správať rozumne aj vtedy, keď služba neodpovie"
      ]
    },
    {
      id: "03-client-server-model",
      type: "diagram",
      title: "Client - request - server - response",
      diagramItems: ["Python client", "HTTP request", "API server", "HTTP response", "Python object"]
    },
    {
      id: "04-client-question",
      type: "question",
      title: "Kto je client?",
      prompt: "Spustíme Python script, ktorý volá verejné API. Je client browser, terminál alebo náš program?"
    },
    {
      id: "05-url-section",
      type: "section",
      title: "HTTP request",
      subtitle: "URL, method, headers a body tvoria kontrakt medzi klientom a serverom."
    },
    {
      id: "06-url-parts",
      type: "table",
      title: "URL má štruktúru",
      table: {
        headers: ["Časť", "Príklad", "Význam"],
        rows: [
          ["scheme", "<code>https</code>", "ako komunikujeme"],
          ["host", "<code>api.example.com</code>", "kam sa pripájame"],
          ["path", "<code>/users/42</code>", "ktorý resource žiadame"],
          ["query", "<code>?active=true</code>", "parametre requestu"]
        ]
      }
    },
    {
      id: "07-request-parts",
      type: "table",
      title: "Časti requestu",
      table: {
        headers: ["Časť", "Praktický význam"],
        rows: [
          ["method", "operácia: načítať, vytvoriť, upraviť, odstrániť"],
          ["URL", "adresa resource alebo endpointu"],
          ["headers", "metadata requestu"],
          ["body", "dáta posielané na server"],
          ["timeout", "ako dlho je klient ochotný čakať"]
        ]
      }
    },
    {
      id: "08-response-parts",
      type: "table",
      title: "Časti response",
      table: {
        headers: ["Časť", "Praktický význam"],
        rows: [
          ["status code", "výsledok requestu na úrovni HTTP"],
          ["headers", "metadata odpovede, napríklad content type"],
          ["body", "samotné dáta, často JSON"],
          ["encoding", "ako interpretovať textový obsah"]
        ]
      }
    },
    {
      id: "09-methods",
      type: "table",
      title: "HTTP methods",
      table: {
        headers: ["Method", "Typické použitie", "Poznámka"],
        rows: [
          ["GET", "načítať dáta", "bez zmeny stavu na serveri"],
          ["POST", "vytvoriť alebo odoslať dáta", "nie je všeobecne idempotentný"],
          ["PUT", "nahradiť resource", "typicky idempotentný"],
          ["PATCH", "upraviť časť resource", "závisí od API"],
          ["DELETE", "odstrániť resource", "typicky idempotentný efekt"]
        ]
      }
    },
    {
      id: "10-idempotency",
      type: "statement",
      title: "Idempotency je vlastnosť opakovaného volania",
      body: "Operácia je idempotentná, ak opakované rovnaké volanie nemá ďalší odlišný efekt oproti jednému volaniu.",
      points: [
        "GET by nemal meniť stav",
        "opakovaný POST môže vytvoriť duplicitu",
        "pri retry logike záleží na metóde aj konkrétnom API"
      ]
    },
    {
      id: "11-status-families",
      type: "table",
      title: "Status code families",
      table: {
        headers: ["Skupina", "Význam"],
        rows: [
          ["2xx", "request bol úspešne spracovaný"],
          ["3xx", "presmerovanie"],
          ["4xx", "klient poslal neplatnú alebo nepovolenú požiadavku"],
          ["5xx", "server request nezvládol spracovať"]
        ]
      }
    },
    {
      id: "12-common-statuses",
      type: "code",
      title: "Kódy, ktoré uvidíte často",
      code: {
        language: "text",
        label: "status codes",
        code: `200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
429 Too Many Requests
500 Internal Server Error`
      }
    },
    {
      id: "13-status-question",
      type: "question",
      title: "Čo znamená 404?",
      prompt: "Je to chyba siete, pád servera alebo odpoveď servera na konkrétnu URL?"
    },
    {
      id: "14-json-section",
      type: "section",
      title: "JSON ako reprezentácia dát",
      subtitle: "API často neposiela Python objekt, ale text serializovaný ako JSON."
    },
    {
      id: "15-json-response",
      type: "split-code",
      title: "JSON response a Python dict",
      codeBlocks: [
        {
          language: "text",
          label: "response body",
          code: `{
  "city": "Kosice",
  "temperature": 22.4,
  "wind_speed": 11.2
}`
        },
        {
          language: "python",
          label: "Python",
          runnable: true,
          code: `data = {
    "city": "Kosice",
    "temperature": 22.4,
    "wind_speed": 11.2,
}

print(data["temperature"])`
        }
      ]
    },
    {
      id: "16-serialization",
      type: "statement",
      title: "Serialization prekladá objekt na prenosový formát",
      body: "Medzi procesmi a systémami neposielame priamo Python objekty. Posielame text alebo bytes v dohodnutom formáte.",
      points: [
        "JSON je čitateľný a široko podporovaný",
        "typy sa mapujú medzi ekosystémami",
        "po prijatí odpovede stále validujeme, či má očakávaný tvar"
      ]
    },
    {
      id: "17-httpx-section",
      type: "section",
      title: "HTTPX",
      subtitle: "Praktická knižnica pre HTTP klientov v Pythone."
    },
    {
      id: "18-first-request",
      type: "code",
      title: "Prvý GET request",
      body: "`httpx.get()` vráti response objekt, nie iba text.",
      code: {
        language: "python",
        label: "first_request.py",
        runnable: false,
        highlightLines: [3, 5, 6],
        code: `import httpx

response = httpx.get("https://api.github.com/users/octocat")

print(response.status_code)
print(response.headers["content-type"])
print(response.json()["login"])`
      }
    },
    {
      id: "19-response-object",
      type: "table",
      title: "Response objekt",
      table: {
        headers: ["Vlastnosť/metóda", "Význam"],
        rows: [
          ["<code>status_code</code>", "číselný HTTP status"],
          ["<code>headers</code>", "metadata odpovede"],
          ["<code>text</code>", "body ako text"],
          ["<code>content</code>", "body ako bytes"],
          ["<code>json()</code>", "JSON body ako Python dáta"],
          ["<code>raise_for_status()</code>", "výnimka pri 4xx alebo 5xx"]
        ]
      }
    },
    {
      id: "20-query-params",
      type: "split-code",
      title: "Query parameters neskladajte ručne",
      codeBlocks: [
        {
          language: "python",
          label: "krehké",
          variant: "bad",
          runnable: false,
          code: `url = (
    "https://api.example.com/search"
    "?city=Kosice&units=metric"
)
response = httpx.get(url)`
        },
        {
          language: "python",
          label: "params",
          variant: "good",
          runnable: false,
          code: `params = {
    "city": "Kosice",
    "units": "metric",
}

response = httpx.get(url, params=params)`
        }
      ]
    },
    {
      id: "21-query-question",
      type: "question",
      title: "Kam patrí filter?",
      prompt: "Chceme načítať iba aktívnych používateľov: query parameter alebo JSON body?"
    },
    {
      id: "22-headers",
      type: "code",
      title: "Headers nesú metadata",
      body: "Hlavičky často určujú formát, autorizáciu alebo identitu klienta.",
      code: {
        language: "python",
        label: "headers",
        runnable: false,
        code: `headers = {
    "Accept": "application/json",
    "Authorization": f"Bearer {api_key}",
}

response = httpx.get(url, headers=headers)`
      }
    },
    {
      id: "23-post-json",
      type: "code",
      title: "POST s JSON body",
      body: "`json=payload` nastaví body aj vhodný content type.",
      code: {
        language: "python",
        label: "post",
        runnable: false,
        code: `payload = {
    "name": "Anna",
    "points": 92,
}

response = httpx.post(url, json=payload)`
      }
    },
    {
      id: "24-error-section",
      type: "section",
      title: "Chyby a timeouty",
      subtitle: "Sieťový program musí rátať s tým, že veci mimo neho zlyhajú."
    },
    {
      id: "25-check-response",
      type: "split-code",
      title: "Response najprv skontrolujte",
      codeBlocks: [
        {
          language: "python",
          label: "príliš optimistické",
          variant: "bad",
          runnable: false,
          code: `response = httpx.get(url)
data = response.json()
print(data["temperature"])`
        },
        {
          language: "python",
          label: "opatrnejšie",
          variant: "good",
          runnable: false,
          code: `response = httpx.get(url, timeout=5.0)
response.raise_for_status()

data = response.json()
print(data["temperature"])`
        }
      ]
    },
    {
      id: "26-timeout-question",
      type: "question",
      title: "Ako dlho má program čakať?",
      prompt: "Server neodpovedá. Bez timeoutu môže program visieť dlhšie, než je pre používateľa alebo batch job prijateľné.",
      code: {
        language: "python",
        label: "timeout",
        runnable: false,
        code: `response = httpx.get(url, timeout=5.0)`
      }
    },
    {
      id: "27-http-vs-network",
      type: "compare",
      title: "HTTP error a network error",
      columns: [
        {
          title: "HTTP 404 / 500",
          items: ["server odpovedal", "máme status code", "riešime odpoveď API", "môžeme čítať error body"]
        },
        {
          title: "Network / timeout",
          items: ["odpoveď nemusí existovať", "DNS, spojenie, TLS, timeout", "status code nemusí byť dostupný", "riešime transport"]
        }
      ]
    },
    {
      id: "28-http-error-code",
      type: "code",
      title: "Zachytenie HTTPX chýb",
      code: {
        language: "python",
        label: "error handling",
        runnable: false,
        code: `try:
    response = httpx.get(url, timeout=5.0)
    response.raise_for_status()
except httpx.HTTPStatusError as error:
    print(f"HTTP chyba: {error.response.status_code}")
except httpx.RequestError as error:
    print(f"Transport chyba: {error}")`
      }
    },
    {
      id: "29-api-keys",
      type: "split-code",
      title: "API key nepatrí do source code",
      codeBlocks: [
        {
          language: "python",
          label: "problém",
          variant: "bad",
          runnable: true,
          code: `API_KEY = "secret-token"`
        },
        {
          language: "python",
          label: "prostredie",
          variant: "good",
          runnable: true,
          code: `import os

api_key = os.getenv("API_KEY")
if api_key is None:
    print("API_KEY nie je nastavený")`
        }
      ]
    },
    {
      id: "30-rate-limit",
      type: "statement",
      title: "429 Too Many Requests",
      body: "API môže obmedziť počet requestov. Klient má čítať dokumentáciu, rešpektovať limity a neposielať nekonečný loop requestov.",
      points: ["quota", "rate limit", "retry later", "backoff", "cache tam, kde dáva zmysel"]
    },
    {
      id: "31-client-lifecycle",
      type: "code",
      title: "`httpx.Client` pri viacerých requestoch",
      body: "Client drží spoločnú konfiguráciu a vie efektívnejšie pracovať s opakovanými requestmi.",
      code: {
        language: "python",
        label: "Client",
        runnable: false,
        code: `with httpx.Client(
    base_url="https://api.example.com",
    headers={"Accept": "application/json"},
    timeout=5.0,
) as client:
    user = client.get("/users/octocat")
    repos = client.get("/users/octocat/repos")`
      }
    },
    {
      id: "32-weather-section",
      type: "section",
      title: "Priebežný príklad: Weather CLI",
      subtitle: "Malý API klient, ktorý načíta dáta, spracuje JSON a vypíše report."
    },
    {
      id: "33-weather-flow",
      type: "diagram",
      title: "Weather CLI",
      diagramItems: ["city or coordinates", "params", "request", "JSON", "Weather", "text report"]
    },
    {
      id: "34-weather-model",
      type: "code",
      title: "Domain object namiesto raw dict",
      code: {
        language: "python",
        label: "Weather",
        runnable: true,
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Weather:
    city: str
    temperature: float
    wind_speed: float`
      }
    },
    {
      id: "35-weather-request",
      type: "code",
      title: "Request s parametrami",
      code: {
        language: "python",
        label: "forecast",
        runnable: false,
        code: `url = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": 48.7164,
    "longitude": 21.2611,
    "current_weather": True,
}

response = httpx.get(url, params=params, timeout=5.0)
response.raise_for_status()`
      }
    },
    {
      id: "36-weather-parse",
      type: "code",
      title: "Parsing response",
      body: "Parsing je samostatná funkcia. HTTP request a transformácia dát nie sú ten istý krok.",
      code: {
        language: "python",
        label: "parse_weather",
        runnable: false,
        code: `def parse_weather(data: dict) -> Weather:
    current = data["current_weather"]
    return Weather(
        city="Kosice",
        temperature=current["temperature"],
        wind_speed=current["windspeed"],
    )`
      }
    },
    {
      id: "37-weather-client",
      type: "code",
      title: "HTTP, chyby a parsing spolu",
      code: {
        language: "python",
        label: "fetch_weather",
        runnable: false,
        code: `def fetch_weather() -> Weather | None:
    try:
        response = httpx.get(url, params=params, timeout=5.0)
        response.raise_for_status()
    except httpx.HTTPError as error:
        print(f"Nepodarilo sa načítať dáta: {error}")
        return None

    return parse_weather(response.json())`
      }
    },
    {
      id: "38-docs-section",
      type: "section",
      title: "API ako kontrakt",
      subtitle: "Pred písaním klienta treba čítať dokumentáciu, nie iba skúšať URL."
    },
    {
      id: "39-read-docs",
      type: "code",
      title: "Checklist pri čítaní API dokumentácie",
      code: {
        language: "text",
        label: "API docs",
        code: `endpoint
method
parameters
authentication
request example
response example
errors
rate limits`
      }
    },
    {
      id: "40-rest",
      type: "table",
      title: "REST stručne",
      table: {
        headers: ["Pojem", "Praktický význam"],
        rows: [
          ["resource", "vec, s ktorou pracujeme: users, repos, orders"],
          ["representation", "dáta resource, často JSON"],
          ["method", "operácia nad resource"],
          ["stateless", "request nesie potrebný kontext"]
        ]
      }
    },
    {
      id: "41-pagination",
      type: "code",
      title: "Pagination znamená viac requestov",
      code: {
        language: "python",
        label: "concept",
        runnable: false,
        code: `page = 1

while True:
    response = httpx.get(url, params={"page": page})
    response.raise_for_status()
    data = response.json()

    if not data["items"]:
        break

    page += 1`
      }
    },
    {
      id: "42-api-vs-scraping",
      type: "compare",
      title: "API alebo scraping",
      columns: [
        {
          title: "API",
          items: ["štruktúrované dáta", "určené pre programy", "dokumentované parametre", "stabilnejší kontrakt"]
        },
        {
          title: "Web page",
          items: ["HTML pre browser", "primárne pre človeka", "layout sa môže meniť", "parser je krehkejší"]
        }
      ]
    },
    {
      id: "43-async-teaser",
      type: "code",
      title: "Async teaser",
      body: "Async model je užitočný, keď program čaká na viac nezávislých I/O operácií.",
      code: {
        language: "python",
        label: "AsyncClient",
        runnable: false,
        code: `async def fetch_json(url: str) -> dict:
    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()`
      }
    },
    {
      id: "44-demo",
      type: "demo",
      title: "Demo: malý API klient",
      points: [
        "`httpx.get()`",
        "query params",
        "status code a headers",
        "`response.json()`",
        "`raise_for_status()`",
        "timeout a `try`"
      ]
    },
    {
      id: "45-next",
      type: "diagram",
      title: "Od API k persistencii",
      diagramItems: ["request", "JSON", "Python data", "storage", "database"]
    }
  ],
  translations: {
    en: {
      title: "Internet, HTTP and APIs",
      description: "Request/response model, HTTPX, JSON, errors, timeouts and working with a public API in Python.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Internet, HTTP and APIs"
        },
        "02-local-vs-remote": {
          title: "A Program Can Work with Data Outside the Computer",
          body: "A Python application can act as a service client: it sends a request, receives a response and converts the response into ordinary Python data.",
          points: [
            "JSON from scripting is now read as an API response",
            "exceptions and testing from last week help with network failures",
            "the program must behave reasonably even when the service does not respond"
          ]
        },
        "03-client-server-model": {
          title: "Client - Request - Server - Response",
          diagramItems: ["Python client", "HTTP request", "API server", "HTTP response", "Python object"]
        },
        "04-client-question": {
          title: "Who Is the Client?",
          prompt: "We run a Python script that calls a public API. Is the client the browser, the terminal, or our program?"
        },
        "05-url-section": {
          title: "HTTP Request",
          subtitle: "URL, method, headers and body form the contract between client and server."
        },
        "06-url-parts": {
          title: "A URL Has Structure",
          table: {
            headers: ["Part", "Example", "Meaning"],
            rows: [
              ["scheme", "<code>https</code>", "how we communicate"],
              ["host", "<code>api.example.com</code>", "where we connect"],
              ["path", "<code>/users/42</code>", "which resource we request"],
              ["query", "<code>?active=true</code>", "request parameters"]
            ]
          }
        },
        "07-request-parts": {
          title: "Parts of a Request",
          table: {
            headers: ["Part", "Practical meaning"],
            rows: [
              ["method", "operation: read, create, update, delete"],
              ["URL", "address of the resource or endpoint"],
              ["headers", "request metadata"],
              ["body", "data sent to the server"],
              ["timeout", "how long the client is willing to wait"]
            ]
          }
        },
        "08-response-parts": {
          title: "Parts of a Response",
          table: {
            headers: ["Part", "Practical meaning"],
            rows: [
              ["status code", "result of the request at the HTTP level"],
              ["headers", "response metadata, for example content type"],
              ["body", "the actual data, often JSON"],
              ["encoding", "how to interpret text content"]
            ]
          }
        },
        "09-methods": {
          title: "HTTP Methods",
          table: {
            headers: ["Method", "Typical use", "Note"],
            rows: [
              ["GET", "read data", "should not change server state"],
              ["POST", "create or submit data", "not generally idempotent"],
              ["PUT", "replace a resource", "typically idempotent"],
              ["PATCH", "modify part of a resource", "depends on the API"],
              ["DELETE", "delete a resource", "typically an idempotent effect"]
            ]
          }
        },
        "10-idempotency": {
          title: "Idempotency Is a Property of Repeated Calls",
          body: "An operation is idempotent if repeating the same call does not have an additional different effect compared with one call.",
          points: [
            "GET should not change state",
            "a repeated POST may create a duplicate",
            "retry logic depends on the method and the specific API"
          ]
        },
        "11-status-families": {
          title: "Status Code Families",
          table: {
            headers: ["Group", "Meaning"],
            rows: [
              ["2xx", "the request was processed successfully"],
              ["3xx", "redirection"],
              ["4xx", "the client sent an invalid or unauthorized request"],
              ["5xx", "the server failed to process the request"]
            ]
          }
        },
        "12-common-statuses": {
          title: "Codes You Will See Often"
        },
        "13-status-question": {
          title: "What Does 404 Mean?",
          prompt: "Is it a network failure, a server crash, or a server response to a specific URL?"
        },
        "14-json-section": {
          title: "JSON as Data Representation",
          subtitle: "An API often does not send a Python object, but text serialized as JSON."
        },
        "15-json-response": {
          title: "JSON Response and Python Dict"
        },
        "16-serialization": {
          title: "Serialization Converts an Object into a Transfer Format",
          body: "Between processes and systems, we do not send Python objects directly. We send text or bytes in an agreed format.",
          points: [
            "JSON is readable and widely supported",
            "types are mapped between ecosystems",
            "after receiving a response, we still validate that it has the expected shape"
          ]
        },
        "17-httpx-section": {
          title: "HTTPX",
          subtitle: "A practical library for HTTP clients in Python."
        },
        "18-first-request": {
          title: "First GET Request",
          body: "`httpx.get()` returns a response object, not just text."
        },
        "19-response-object": {
          title: "Response Object",
          table: {
            headers: ["Property/method", "Meaning"],
            rows: [
              ["<code>status_code</code>", "numeric HTTP status"],
              ["<code>headers</code>", "response metadata"],
              ["<code>text</code>", "body as text"],
              ["<code>content</code>", "body as bytes"],
              ["<code>json()</code>", "JSON body as Python data"],
              ["<code>raise_for_status()</code>", "exception for 4xx or 5xx"]
            ]
          }
        },
        "20-query-params": {
          title: "Do Not Build Query Parameters by Hand",
          codeBlocks: [
            { label: "fragile" },
            { label: "params" }
          ]
        },
        "21-query-question": {
          title: "Where Does the Filter Belong?",
          prompt: "We want to load only active users: query parameter or JSON body?"
        },
        "22-headers": {
          title: "Headers Carry Metadata",
          body: "Headers often define the format, authorization or client identity."
        },
        "23-post-json": {
          title: "POST with JSON Body",
          body: "`json=payload` sets both the body and an appropriate content type."
        },
        "24-error-section": {
          title: "Errors and Timeouts",
          subtitle: "A networked program must expect things outside itself to fail."
        },
        "25-check-response": {
          title: "Check the Response First",
          codeBlocks: [
            { label: "too optimistic" },
            { label: "more careful" }
          ]
        },
        "26-timeout-question": {
          title: "How Long Should the Program Wait?",
          prompt: "The server is not responding. Without a timeout, the program may hang longer than is acceptable for the user or batch job."
        },
        "27-http-vs-network": {
          title: "HTTP Error and Network Error",
          columns: [
            {
              title: "HTTP 404 / 500",
              items: [
                "the server responded",
                "we have a status code",
                "we handle the API response",
                "we may be able to read an error body"
              ]
            },
            {
              title: "Network / timeout",
              items: [
                "a response may not exist",
                "DNS, connection, TLS, timeout",
                "a status code may not be available",
                "we handle transport"
              ]
            }
          ]
        },
        "28-http-error-code": {
          title: "Catching HTTPX Errors",
          code: {
            code: `try:
    response = httpx.get(url, timeout=5.0)
    response.raise_for_status()
except httpx.HTTPStatusError as error:
    print(f"HTTP error: {error.response.status_code}")
except httpx.RequestError as error:
    print(f"Transport error: {error}")`
          }
        },
        "29-api-keys": {
          title: "An API Key Does Not Belong in Source Code",
          codeBlocks: [
            { label: "problem" },
            {
              label: "environment",
              code: `import os

api_key = os.getenv("API_KEY")
if api_key is None:
    print("API_KEY is not set")`
            }
          ]
        },
        "30-rate-limit": {
          title: "429 Too Many Requests",
          body: "An API may limit the number of requests. A client should read the documentation, respect limits and avoid sending an infinite loop of requests.",
          points: ["quota", "rate limit", "retry later", "backoff", "cache where it makes sense"]
        },
        "31-client-lifecycle": {
          title: "`httpx.Client` for Multiple Requests",
          body: "A client keeps shared configuration and can handle repeated requests more efficiently."
        },
        "32-weather-section": {
          title: "Running Example: Weather CLI",
          subtitle: "A small API client that loads data, processes JSON and prints a report."
        },
        "33-weather-flow": {
          title: "Weather CLI",
          diagramItems: ["city or coordinates", "params", "request", "JSON", "Weather", "text report"]
        },
        "34-weather-model": {
          title: "Domain Object Instead of Raw Dict"
        },
        "35-weather-request": {
          title: "Request with Parameters"
        },
        "36-weather-parse": {
          title: "Parsing the Response",
          body: "Parsing is a separate function. The HTTP request and data transformation are not the same step."
        },
        "37-weather-client": {
          title: "HTTP, Errors and Parsing Together",
          code: {
            code: `def fetch_weather() -> Weather | None:
    try:
        response = httpx.get(url, params=params, timeout=5.0)
        response.raise_for_status()
    except httpx.HTTPError as error:
        print(f"Could not load data: {error}")
        return None

    return parse_weather(response.json())`
          }
        },
        "38-docs-section": {
          title: "API as a Contract",
          subtitle: "Before writing a client, read the documentation instead of only trying URLs."
        },
        "39-read-docs": {
          title: "Checklist When Reading API Documentation"
        },
        "40-rest": {
          title: "REST Briefly",
          table: {
            headers: ["Term", "Practical meaning"],
            rows: [
              ["resource", "the thing we work with: users, repos, orders"],
              ["representation", "resource data, often JSON"],
              ["method", "operation on the resource"],
              ["stateless", "the request carries the necessary context"]
            ]
          }
        },
        "41-pagination": {
          title: "Pagination Means Multiple Requests"
        },
        "42-api-vs-scraping": {
          title: "API or Scraping",
          columns: [
            {
              title: "API",
              items: [
                "structured data",
                "designed for programs",
                "documented parameters",
                "more stable contract"
              ]
            },
            {
              title: "Web page",
              items: [
                "HTML for a browser",
                "primarily for humans",
                "layout can change",
                "the parser is more fragile"
              ]
            }
          ]
        },
        "43-async-teaser": {
          title: "Async Teaser",
          body: "The async model is useful when a program waits for multiple independent I/O operations."
        },
        "44-demo": {
          title: "Demo: Small API Client",
          points: [
            "`httpx.get()`",
            "query params",
            "status code and headers",
            "`response.json()`",
            "`raise_for_status()`",
            "timeout and `try`"
          ]
        },
        "45-next": {
          title: "From API to Persistence",
          diagramItems: ["request", "JSON", "Python data", "storage", "database"]
        }
      }
    }
  }
} satisfies Lecture;
