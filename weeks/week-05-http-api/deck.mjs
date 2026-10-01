const text = (sk, en) => ({ sk, en });

const captured = {
  date: "2026-10-01",
  time: "2026-10-01T15:00",
  latitude: 48.71441,
  longitude: 21.25802,
  temperature: 22.8,
  windSpeed: 9.7
};

export const lecture05Weather = {
  slug: "05-http-api",
  title: text("Internet, HTTP a API", "Internet, HTTP and APIs"),
  deck: [
    {
      kind: "title",
      title: text("Internet, HTTP a API", "Internet, HTTP and APIs"),
      subtitle: text(
        `Košice, Slovensko · ${captured.time.replace("T", " ")} · ${captured.temperature} °C · vietor ${captured.windSpeed} km/h`,
        `Košice, Slovakia · ${captured.time.replace("T", " ")} · ${captured.temperature} °C · wind ${captured.windSpeed} km/h`
      )
    },
    {
      kind: "codeFull",
      title: text("Čo bude náš program robiť", "What our program will do"),
      label: text("PRIPRAVENÝ VSTUP A VÝSTUP", "PREPARED INPUT AND OUTPUT"),
      code: text(
        `Mesto: Košice

Košice, Slovensko
Čas údajov: ${captured.time.replace("T", " ")}
Teplota: ${captured.temperature} °C
Vietor: ${captured.windSpeed} km/h`,
        `City: Košice

Košice, Slovakia
Observation time: ${captured.time.replace("T", " ")}
Temperature: ${captured.temperature} °C
Wind: ${captured.windSpeed} km/h`
      ),
      note: text(
        "Program najprv nájde súradnice mesta a potom nimi zavolá druhé API. Údaje na slidoch sú zachytené 1. októbra 2026.",
        "The program first finds city coordinates and then calls a second API with them. Slide data was captured on 1 October 2026."
      )
    },
    {
      kind: "compare",
      title: text("Kde sa nachádzajú údaje?", "Where is the data?"),
      columns: [
        {
          title: text("Lokálny súbor", "Local file"),
          items: [text("je na našom disku", "lives on our disk"), text("otvorí ho pathlib alebo open", "opened by pathlib or open"), text("dostupnosť riadi náš počítač", "availability is controlled by our computer")]
        },
        {
          title: text("Vzdialená služba", "Remote service"),
          items: [text("beží na inom serveri", "runs on another server"), text("údaje musíme vyžiadať", "data must be requested"), text("výsledok závisí aj od siete a služby", "the result also depends on network and service")]
        }
      ]
    },
    {
      kind: "compare",
      title: text("Internet a web nie sú synonymá", "The internet and the web are not synonyms"),
      columns: [
        {
          title: text("Internet", "Internet"),
          items: [text("sieťová infraštruktúra", "network infrastructure"), text("prepája zariadenia a siete", "connects devices and networks"), text("nesie viac druhov služieb", "carries many kinds of services")]
        },
        {
          title: text("Web", "Web"),
          items: [text("jedna služba nad internetom", "one service over the internet"), text("pracuje s URL a HTTP", "uses URLs and HTTP"), text("zahŕňa stránky aj webové API", "includes pages and web APIs")]
        }
      ]
    },
    {
      kind: "diagram",
      title: text("Python skript je klient", "The Python script is the client"),
      items: [
        text("Python skript", "Python script"),
        text("HTTP request", "HTTP request"),
        text("Open-Meteo server", "Open-Meteo server"),
        text("HTTP response", "HTTP response"),
        text("Python dáta", "Python data")
      ]
    },
    {
      kind: "diagram",
      title: text("Čo sa deje pri otvorení adresy", "What happens when opening an address"),
      items: [
        text("DNS nájde adresu servera", "DNS resolves the server address"),
        text("spojenie", "connection"),
        text("TLS pri HTTPS", "TLS for HTTPS"),
        text("HTTP request", "HTTP request"),
        text("HTTP response", "HTTP response")
      ]
    },
    {
      kind: "table",
      title: text("URL má pomenované časti", "A URL has named parts"),
      headers: [text("Časť", "Part"), text("Príklad", "Example"), text("Účel", "Purpose")],
      rows: [
        ["scheme", "https", text("spôsob komunikácie", "communication scheme")],
        ["host", "geocoding-api.open-meteo.com", text("cieľový server", "target server")],
        ["path", "/v1/search", text("konkrétne rozhranie", "specific interface")],
        ["query", "?name=Kosice&count=3", text("parametre požiadavky", "request parameters")]
      ]
    },
    {
      kind: "beforeAfter",
      title: text("Parametre menia požiadavku na rovnaký endpoint", "Parameters change a request to the same endpoint"),
      leftLabel: text("KOŠICE", "KOŠICE"),
      leftCode: "GET /v1/search?name=Kosice&count=3",
      rightLabel: text("BRATISLAVA", "BRATISLAVA"),
      rightCode: "GET /v1/search?name=Bratislava&count=3",
      note: text("Host a cesta ostávajú rovnaké. Mení sa hodnota query parametra name.", "The host and path stay the same. The name query parameter changes.")
    },
    {
      kind: "beforeAfter",
      title: text("URL neskladáme ručne", "Do not assemble a URL manually"),
      leftLabel: text("KREHKÝ REŤAZEC", "FRAGILE STRING"),
      leftCode: text(
        `mesto = "Spišská Nová Ves"
url = API + "?name=" + mesto

# medzery a diakritika potrebujú encoding`,
        `city = "Spišská Nová Ves"
url = API + "?name=" + city

# spaces and diacritics need encoding`
      ),
      rightLabel: "requests",
      rightCode: text(
        `params = {"name": mesto, "count": 3}
response = requests.get(
    API, params=params, timeout=10
)`,
        `params = {"name": city, "count": 3}
response = requests.get(
    API, params=params, timeout=10
)`
      ),
      note: text("Knižnica vytvorí query string a správne zakóduje hodnoty.", "The library builds the query string and encodes values correctly.")
    },
    {
      kind: "codeFull",
      title: text("HTTP požiadavka má metódu, cieľ a hlavičky", "An HTTP request has a method, target and headers"),
      label: text("ZJEDNODUŠENÁ POŽIADAVKA", "SIMPLIFIED REQUEST"),
      code: text(
        "GET /v1/search?name=Kosice&count=3&language=sk HTTP/1.1\nHost: geocoding-api.open-meteo.com\nAccept: */*\nUser-Agent: python-requests/2.x",
        "GET /v1/search?name=Kosice&count=3&language=en HTTP/1.1\nHost: geocoding-api.open-meteo.com\nAccept: */*\nUser-Agent: python-requests/2.x"
      ),
      note: text("Server z požiadavky zistí operáciu, endpoint, parametre a metadata klienta.", "The server learns the operation, endpoint, parameters and client metadata from the request.")
    },
    {
      kind: "codeFull",
      title: text("HTTP odpoveď oddeľuje stav, hlavičky a telo", "An HTTP response separates status, headers and body"),
      label: text("ZACHYTENÁ ODPOVEĎ · VÝREZ", "CAPTURED RESPONSE · EXCERPT"),
      code: text(
        `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip

{
  "results": [
    {"name": "Košice", "latitude": 48.71441, ...}
  ]
}`,
        `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip

{
  "results": [
    {"name": "Košice", "latitude": 48.71441, ...}
  ]
}`
      ),
      note: text("Tri bodky označujú vynechanú časť; nejde o kompletné telo odpovede.", "The ellipsis marks omitted content; this is not the complete response body.")
    },
    {
      kind: "codeFull",
      title: text("Stavový kód je výsledok na úrovni HTTP", "A status code is the HTTP-level result"),
      label: "status codes",
      code: text(
        "200  OK                 úspešná požiadavka\n400  Bad Request        problém s požiadavkou\n401  Unauthorized       chýba alebo neplatí overenie\n404  Not Found          zdroj sa nenašiel\n429  Too Many Requests  prekročený limit volaní\n500  Server Error       server zlyhal pri spracovaní",
        "200  OK                 successful request\n400  Bad Request        request problem\n401  Unauthorized       authentication missing or invalid\n404  Not Found          resource not found\n429  Too Many Requests  request limit exceeded\n500  Server Error       server failed while processing"
      ),
      note: text("HTTP chyba je platná odpoveď servera, nie automaticky chyba spojenia.", "An HTTP error is a valid server response, not automatically a connection failure.")
    },
    {
      kind: "compare",
      title: text("Hlavička opisuje formát tela", "A header describes the body format"),
      columns: [
        { title: "text/html", items: [text("telo obsahuje HTML", "body contains HTML"), text("prehliadač vytvorí stránku", "browser renders a page"), text("štruktúra je určená najmä človeku", "structure is primarily for a human")] },
        { title: "application/json", items: [text("telo obsahuje JSON", "body contains JSON"), text("program ho parsuje na objekty", "a program parses it into objects"), text("polia majú pomenovaný význam", "fields have named meaning")] }
      ]
    },
    {
      kind: "compare",
      title: text("Webová stránka a API slúžia iným klientom", "A web page and an API serve different clients"),
      columns: [
        { title: text("Webová stránka", "Web page"), items: [text("výsledok číta človek", "read by a human"), text("obsahuje navigáciu a prezentáciu", "contains navigation and presentation"), text("prehliadač vykreslí HTML a CSS", "browser renders HTML and CSS")] },
        { title: "API", items: [text("výsledok spracúva program", "processed by a program"), text("vracia štruktúrované údaje", "returns structured data"), text("kontrakt opisuje dokumentácia", "contract is described by documentation")] }
      ]
    },
    {
      kind: "codeFull",
      title: text("requests je externá knižnica", "requests is an external library"),
      label: "terminal / python",
      code: "python -m pip install requests\n\nimport requests",
      note: text("Inštalujeme ju do prostredia, v ktorom budeme skript spúšťať. Nie je súčasťou štandardnej knižnice.", "Install it into the environment that runs the script. It is not part of the standard library.")
    },
    {
      kind: "code",
      title: text("Prvá požiadavka GET", "The first GET request"),
      label: "python",
      code: `import requests

url = "https://geocoding-api.open-meteo.com/v1/search"
response = requests.get(url, timeout=10)
print(response.status_code)`,
      output: "400",
      note: text("Server odpovedal, ale chýba povinný parameter name. Spojenie fungovalo; požiadavka nie.", "The server responded, but required parameter name is missing. The connection worked; the request did not.")
    },
    {
      kind: "table",
      title: text("Objekt response drží viac pohľadov na odpoveď", "The response object exposes several views"),
      headers: [text("Atribút", "Attribute"), text("Zachytená hodnota", "Captured value"), text("Význam", "Meaning")],
      rows: [
        ["response.status_code", "200", text("HTTP výsledok", "HTTP result")],
        ["response.headers[\"Content-Type\"]", "application/json; charset=utf-8", text("formát tela", "body format")],
        ["response.text[:32]", "{\"results\":[{\"id\":724443,...", text("telo ako text", "body as text")]
      ]
    },
    {
      kind: "splitCode",
      title: text("Timeout obmedzuje čakanie na sieť", "A timeout bounds network waiting"),
      items: [
        text("bez timeoutu môže requests čakať veľmi dlho", "without a timeout, requests may wait a very long time"),
        text("timeout=10 platí pre connect aj read timeout", "timeout=10 applies to connect and read timeouts"),
        text("nie je to celkový wall-clock limit skriptu", "it is not a total wall-clock limit for the script")
      ],
      label: "python",
      code: text(
        "response = requests.get(\n    url,\n    params=params,\n    timeout=10,\n)\n\n# pri príliš dlhom čakaní:\n# requests.exceptions.Timeout",
        "response = requests.get(\n    url,\n    params=params,\n    timeout=10,\n)\n\n# when waiting takes too long:\n# requests.exceptions.Timeout"
      )
    },
    {
      kind: "code",
      title: text("Parametre odovzdáme cez params", "Pass parameters through params"),
      label: "python",
      code: text(
        `params = {
    "name": "Košice",
    "count": 3,
    "language": "sk",
}
response = requests.get(URL, params=params, timeout=10)
print(response.url)`,
        `params = {
    "name": "Košice",
    "count": 3,
    "language": "en",
}
response = requests.get(URL, params=params, timeout=10)
print(response.url)`
      ),
      output: text(
        ".../v1/search?\nname=Ko%C5%A1ice&\ncount=3&language=sk",
        ".../v1/search?\nname=Ko%C5%A1ice&\ncount=3&language=en"
      ),
      note: text("response.url ukáže skutočnú zakódovanú adresu odoslanej požiadavky.", "response.url shows the actual encoded address of the sent request.")
    },
    {
      kind: "codeFull",
      title: text("Úspešné spojenie nemusí znamenať úspešnú požiadavku", "A successful connection does not imply a successful request"),
      label: "python / terminal",
      code: text(
        `response = requests.get(
    URL, params={"name": "Košice", "count": 0}, timeout=10
)
print(response.status_code)  # 400
print(response.text)
response.raise_for_status()

# {"error":true,"reason":"Parameter count must be between 1 and 100."}
# requests.exceptions.HTTPError: 400 Client Error`,
        `response = requests.get(
    URL, params={"name": "Košice", "count": 0}, timeout=10
)
print(response.status_code)  # 400
print(response.text)
response.raise_for_status()

# {"error":true,"reason":"Parameter count must be between 1 and 100."}
# requests.exceptions.HTTPError: 400 Client Error`
      ),
      note: text("raise_for_status() zmení HTTP 4xx alebo 5xx na viditeľnú výnimku.", "raise_for_status() turns an HTTP 4xx or 5xx response into a visible exception.")
    },
    {
      kind: "codeFull",
      title: text("Celý prvý skript", "The complete first script"),
      label: "geocoding.py",
      code: text(
        `import requests

URL = "https://geocoding-api.open-meteo.com/v1/search"
params = {"name": "Košice", "count": 3, "language": "sk"}

response = requests.get(URL, params=params, timeout=10)
response.raise_for_status()

print(response.text[:160])`,
        `import requests

URL = "https://geocoding-api.open-meteo.com/v1/search"
params = {"name": "Košice", "count": 3, "language": "en"}

response = requests.get(URL, params=params, timeout=10)
response.raise_for_status()

print(response.text[:160])`
      ),
      note: text("Najprv overíme HTTP stav; telo zatiaľ vypíšeme iba ako textový výrez.", "First verify the HTTP status; for now, print only a text excerpt of the body.")
    },
    {
      kind: "codeFull",
      title: text("JSON je text s dohodnutou štruktúrou", "JSON is text with an agreed structure"),
      label: text(`ZACHYTENÉ ${captured.date} · VÝREZ`, `CAPTURED ${captured.date} · EXCERPT`),
      code: text(
        `{
  "results": [
    {
      "name": "Košice",
      "latitude": ${captured.latitude},
      "longitude": ${captured.longitude},
      "country": "Slovensko",
      "admin2": null
    }
  ]
}`,
        `{
  "results": [
    {
      "name": "Košice",
      "latitude": ${captured.latitude},
      "longitude": ${captured.longitude},
      "country": "Slovakia",
      "admin2": null
    }
  ]
}`
      ),
      note: text("Vidíme objekt, pole, reťazce, čísla aj null. JSON zatiaľ nie je Python dict.", "We see an object, array, strings, numbers and null. JSON is not yet a Python dict.")
    },
    {
      kind: "table",
      title: text("JSON hodnoty sa mapujú na Python objekty", "JSON values map to Python objects"),
      headers: ["JSON", "Python", text("Príklad", "Example")],
      rows: [
        ["object", "dict", "{\"name\": \"Košice\"}"],
        ["array", "list", "[result, result]"],
        ["true / false", "True / False", "{\"error\": false}"],
        ["null", "None", "{\"admin2\": null}"]
      ]
    },
    {
      kind: "code",
      title: text(".json() parsuje telo odpovede", ".json() parses the response body"),
      label: "python",
      code: "data = response.json()\n\nprint(type(data))\nprint(type(data[\"results\"]))\nprint(data[\"results\"][0][\"name\"])",
      output: text("<class 'dict'>\n<class 'list'>\nKošice", "<class 'dict'>\n<class 'list'>\nKošice"),
      note: text("Parsovanie je samostatný krok po prijatí a kontrole HTTP odpovede.", "Parsing is a separate step after receiving and checking the HTTP response.")
    },
    {
      kind: "code",
      title: text("K vnoreným údajom pristupujeme po vrstvách", "Access nested data one layer at a time"),
      label: "python",
      code: "result = data[\"results\"][0]\n\nprint(result[\"name\"])\nprint(result[\"latitude\"])\nprint(result[\"longitude\"])",
      output: `Košice\n${captured.latitude}\n${captured.longitude}`,
      note: text("results je list; [0] vyberie prvý dict a ďalší kľúč konkrétnu hodnotu.", "results is a list; [0] selects the first dict and another key selects a value.")
    },
    {
      kind: "codeFull",
      title: text("Rovnaký názov môže mať viac miest", "Several places may share the same name"),
      label: text(`ZACHYTENÉ ${captured.date} · SKRÁTENÉ`, `CAPTURED ${captured.date} · SHORTENED`),
      code: text(
        `results = [
  {"name": "Košice", "country": "Slovensko", "population": 225044},
  {"name": "Košice", "country": "Česko", "population": 690},
  {"name": "Kosice", "country": "Česko", "population": 314}
]

# Pravidlo prednášky: použijeme prvý výsledok
# a vždy vypíšeme aj krajinu.`,
        `results = [
  {"name": "Košice", "country": "Slovakia", "population": 225044},
  {"name": "Košice", "country": "Czechia", "population": 690},
  {"name": "Kosice", "country": "Czechia", "population": 314}
]

# Lecture rule: use the first result
# and always display the country.`
      ),
      note: text("Prvý výsledok je jednoduché pravidlo, nie univerzálne riešenie nejednoznačnosti.", "Using the first result is a simple rule, not a universal solution to ambiguity.")
    },
    {
      kind: "codeFull",
      title: text("Keď sa mesto nenájde, [0] nie je bezpečné", "When no city is found, [0] is unsafe"),
      label: text("ODPOVEĎ A RIZIKOVÝ KÓD", "RESPONSE AND RISKY CODE"),
      code: text(
        `data = {"generationtime_ms": 0.18}

result = data["results"][0]

# KeyError, ak kľúč results chýba
# IndexError, ak results existuje, ale je []`,
        `data = {"generationtime_ms": 0.18}

result = data["results"][0]

# KeyError if results is missing
# IndexError if results exists but is []`
      ),
      note: text("HTTP 200 môže niesť platný JSON bez použiteľného výsledku vyhľadávania.", "HTTP 200 may carry valid JSON without a usable search result.")
    },
    {
      kind: "beforeAfter",
      title: text("Obsah odpovede kontrolujeme explicitne", "Validate response content explicitly"),
      leftLabel: text("PREDPOKLADÁ VÝSLEDOK", "ASSUMES A RESULT"),
      leftCode: "result = data[\"results\"][0]",
      rightLabel: text("KONTROLUJE VÝSLEDKY", "CHECKS RESULTS"),
      rightCode: text(
        `vysledky = data.get("results", [])
if not vysledky:
    print("Mesto sa nepodarilo nájsť.")
else:
    result = vysledky[0]`,
        `results = data.get("results", [])
if not results:
    print("The city could not be found.")
else:
    result = results[0]`
      ),
      note: text("get rieši chýbajúci kľúč a podmienka aj prázdny zoznam.", "get handles a missing key and the condition handles an empty list.")
    },
    {
      kind: "codeFull",
      title: text("Funkcia najdi_mesto() uzavrie prvú požiadavku", "find_city() encapsulates the first request"),
      label: "weather.py",
      code: text(
        `def najdi_mesto(nazov: str) -> dict | None:
    response = requests.get(
        GEOCODING_URL,
        params={"name": nazov, "count": 3, "language": "sk"},
        timeout=10,
    )
    response.raise_for_status()
    vysledky = response.json().get("results", [])
    return vysledky[0] if vysledky else None`,
        `def find_city(name: str) -> dict | None:
    response = requests.get(
        GEOCODING_URL,
        params={"name": name, "count": 3, "language": "en"},
        timeout=10,
    )
    response.raise_for_status()
    results = response.json().get("results", [])
    return results[0] if results else None`
      ),
      note: text("Nájdené mesto vráti ako dict; nenájdené reprezentuje hodnotou None.", "A found city is returned as a dict; a missing city is represented by None.")
    },
    {
      kind: "diagram",
      title: text("Výstup prvého API je vstup druhého", "The first API output becomes the second API input"),
      items: [
        text("Košice", "Košice"),
        text("Geocoding API", "Geocoding API"),
        `${captured.latitude}\n${captured.longitude}`,
        text("Forecast API", "Forecast API"),
        text("teplota + vietor", "temperature + wind")
      ]
    },
    {
      kind: "codeFull",
      title: text("Druhá požiadavka žiada aktuálne počasie", "The second request asks for current weather"),
      label: "python",
      code: `WEATHER_URL = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": ${captured.latitude},
    "longitude": ${captured.longitude},
    "current": "temperature_2m,wind_speed_10m",
    "timezone": "Europe/Bratislava",
}

response = requests.get(WEATHER_URL, params=params, timeout=10)`,
      note: text("Názvy current premenných sú overené v dokumentácii Open-Meteo.", "The current variable names are verified against Open-Meteo documentation.")
    },
    {
      kind: "codeFull",
      title: text("Odpoveď počasia: relevantný výrez", "Weather response: relevant excerpt"),
      label: text(`ZACHYTENÉ ${captured.date}`, `CAPTURED ${captured.date}`),
      code: `{
  "timezone": "Europe/Bratislava",
  "current_units": {
    "time": "iso8601",
    "temperature_2m": "°C",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "${captured.time}",
    "temperature_2m": ${captured.temperature},
    "wind_speed_10m": ${captured.windSpeed}
  }
}`,
      note: text("Ostatné metadata odpovede sú na slide zámerne vynechané.", "Other response metadata is intentionally omitted from the slide.")
    },
    {
      kind: "table",
      title: text("Hodnota bez jednotky nestačí", "A value without a unit is not enough"),
      headers: [text("Údaj", "Field"), text("Hodnota", "Value"), text("Jednotka z API", "Unit from API")],
      rows: [
        ["current.time", captured.time, "iso8601"],
        ["current.temperature_2m", String(captured.temperature), "°C"],
        ["current.wind_speed_10m", String(captured.windSpeed), "km/h"]
      ]
    },
    {
      kind: "codeColumns",
      title: text("Zo surových dát vytvoríme používateľský výstup", "Turn raw data into user-facing output"),
      leftLabel: "JSON",
      leftCode: `"current": {
  "time": "${captured.time}",
  "temperature_2m": ${captured.temperature},
  "wind_speed_10m": ${captured.windSpeed}
}

"current_units": {
  "temperature_2m": "°C",
  "wind_speed_10m": "km/h"
}`,
      rightLabel: text("TERMINÁL", "TERMINAL"),
      rightCode: text(
        `Košice, Slovensko
Čas údajov: ${captured.time.replace("T", " ")}
Teplota: ${captured.temperature} °C
Vietor: ${captured.windSpeed} km/h`,
        `Košice, Slovakia
Observation time: ${captured.time.replace("T", " ")}
Temperature: ${captured.temperature} °C
Wind: ${captured.windSpeed} km/h`
      )
    },
    {
      kind: "codeFull",
      title: text("Funkcia ziskaj_pocasie() rieši druhú požiadavku", "get_weather() handles the second request"),
      label: "weather.py",
      code: text(
        `def ziskaj_pocasie(latitude: float, longitude: float) -> dict:
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m",
        "timezone": "Europe/Bratislava",
    }
    response = requests.get(WEATHER_URL, params=params, timeout=10)
    response.raise_for_status()
    return response.json()`,
        `def get_weather(latitude: float, longitude: float) -> dict:
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m",
        "timezone": "Europe/Bratislava",
    }
    response = requests.get(WEATHER_URL, params=params, timeout=10)
    response.raise_for_status()
    return response.json()`
      ),
      note: text("Parametre funkcie priamo zodpovedajú údajom vráteným geokódovaním.", "Function parameters directly match values returned by geocoding.")
    },
    {
      kind: "codeColumns",
      title: text("Celý priebeh programu", "The complete program flow"),
      leftLabel: "main()",
      leftCode: text(
        `nazov = input("Mesto: ").strip()
mesto = najdi_mesto(nazov)

if mesto is None:
    print("Mesto sa nepodarilo nájsť.")
else:
    data = ziskaj_pocasie(
        mesto["latitude"],
        mesto["longitude"],
    )
    vypis_pocasie(mesto, data)`,
        `name = input("City: ").strip()
city = find_city(name)

if city is None:
    print("The city could not be found.")
else:
    data = get_weather(
        city["latitude"],
        city["longitude"],
    )
    print_weather(city, data)`
      ),
      rightLabel: text("VÝSTUP", "OUTPUT"),
      rightCode: text(
        `Mesto: Košice

Košice, Slovensko
Čas údajov: ${captured.time.replace("T", " ")}
Teplota: ${captured.temperature} °C
Vietor: ${captured.windSpeed} km/h`,
        `City: Košice

Košice, Slovakia
Observation time: ${captured.time.replace("T", " ")}
Temperature: ${captured.temperature} °C
Wind: ${captured.windSpeed} km/h`
      )
    },
    {
      kind: "table",
      title: text("Tri odlišné neúspechy", "Three distinct failures"),
      headers: [text("Situácia", "Situation"), text("Ako ju spoznáme", "How we detect it"), text("Reakcia", "Response")],
      rows: [
        [text("nedostupná sieť", "network unavailable"), "RequestException", text("vysvetliť problém spojenia", "explain connection problem")],
        [text("HTTP chyba", "HTTP error"), "HTTPError", text("uviesť status code", "report status code")],
        [text("mesto sa nenašlo", "city not found"), "results == []", text("zrozumiteľné hlásenie", "clear message")]
      ]
    },
    {
      kind: "codeFull",
      title: text("Sieťové a HTTP chyby ošetrujeme konkrétne", "Handle network and HTTP failures specifically"),
      label: "python",
      code: text(
        `from requests.exceptions import HTTPError, RequestException, Timeout

try:
    mesto = najdi_mesto(nazov)
    if mesto is not None:
        data = ziskaj_pocasie(mesto["latitude"], mesto["longitude"])
except Timeout:
    print("Server neodpovedal včas.")
except HTTPError as error:
    print(f"HTTP chyba: {error.response.status_code}")
except RequestException:
    print("Nepodarilo sa spojiť so službou.")`,
        `from requests.exceptions import HTTPError, RequestException, Timeout

try:
    city = find_city(name)
    if city is not None:
        data = get_weather(city["latitude"], city["longitude"])
except Timeout:
    print("The server did not respond in time.")
except HTTPError as error:
    print(f"HTTP error: {error.response.status_code}")
except RequestException:
    print("Could not connect to the service.")`
      ),
      note: text("Neúspech nezamlčíme; používateľ dostane informáciu o type problému.", "Do not hide failure; tell the user what kind of problem occurred.")
    },
    {
      kind: "diagram",
      title: text("HTTP 200 je iba prvá kontrola", "HTTP 200 is only the first check"),
      items: [
        text("HTTP stav", "HTTP status"),
        text("parsovanie JSON", "JSON parsing"),
        text("očakávané kľúče", "expected keys"),
        text("neprázdne results", "non-empty results"),
        text("použiteľný výstup", "usable output")
      ]
    },
    {
      kind: "compare",
      title: text("API môže obmedziť alebo overovať klienta", "An API may limit or authenticate a client"),
      columns: [
        {
          title: "429 Too Many Requests",
          items: [text("príliš veľa volaní", "too many calls"), text("rešpektovať limit a Retry-After", "respect limits and Retry-After"), text("neopakovať agresívne", "do not retry aggressively")]
        },
        {
          title: text("API kľúč", "API key"),
          items: [text("identifikuje klienta služby", "identifies the service client"), text("nepatrí do Git repozitára", "does not belong in Git"), text("neukazujeme ho v URL ani logoch", "do not expose it in URLs or logs")]
        }
      ]
    },
    {
      kind: "codeColumns",
      title: text("GET číta, POST môže vytvárať", "GET reads, POST may create"),
      leftLabel: text("GET · POČASIE", "GET · WEATHER"),
      leftCode: `response = requests.get(
    WEATHER_URL,
    params={
        "latitude": ${captured.latitude},
        "longitude": ${captured.longitude},
        "current": "temperature_2m",
    },
    timeout=10,
)`,
      rightLabel: text("POST · NOVÁ ÚLOHA", "POST · NEW TASK"),
      rightCode: text(
        `response = requests.post(
    "https://api.example.com/tasks",
    json={
        "text": "Poslať zadanie",
        "done": False,
    },
    timeout=10,
)`,
        `response = requests.post(
    "https://api.example.com/tasks",
    json={
        "text": "Submit assignment",
        "done": False,
    },
    timeout=10,
)`
      )
    },
    {
      kind: "codeColumns",
      title: text("Nájdite chybu v spracovaní odpovede", "Find the response-processing bug"),
      leftLabel: text("KÓD A ODPOVEĎ", "CODE AND RESPONSE"),
      leftCode: text(
        `data = response.json()
mesto = data["results"][0]

# response body:
{
  "generationtime_ms": 0.18
}`,
        `data = response.json()
city = data["results"][0]

# response body:
{
  "generationtime_ms": 0.18
}`
      ),
      rightLabel: text("PROBLÉM A OPRAVA", "PROBLEM AND FIX"),
      rightCode: text(
        `# data nemá kľúč "results"
# priamy prístup vyvolá KeyError

vysledky = data.get("results", [])
if not vysledky:
    print("Mesto sa nepodarilo nájsť.")`,
        `# data has no "results" key
# direct access raises KeyError

results = data.get("results", [])
if not results:
    print("The city could not be found.")`
      )
    },
    {
      kind: "recap",
      title: text("Čo treba zistiť z dokumentácie API", "What to learn from API documentation"),
      items: [
        text("endpoint a HTTP metódu", "endpoint and HTTP method"),
        text("povinné a voliteľné parametre", "required and optional parameters"),
        text("štruktúru úspešnej aj chybovej odpovede", "successful and error response structure"),
        text("jednotky a význam časových údajov", "units and time semantics"),
        text("spôsob overenia klienta", "client authentication method"),
        text("limity počtu požiadaviek", "request limits")
      ]
    },
    {
      kind: "recap",
      title: text("Od požiadavky k použiteľnému výsledku", "From a request to a usable result"),
      items: [
        text("Odošlite požiadavku s params a timeoutom.", "Send the request with params and a timeout."),
        text("Skontrolujte HTTP stav cez raise_for_status().", "Check HTTP status with raise_for_status()."),
        text("Parsujte JSON a overte jeho obsah.", "Parse JSON and validate its content."),
        text("Výstup prvého API použite ako vstup druhého.", "Use the first API output as the second API input."),
        text("Na cvičení porovnáte počasie dvoch miest.", "In the exercise, compare weather for two cities.")
      ]
    }
  ]
};
