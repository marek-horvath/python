import type { Lecture } from "../../shared/slide.types";

export const lecture08 = {
  weekNumber: 8,
  slug: "08-web-scraping-browser",
  title: "Web scraping a automatizácia prehliadača",
  description: "Získavanie dát z HTML stránok, parsovanie cez BeautifulSoup a automatizácia dynamických webov cez Playwright.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Web scraping a automatizácia prehliadača"
    },
    {
      id: "02-api-page-browser",
      type: "compare",
      title: "API, webová stránka a browser nie sú to isté",
      columns: [
        {
          title: "API",
          items: ["dáta pre programy", "JSON alebo iný formát", "dokumentované endpointy", "stabilnejší kontrakt"]
        },
        {
          title: "Webová stránka",
          items: ["HTML pre používateľa", "DOM pre browser", "layout sa môže meniť", "dáta nemusia byť priamo v HTML"]
        }
      ]
    },
    {
      id: "03-where-are-data",
      type: "question",
      title: "Kde sú dáta?",
      prompt: "Browser údaj zobrazuje, ale verejné API nepoznáme. Nachádza sa údaj priamo v HTML, alebo ho stránka načítala dodatočným requestom?"
    },
    {
      id: "04-scraping-workflow",
      type: "diagram",
      title: "Web scraping v štyroch krokoch",
      diagramItems: ["download HTML", "parse document", "extract data", "save structured output"]
    },
    {
      id: "05-html-minimum",
      type: "code",
      title: "HTML minimum pre scraper",
      body: "Potrebujeme rozumieť tagom, atribútom, triedam a vnoreným elementom.",
      code: {
        language: "text",
        label: "HTML",
        code: `<article class="product">
    <h2>Keyboard</h2>
    <span class="price">49.90 EUR</span>
</article>`
      }
    },
    {
      id: "06-dom-tree",
      type: "code",
      title: "DOM je strom dokumentu",
      code: {
        language: "text",
        label: "DOM",
        code: `html
  body
    h1
    div.product
      h2
      span.price`
      }
    },
    {
      id: "07-static-section",
      type: "section",
      title: "Statická stránka",
      subtitle: "Ak HTML obsahuje dáta, nepotrebujeme spúšťať browser."
    },
    {
      id: "08-download-html",
      type: "code",
      title: "Stiahnutie HTML cez HTTPX",
      code: {
        language: "python",
        label: "fetch.py",
        runnable: false,
        highlightLines: [3, 4, 6],
        code: `import httpx

response = httpx.get(url, timeout=10.0)
response.raise_for_status()

html = response.text`
      }
    },
    {
      id: "09-request-can-fail",
      type: "bullets",
      title: "Stiahnutie stránky môže zlyhať",
      points: [
        "neplatná URL",
        "timeout",
        "404 alebo 500",
        "presmerovanie",
        "blokovanie alebo rate limit"
      ]
    },
    {
      id: "10-beautifulsoup-section",
      type: "section",
      title: "BeautifulSoup",
      subtitle: "HTML string zmeníme na strom, v ktorom vieme hľadať."
    },
    {
      id: "11-parse-soup",
      type: "code",
      title: "HTML string -> objektový strom",
      code: {
        language: "python",
        label: "parse.py",
        runnable: false,
        highlightLines: [3],
        code: `from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")

title = soup.find("h1")`
      }
    },
    {
      id: "12-find-find-all",
      type: "code",
      title: "`find` a `find_all`",
      code: {
        language: "python",
        label: "find.py",
        runnable: false,
        code: `first_heading = soup.find("h1")
articles = soup.find_all("article")

for article in articles:
    print(article.get_text(strip=True))`
      }
    },
    {
      id: "13-css-selectors",
      type: "code",
      title: "CSS selectors sú praktické",
      code: {
        language: "python",
        label: "selectors.py",
        runnable: false,
        code: `products = soup.select(".product")
price = soup.select_one(".product .price")
main = soup.select_one("#main")
external_links = soup.select('a[href^="https://"]')`
      }
    },
    {
      id: "14-selector-question",
      type: "question",
      title: "Je tento selector robustný?",
      prompt: "`body > div:nth-child(4) > div > article:nth-child(2) > span`"
    },
    {
      id: "15-text-attributes",
      type: "split-code",
      title: "Text a atribúty sú rôzne dáta",
      codeBlocks: [
        {
          language: "python",
          label: "text",
          runnable: false,
          code: `name = element.get_text(strip=True)`
        },
        {
          language: "python",
          label: "attribute",
          runnable: false,
          code: `href = link.get("href")
image_url = image.get("src")`
        }
      ]
    },
    {
      id: "16-product-section",
      type: "section",
      title: "Priebežný príklad",
      subtitle: "Katalóg produktov: názov, cena, rating a link."
    },
    {
      id: "17-product-html",
      type: "code",
      title: "Produkt ako HTML",
      code: {
        language: "text",
        label: "HTML",
        code: `<article class="product">
    <h2 class="name">Keyboard</h2>
    <span class="price">49.90 EUR</span>
    <span class="rating">4.7</span>
    <a href="/products/42">Detail</a>
</article>`
      }
    },
    {
      id: "18-product-dataclass",
      type: "code",
      title: "Scraper má vyrábať štruktúrované dáta",
      code: {
        language: "python",
        label: "product.py",
        runnable: true,
        code: `from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: float
    rating: float | None
    url: str`
      }
    },
    {
      id: "19-parse-one-product",
      type: "code",
      title: "Parsovanie jedného produktu",
      code: {
        language: "python",
        label: "parse_one.py",
        runnable: false,
        highlightLines: [2, 3, 5],
        code: `name = article.select_one(".name").get_text(strip=True)
price_text = article.select_one(".price").get_text(strip=True)
price = float(price_text.replace("EUR", "").strip())

link = article.select_one("a")
url = urljoin(base_url, link.get("href", ""))`
      }
    },
    {
      id: "20-parser-function",
      type: "code",
      title: "Parser ako samostatná funkcia",
      code: {
        language: "python",
        label: "parser.py",
        runnable: false,
        code: `def parse_products(html: str, base_url: str) -> list[Product]:
    soup = BeautifulSoup(html, "html.parser")
    products = []

    for article in soup.select(".product"):
        products.append(parse_product(article, base_url))

    return products`
      }
    },
    {
      id: "21-separate-steps",
      type: "compare",
      title: "Download a parsing sú iné kroky",
      columns: [
        {
          title: "neprehľadné",
          items: ["request", "parse", "print", "save", "všetko v jednej funkcii"]
        },
        {
          title: "testovateľné",
          items: ["`fetch_page(url) -> str`", "`parse_products(html) -> list[Product]`", "`save_products(products)`", "parser nepotrebuje internet"]
        }
      ]
    },
    {
      id: "22-relative-url",
      type: "code",
      title: "Relatívne URL treba doplniť",
      code: {
        language: "python",
        label: "urljoin.py",
        runnable: true,
        highlightLines: [1, 5],
        code: `from urllib.parse import urljoin

base_url = "https://example.com/catalog/"
href = "/products/42"
absolute_url = urljoin(base_url, href)

print(absolute_url)`
      }
    },
    {
      id: "23-pagination",
      type: "diagram",
      title: "Pagination znamená viac stránok",
      diagramItems: ["fetch page", "extract data", "find next", "repeat", "stop condition"]
    },
    {
      id: "24-next-link",
      type: "code",
      title: "Next link riadi cyklus",
      code: {
        language: "python",
        label: "pagination.py",
        runnable: false,
        code: `next_link = soup.select_one("a.next")

if next_link is None:
    next_url = None
else:
    next_url = urljoin(current_url, next_link.get("href", ""))`
      }
    },
    {
      id: "25-deduplicate",
      type: "code",
      title: "Pri viacerých stránkach riešime duplicity",
      code: {
        language: "python",
        label: "deduplicate.py",
        runnable: true,
        code: `seen_urls: set[str] = set()

url = "https://example.com/products/42"

if url not in seen_urls:
    seen_urls.add(url)
    print("new product")`
      }
    },
    {
      id: "26-export",
      type: "code",
      title: "Export do známeho formátu",
      code: {
        language: "python",
        label: "export.py",
        runnable: false,
        code: `import csv

with open("products.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "price", "url"])
    writer.writeheader()
    writer.writerows(product_rows)`
      }
    },
    {
      id: "27-js-section",
      type: "section",
      title: "Keď dáta nie sú v HTML",
      subtitle: "Browser môže obsah doplniť až po spustení JavaScriptu."
    },
    {
      id: "28-data-not-in-html",
      type: "question",
      title: "Prečo `httpx.get()` dáta nevidí?",
      prompt: "V prehliadači tabuľka existuje, ale v stiahnutom HTML nie je. Čo sa pravdepodobne stalo po načítaní stránky?"
    },
    {
      id: "29-static-vs-js",
      type: "compare",
      title: "Server-rendered stránka vs. JavaScript aplikácia",
      columns: [
        {
          title: "HTML už obsahuje dáta",
          items: ["HTTPX + BeautifulSoup stačí", "rýchlejšie", "jednoduchšie testovanie", "menej zdrojov"]
        },
        {
          title: "HTML je iba shell",
          items: ["JavaScript načíta dáta neskôr", "DOM sa mení v browseri", "treba hľadať interné API alebo použiť browser"]
        }
      ]
    },
    {
      id: "30-network-first",
      type: "takeaway",
      title: "Pred browser automatizáciou pozrite Network",
      points: [
        "DevTools -> Network -> Fetch/XHR",
        "ak stránka volá interné API, často je lepšie volať toto API",
        "browser automatizujeme až vtedy, keď jednoduchší request nestačí"
      ]
    },
    {
      id: "31-playwright-section",
      type: "section",
      title: "Playwright",
      subtitle: "Reálny browser pre dynamické stránky a interakcie."
    },
    {
      id: "32-first-playwright",
      type: "code",
      title: "Prvý Playwright script",
      code: {
        language: "python",
        label: "browser.py",
        runnable: false,
        code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()`
      }
    },
    {
      id: "33-locators",
      type: "code",
      title: "Locators hľadajú prvky v browseri",
      code: {
        language: "python",
        label: "locators.py",
        runnable: false,
        code: `page.get_by_role("button", name="Search")
page.get_by_text("Add to cart")
page.locator(".product .price")`
      }
    },
    {
      id: "34-form-interaction",
      type: "code",
      title: "Interakcia s formulárom",
      code: {
        language: "python",
        label: "form.py",
        runnable: false,
        code: `page.get_by_label("Search").fill("Python")
page.get_by_role("button", name="Search").click()

results = page.locator(".result")`
      }
    },
    {
      id: "35-wait-question",
      type: "question",
      title: "Čo je problém?",
      prompt: "`time.sleep(10)` po každom kliknutí v browser automation skripte"
    },
    {
      id: "36-wait-for-state",
      type: "takeaway",
      title: "Nečakáme náhodný čas, čakáme na stav",
      points: [
        "Playwright veľa čakania rieši automaticky",
        "ak treba, čakáme na konkrétny locator alebo URL",
        "cieľom je odstrániť náhodné sleeps"
      ]
    },
    {
      id: "37-browser-extraction",
      type: "code",
      title: "Extrakcia dát z DOM",
      code: {
        language: "python",
        label: "extract.py",
        runnable: false,
        code: `prices = page.locator(".product .price")

for price in prices.all_text_contents():
    print(price.strip())`
      }
    },
    {
      id: "38-bs-vs-playwright",
      type: "compare",
      title: "BeautifulSoup alebo Playwright?",
      columns: [
        {
          title: "HTTPX + BeautifulSoup",
          items: ["HTML obsahuje dáta", "rýchlejšie", "menej zdrojov", "jednoduchšie testovanie"]
        },
        {
          title: "Playwright",
          items: ["JavaScript dopĺňa DOM", "kliknutia a formuláre", "browser state", "dynamické stránky"]
        }
      ]
    },
    {
      id: "39-tool-question",
      type: "question",
      title: "Čo by ste použili?",
      prompt: "Stránka má tabuľku priamo v HTML, bez loginu a bez JavaScript requestov. BeautifulSoup alebo Playwright?"
    },
    {
      id: "40-responsible-scraping",
      type: "takeaway",
      title: "Scraping musí byť zodpovedný",
      points: [
        "najprv hľadať oficiálne API",
        "rešpektovať podmienky služby a `robots.txt`",
        "nezaťažovať server zbytočnými requestmi",
        "cacheovať dáta, ak sa často nemenia",
        "nespracúvať citlivé údaje bez jasného dôvodu"
      ]
    },
    {
      id: "41-throttle",
      type: "code",
      title: "Jednoduché spomalenie requestov",
      code: {
        language: "python",
        label: "throttle.py",
        runnable: false,
        code: `import time

for url in urls:
    html = fetch_page(url)
    process(html)
    time.sleep(1.0)`
      }
    },
    {
      id: "42-parser-test",
      type: "code",
      title: "Parser testujeme bez internetu",
      code: {
        language: "python",
        label: "test_parser.py",
        runnable: false,
        code: `def test_parse_products():
    html = """
    <article class="product">
        <h2 class="name">Keyboard</h2>
        <span class="price">49.90 EUR</span>
    </article>
    """

    products = parse_products(html, "https://example.com")
    assert products[0].name == "Keyboard"`
      }
    },
    {
      id: "43-scraper-fragility",
      type: "statement",
      title: "Scraper je krehkejší než API klient",
      body: "HTML je primárne určené pre prehliadač a používateľa. Ak sa zmení názov triedy alebo štruktúra stránky, parser sa môže rozbiť bez zmeny významu stránky."
    },
    {
      id: "44-demo",
      type: "demo",
      title: "Demo: HTML -> structured data",
      points: [
        "HTTPX request",
        "BeautifulSoup parser",
        "CSS selector",
        "extrakcia textu",
        "dataclass `Product`",
        "ak zostane čas: krátky Playwright click"
      ]
    },
    {
      id: "45-summary-next",
      type: "takeaway",
      title: "Čo si odniesť",
      points: [
        "API je lepšie ako scraping, ak existuje a je vhodné.",
        "Statické HTML spracujeme cez HTTPX a BeautifulSoup.",
        "Dynamické stránky môžu vyžadovať Playwright.",
        "Download, parsing a export držte oddelene.",
        "Ďalšia téma: bezpečné programovanie v Pythone."
      ]
    }
  ],
  translations: {
    en: {
      title: "Web Scraping and Browser Automation",
      description: "Getting data from HTML pages, parsing with BeautifulSoup and automating dynamic websites with Playwright.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Web Scraping and Browser Automation"
        },
        "02-api-page-browser": {
          title: "API, Web Page and Browser Are Not the Same Thing",
          columns: [
            {
              title: "API",
              items: [
                "data for programs",
                "JSON or another format",
                "documented endpoints",
                "more stable contract"
              ]
            },
            {
              title: "Web page",
              items: [
                "HTML for the user",
                "DOM for the browser",
                "layout can change",
                "data may not be directly in HTML"
              ]
            }
          ]
        },
        "03-where-are-data": {
          title: "Where Is the Data?",
          prompt: "The browser displays a value, but we do not know a public API. Is the value directly in HTML, or did the page load it later with an additional request?"
        },
        "04-scraping-workflow": {
          title: "Web Scraping in Four Steps",
          diagramItems: ["download HTML", "parse document", "extract data", "save structured output"]
        },
        "05-html-minimum": {
          title: "HTML Minimum for a Scraper",
          body: "We need to understand tags, attributes, classes and nested elements."
        },
        "06-dom-tree": {
          title: "DOM Is the Document Tree"
        },
        "07-static-section": {
          title: "Static Page",
          subtitle: "If the HTML contains the data, we do not need to run a browser."
        },
        "08-download-html": {
          title: "Downloading HTML with HTTPX"
        },
        "09-request-can-fail": {
          title: "Downloading a Page Can Fail",
          points: [
            "invalid URL",
            "timeout",
            "404 or 500",
            "redirection",
            "blocking or rate limit"
          ]
        },
        "10-beautifulsoup-section": {
          title: "BeautifulSoup",
          subtitle: "We turn an HTML string into a tree that can be searched."
        },
        "11-parse-soup": {
          title: "HTML String -> Object Tree"
        },
        "12-find-find-all": {
          title: "`find` and `find_all`"
        },
        "13-css-selectors": {
          title: "CSS Selectors Are Practical"
        },
        "14-selector-question": {
          title: "Is This Selector Robust?",
          prompt: "`body > div:nth-child(4) > div > article:nth-child(2) > span`"
        },
        "15-text-attributes": {
          title: "Text and Attributes Are Different Data"
        },
        "16-product-section": {
          title: "Running Example",
          subtitle: "Product catalog: name, price, rating and link."
        },
        "17-product-html": {
          title: "Product as HTML"
        },
        "18-product-dataclass": {
          title: "A Scraper Should Produce Structured Data"
        },
        "19-parse-one-product": {
          title: "Parsing One Product"
        },
        "20-parser-function": {
          title: "Parser as a Separate Function"
        },
        "21-separate-steps": {
          title: "Download and Parsing Are Different Steps",
          columns: [
            {
              title: "unclear",
              items: [
                "request",
                "parse",
                "print",
                "save",
                "everything in one function"
              ]
            },
            {
              title: "testable",
              items: [
                "`fetch_page(url) -> str`",
                "`parse_products(html) -> list[Product]`",
                "`save_products(products)`",
                "the parser does not need the internet"
              ]
            }
          ]
        },
        "22-relative-url": {
          title: "Relative URLs Must Be Completed"
        },
        "23-pagination": {
          title: "Pagination Means Multiple Pages",
          diagramItems: ["fetch page", "extract data", "find next", "repeat", "stop condition"]
        },
        "24-next-link": {
          title: "Next Link Controls the Loop"
        },
        "25-deduplicate": {
          title: "Multiple Pages Require Deduplication"
        },
        "26-export": {
          title: "Export to a Known Format"
        },
        "27-js-section": {
          title: "When Data Is Not in the HTML",
          subtitle: "The browser may add content only after JavaScript runs."
        },
        "28-data-not-in-html": {
          title: "Why Does `httpx.get()` Not See the Data?",
          prompt: "The table exists in the browser, but not in the downloaded HTML. What probably happened after the page loaded?"
        },
        "29-static-vs-js": {
          title: "Server-Rendered Page vs. JavaScript Application",
          columns: [
            {
              title: "HTML already contains data",
              items: [
                "HTTPX + BeautifulSoup is enough",
                "faster",
                "simpler testing",
                "fewer resources"
              ]
            },
            {
              title: "HTML is only a shell",
              items: [
                "JavaScript loads data later",
                "DOM changes in the browser",
                "find the internal API or use a browser"
              ]
            }
          ]
        },
        "30-network-first": {
          title: "Check Network Before Browser Automation",
          points: [
            "DevTools -> Network -> Fetch/XHR",
            "if the page calls an internal API, calling that API is often better",
            "automate the browser only when a simpler request is not enough"
          ]
        },
        "31-playwright-section": {
          title: "Playwright",
          subtitle: "A real browser for dynamic pages and interactions."
        },
        "32-first-playwright": {
          title: "First Playwright Script"
        },
        "33-locators": {
          title: "Locators Find Elements in the Browser"
        },
        "34-form-interaction": {
          title: "Interacting with a Form"
        },
        "35-wait-question": {
          title: "What Is the Problem?",
          prompt: "`time.sleep(10)` after every click in a browser automation script"
        },
        "36-wait-for-state": {
          title: "Do Not Wait for a Random Time; Wait for State",
          points: [
            "Playwright handles much waiting automatically",
            "when needed, wait for a concrete locator or URL",
            "the goal is to remove random sleeps"
          ]
        },
        "37-browser-extraction": {
          title: "Extracting Data from the DOM"
        },
        "38-bs-vs-playwright": {
          title: "BeautifulSoup or Playwright?",
          columns: [
            {
              title: "HTTPX + BeautifulSoup",
              items: [
                "HTML contains the data",
                "faster",
                "fewer resources",
                "simpler testing"
              ]
            },
            {
              title: "Playwright",
              items: [
                "JavaScript updates the DOM",
                "clicks and forms",
                "browser state",
                "dynamic pages"
              ]
            }
          ]
        },
        "39-tool-question": {
          title: "What Would You Use?",
          prompt: "A page has a table directly in HTML, without login and without JavaScript requests. BeautifulSoup or Playwright?"
        },
        "40-responsible-scraping": {
          title: "Scraping Must Be Responsible",
          points: [
            "first look for an official API",
            "respect terms of service and `robots.txt`",
            "do not overload a server with unnecessary requests",
            "cache data if it does not change often",
            "do not process sensitive data without a clear reason"
          ]
        },
        "41-throttle": {
          title: "Simple Request Throttling"
        },
        "42-parser-test": {
          title: "Test the Parser Without the Internet"
        },
        "43-scraper-fragility": {
          title: "A Scraper Is More Fragile Than an API Client",
          body: "HTML is primarily designed for a browser and a user. If a class name or page structure changes, the parser may break even when the page meaning has not changed."
        },
        "44-demo": {
          title: "Demo: HTML -> Structured Data",
          points: [
            "HTTPX request",
            "BeautifulSoup parser",
            "CSS selector",
            "text extraction",
            "dataclass `Product`",
            "if time remains: a short Playwright click"
          ]
        },
        "45-summary-next": {
          title: "What to Take Away",
          points: [
            "An API is better than scraping when it exists and fits the task.",
            "Static HTML can be processed with HTTPX and BeautifulSoup.",
            "Dynamic pages may require Playwright.",
            "Keep download, parsing and export separated.",
            "Next topic: secure programming in Python."
          ]
        }
      }
    }
  }
} satisfies Lecture;
