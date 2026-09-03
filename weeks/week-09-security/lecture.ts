import type { Lecture } from "../../shared/slide.types";

export const lecture09 = {
  weekNumber: 9,
  slug: "09-bezpecne-programovanie",
  title: "Bezpečné programovanie v Pythone",
  description: "Praktické zvyky pri práci so vstupmi, súbormi, databázami, secrets, procesmi, závislosťami a chybami.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Bezpečné programovanie v Pythone"
    },
    {
      id: "02-not-offensive",
      type: "statement",
      title: "Bezpečnosť ako vlastnosť bežného kódu",
      body: "Nebudeme písať exploity. Budeme rozpoznávať bežné chyby v aplikačnom kóde a nahrádzať ich bezpečnejšími návykmi.",
      points: [
        "validácia vstupov",
        "bezpečné SQL a subprocess",
        "secrets mimo source code",
        "rozumné chyby, logy a závislosti"
      ]
    },
    {
      id: "03-first-question",
      type: "question",
      title: "Prvá otázka",
      prompt: "Čo ak vstup neposkytne človek, ktorý chce, aby aplikácia fungovala správne?"
    },
    {
      id: "04-attack-surface",
      type: "diagram",
      title: "Plocha útoku v našom kurze",
      diagramItems: ["user input", "files", "JSON", "database", "HTTP", "environment", "subprocess", "web"]
    },
    {
      id: "05-trust-boundary",
      type: "statement",
      title: "Vstupu neveríme naslepo",
      body: "Vstup nemusí mať správny typ, správny rozsah, očakávaný formát ani dobrý úmysel.",
      points: [
        "dáta z formulára",
        "argumenty CLI",
        "JSON z API",
        "názvy súborov",
        "environment variables"
      ]
    },
    {
      id: "06-validation",
      type: "split-code",
      title: "Konverzia nie je celá validácia",
      codeBlocks: [
        {
          language: "python",
          label: "iba syntakticky",
          runnable: false,
          code: `user_input = "-500"
age = int(user_input)`
        },
        {
          language: "python",
          label: "aj významovo",
          runnable: false,
          code: `age = int(user_input)

if not 0 <= age <= 130:
    raise ValueError("Neplatný vek")`
        }
      ]
    },
    {
      id: "07-allowlist",
      type: "code",
      title: "Allowlist býva jednoduchší než blocklist",
      code: {
        language: "python",
        label: "allowlist.py",
        runnable: true,
        code: `allowed_extensions = {".txt", ".csv", ".json"}
suffix = ".csv"

if suffix not in allowed_extensions:
    raise ValueError("Nepovolený typ súboru")`
      }
    },
    {
      id: "08-validation-question",
      type: "question",
      title: "Čo ešte kontrolovať?",
      prompt: "Používateľ zadá názov súboru `report.csv`. Stačí skontrolovať príponu, alebo nás zaujíma aj veľkosť, umiestnenie a obsah?"
    },
    {
      id: "09-sql-section",
      type: "section",
      title: "SQL injection",
      subtitle: "Chyba, ktorej sa dá vyhnúť jednoduchým návykom."
    },
    {
      id: "10-sql-bad",
      type: "code",
      title: "Zle: SQL skladané ako string",
      code: {
        language: "python",
        label: "bad_sql.py",
        variant: "bad",
        runnable: false,
        code: `name = input("Meno: ")

query = f"SELECT * FROM users WHERE name = '{name}'"
cursor.execute(query)`
      }
    },
    {
      id: "11-sql-question",
      type: "question",
      title: "Kto skladá SQL?",
      prompt: "Má `name` v tomto kóde význam iba hodnoty, alebo môže zmeniť štruktúru SQL dotazu?"
    },
    {
      id: "12-sql-good",
      type: "code",
      title: "Lepšie: parametrizovaný dotaz",
      code: {
        language: "python",
        label: "good_sql.py",
        variant: "good",
        runnable: false,
        code: `name = input("Meno: ")

cursor.execute(
    "SELECT * FROM users WHERE name = ?",
    (name,),
)`
      }
    },
    {
      id: "13-subprocess-section",
      type: "section",
      title: "subprocess",
      subtitle: "Externý program spúšťame s jasne oddelenými argumentmi."
    },
    {
      id: "14-command-bad",
      type: "code",
      title: "Zle: command cez shell",
      code: {
        language: "python",
        label: "bad_subprocess.py",
        variant: "bad",
        runnable: false,
        code: `import subprocess

host = input("Host: ")
subprocess.run(f"ping {host}", shell=True)`
      }
    },
    {
      id: "15-command-good",
      type: "code",
      title: "Lepšie: program a argumenty oddelene",
      code: {
        language: "python",
        label: "safe_subprocess.py",
        variant: "good",
        runnable: false,
        code: `import subprocess

host = input("Host: ")
subprocess.run(["ping", host], check=True)`
      }
    },
    {
      id: "16-shell-question",
      type: "question",
      title: "Prečo je `shell=True` rizikové?",
      prompt: "Čo sa mení, keď časť commandu pochádza od používateľa a celý text interpretujeme cez shell?"
    },
    {
      id: "17-eval-section",
      type: "section",
      title: "Spúšťanie textu ako kódu",
      subtitle: "`eval`, `exec` a nedôveryhodná serializácia."
    },
    {
      id: "18-eval",
      type: "code",
      title: "`eval()` vyhodnotí Python výraz",
      code: {
        language: "python",
        label: "eval.py",
        variant: "bad",
        runnable: false,
        code: `user_input = input("Expression: ")
result = eval(user_input)`
      }
    },
    {
      id: "19-eval-alternatives",
      type: "compare",
      title: "Alternatíva závisí od účelu",
      columns: [
        {
          title: "Ak chceme voľbu",
          items: ["mapping string -> funkcia", "allowlist operácií", "žiadne vykonávanie textu ako kódu"]
        },
        {
          title: "Ak chceme dáta",
          items: ["JSON", "`ast.literal_eval` iba pre literal dáta", "vlastný parser pri vlastnej syntaxi"]
        }
      ]
    },
    {
      id: "20-exec",
      type: "statement",
      title: "`exec()` je rovnaká kategória rizika",
      body: "`exec()` vykonáva Python statements. Pri nedôveryhodnom vstupe je to priame spúšťanie cudzieho kódu v našom procese."
    },
    {
      id: "21-pickle-question",
      type: "question",
      title: "Môžeme načítať tento pickle?",
      prompt: "`pickle.loads(untrusted_data)`"
    },
    {
      id: "22-pickle-json",
      type: "compare",
      title: "Pickle nie je bezpečný výmenný formát",
      columns: [
        {
          title: "pickle",
          items: ["Python-specific", "vie obnovovať objekty", "nepoužívať pre nedôveryhodné dáta"]
        },
        {
          title: "JSON",
          items: ["jednoduché dátové typy", "vhodnejší na výmenu dát", "obsah stále validujeme"]
        }
      ]
    },
    {
      id: "23-yaml",
      type: "statement",
      title: "Pozor aj na loadery",
      body: "Niektoré serializačné knižnice vedia vytvárať objekty alebo spúšťať špeciálne konštruktory. Pri nedôveryhodných dátach používajte bezpečný loader a čítajte dokumentáciu."
    },
    {
      id: "24-path-section",
      type: "section",
      title: "Súbory a cesty",
      subtitle: "Názov súboru od používateľa nie je automaticky bezpečná cesta."
    },
    {
      id: "25-path-traversal",
      type: "code",
      title: "Path traversal",
      body: "Filename môže obsahovať časti cesty, ktoré programátor nečakal.",
      code: {
        language: "python",
        label: "path_bad.py",
        variant: "bad",
        runnable: false,
        code: `from pathlib import Path

upload_dir = Path("uploads")
filename = "../../config.txt"

path = upload_dir / filename`
      }
    },
    {
      id: "26-safe-path",
      type: "code",
      title: "Cesta musí zostať v povolenom adresári",
      code: {
        language: "python",
        label: "path_safe.py",
        runnable: false,
        code: `base = Path("uploads").resolve()
target = (base / filename).resolve()

if not target.is_relative_to(base):
    raise ValueError("Cesta mimo uploads")`
      }
    },
    {
      id: "27-file-upload",
      type: "bullets",
      title: "Pri súboroch nestačí veriť názvu",
      points: [
        "extension nie je dôkaz obsahu",
        "MIME type môže byť zavádzajúci",
        "treba riešiť veľkosť súboru",
        "ukladať mimo citlivých miest",
        "chybové stavy riešiť explicitne"
      ]
    },
    {
      id: "28-secrets-section",
      type: "section",
      title: "Secrets a konfigurácia",
      subtitle: "Heslá, tokeny a API keys nepatria do source code."
    },
    {
      id: "29-hardcoded-secret",
      type: "code",
      title: "Secret v Gite zostáva problém",
      code: {
        language: "python",
        label: "bad_secret.py",
        variant: "bad",
        runnable: true,
        code: `API_KEY = "abc123-secret-value"

print("Calling API...")`
      }
    },
    {
      id: "30-env-vars",
      type: "code",
      title: "Konfigurácia cez environment",
      code: {
        language: "python",
        label: "env.py",
        runnable: false,
        code: `import os

api_key = os.environ["API_KEY"]
base_url = os.getenv("API_BASE_URL", "https://api.example.com")`
      }
    },
    {
      id: "31-dotenv",
      type: "split-code",
      title: "`.env` je development convenience",
      codeBlocks: [
        {
          language: "text",
          label: ".env",
          code: `API_KEY=local-development-key`
        },
        {
          language: "text",
          label: ".gitignore",
          code: `.env
.env.*`
        }
      ]
    },
    {
      id: "32-random-secrets",
      type: "compare",
      title: "`random` a `secrets` majú iný účel",
      columns: [
        {
          title: "`random`",
          items: ["simulácie", "testovacie dáta", "náhodný výber v aplikácii"]
        },
        {
          title: "`secrets`",
          items: ["reset token", "API token", "security-sensitive random value"]
        }
      ]
    },
    {
      id: "33-token",
      type: "code",
      title: "Token generujeme cez `secrets`",
      code: {
        language: "python",
        label: "token.py",
        runnable: true,
        code: `import secrets

token = secrets.token_urlsafe(32)
print(token)`
      }
    },
    {
      id: "34-crypto-terms",
      type: "table",
      title: "Hashing, encryption, encoding",
      table: {
        headers: ["Pojem", "Význam"],
        rows: [
          ["Hashing", "one-way odtlačok dát"],
          ["Encryption", "reverzibilné šifrovanie s kľúčom"],
          ["Encoding", "zmena reprezentácie, nie bezpečnosť"]
        ]
      }
    },
    {
      id: "35-passwords",
      type: "takeaway",
      title: "Heslá neukladáme plaintext",
      points: [
        "obyčajný SHA-256 hash nie je dobrý password storage scheme",
        "potrebujeme salt a password hashing function",
        "Argon2, bcrypt alebo scrypt sú správna kategória nástrojov",
        "nevymýšľame vlastný algoritmus"
      ]
    },
    {
      id: "36-cryptography",
      type: "code",
      title: "Používame high-level crypto API",
      code: {
        language: "python",
        label: "fernet.py",
        runnable: false,
        code: `from cryptography.fernet import Fernet

key = Fernet.generate_key()
fernet = Fernet(key)

token = fernet.encrypt(b"secret data")
plain = fernet.decrypt(token)`
      }
    },
    {
      id: "37-http-section",
      type: "section",
      title: "HTTP a závislosti",
      subtitle: "Bezpečnosť nekončí pri vlastnom kóde."
    },
    {
      id: "38-https",
      type: "compare",
      title: "HTTP vs HTTPS",
      columns: [
        {
          title: "HTTP",
          items: ["bez šifrovania prenosu", "nevhodné pre citlivé dáta", "ľahšie odpočúvateľné"]
        },
        {
          title: "HTTPS",
          items: ["encryption in transit", "identita servera cez certifikát", "štandard pre produkčné API"]
        }
      ]
    },
    {
      id: "39-verify-false",
      type: "code",
      title: "`verify=False` nie je oprava problému",
      code: {
        language: "python",
        label: "bad_tls.py",
        variant: "bad",
        runnable: false,
        code: `import httpx

response = httpx.get(
    "https://example.com",
    verify=False,
)`
      }
    },
    {
      id: "40-dependencies",
      type: "bullets",
      title: "Third-party packages sú súčasť attack surface",
      points: [
        "známe zraniteľnosti",
        "opustený balík",
        "preklep v názve package",
        "dependency chain",
        "nepotrebné balíky v projekte"
      ]
    },
    {
      id: "41-tools",
      type: "split-code",
      title: "Nástroje vedia upozorniť na známe problémy",
      codeBlocks: [
        {
          language: "bash",
          label: "static analysis",
          code: `bandit -r .`
        },
        {
          language: "bash",
          label: "dependency audit",
          code: `pip-audit`
        }
      ]
    },
    {
      id: "42-logging-errors",
      type: "section",
      title: "Logy a chybové správy",
      subtitle: "Aj diagnostika môže prezradiť priveľa."
    },
    {
      id: "43-bad-logging",
      type: "code",
      title: "Logy nesmú obsahovať secrets",
      code: {
        language: "python",
        label: "bad_logging.py",
        variant: "bad",
        runnable: true,
        code: `import logging

username = "anna"
password = "secret"

logging.info("Login: %s / %s", username, password)`
      }
    },
    {
      id: "44-review-snippet",
      type: "code",
      title: "Krátky security review",
      code: {
        language: "python",
        label: "review_me.py",
        variant: "bad",
        runnable: false,
        code: `API_KEY = "dev-key"
name = input("Name: ")
host = input("Host: ")

query = f"SELECT * FROM users WHERE name = '{name}'"
subprocess.run(f"ping {host}", shell=True)

try:
    cursor.execute(query)
except:
    pass`
      }
    },
    {
      id: "45-summary-next",
      type: "takeaway",
      title: "Čo si odniesť",
      points: [
        "Validujte vstupy na hranici systému.",
        "SQL skladajte cez parametre, nie cez f-string.",
        "Nedôveryhodný text nespúšťajte ako Python ani shell command.",
        "Secrets, závislosti a logy sú súčasť bezpečnosti.",
        "Ďalšia téma: Web backend v Pythone."
      ]
    }
  ],
  translations: {
    en: {
      title: "Secure Programming in Python",
      description: "Practical habits when working with input, files, databases, secrets, processes, dependencies and errors.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Secure Programming in Python"
        },
        "02-not-offensive": {
          title: "Security as a Property of Ordinary Code",
          body: "We will not write exploits. We will recognize common mistakes in application code and replace them with safer habits.",
          points: [
            "input validation",
            "safe SQL and subprocess usage",
            "secrets outside source code",
            "reasonable errors, logs and dependencies"
          ]
        },
        "03-first-question": {
          title: "First Question",
          prompt: "What if the input is not provided by a person who wants the application to work correctly?"
        },
        "04-attack-surface": {
          title: "Attack Surface in Our Course",
          diagramItems: ["user input", "files", "JSON", "database", "HTTP", "environment", "subprocess", "web"]
        },
        "05-trust-boundary": {
          title: "Do Not Trust Input Blindly",
          body: "Input may have the wrong type, wrong range, unexpected format or bad intent.",
          points: [
            "form data",
            "CLI arguments",
            "JSON from an API",
            "file names",
            "environment variables"
          ]
        },
        "06-validation": {
          title: "Conversion Is Not Full Validation",
          codeBlocks: [
            { label: "only syntactic" },
            {
              label: "also semantic",
              code: `age = int(user_input)

if not 0 <= age <= 130:
    raise ValueError("Invalid age")`
            }
          ]
        },
        "07-allowlist": {
          title: "Allowlist Is Often Simpler Than Blocklist",
          code: {
            code: `allowed_extensions = {".txt", ".csv", ".json"}
suffix = ".csv"

if suffix not in allowed_extensions:
    raise ValueError("Unsupported file type")`
          }
        },
        "08-validation-question": {
          title: "What Else Should We Check?",
          prompt: "The user enters file name `report.csv`. Is checking the extension enough, or do size, location and content also matter?"
        },
        "09-sql-section": {
          title: "SQL Injection",
          subtitle: "A mistake that can be avoided with simple habits."
        },
        "10-sql-bad": {
          title: "Bad: SQL Built as a String",
          code: {
            code: `name = input("Name: ")

query = f"SELECT * FROM users WHERE name = '{name}'"
cursor.execute(query)`
          }
        },
        "11-sql-question": {
          title: "Who Builds the SQL?",
          prompt: "Does `name` in this code mean only a value, or can it change the structure of the SQL query?"
        },
        "12-sql-good": {
          title: "Better: Parameterized Query",
          code: {
            code: `name = input("Name: ")

cursor.execute(
    "SELECT * FROM users WHERE name = ?",
    (name,),
)`
          }
        },
        "13-subprocess-section": {
          title: "subprocess",
          subtitle: "Run an external program with clearly separated arguments."
        },
        "14-command-bad": {
          title: "Bad: Command Through a Shell"
        },
        "15-command-good": {
          title: "Better: Program and Arguments Separated"
        },
        "16-shell-question": {
          title: "Why Is `shell=True` Risky?",
          prompt: "What changes when part of a command comes from user input and the whole text is interpreted by a shell?"
        },
        "17-eval-section": {
          title: "Running Text as Code",
          subtitle: "`eval`, `exec` and untrusted serialization."
        },
        "18-eval": {
          title: "`eval()` Evaluates a Python Expression"
        },
        "19-eval-alternatives": {
          title: "The Alternative Depends on the Goal",
          columns: [
            {
              title: "If we want a choice",
              items: [
                "mapping string -> function",
                "allowlist of operations",
                "no execution of text as code"
              ]
            },
            {
              title: "If we want data",
              items: [
                "JSON",
                "`ast.literal_eval` only for literal data",
                "a custom parser for custom syntax"
              ]
            }
          ]
        },
        "20-exec": {
          title: "`exec()` Is the Same Risk Category",
          body: "`exec()` executes Python statements. With untrusted input, it is direct execution of someone else's code inside our process."
        },
        "21-pickle-question": {
          title: "Can We Load This Pickle?",
          prompt: "`pickle.loads(untrusted_data)`"
        },
        "22-pickle-json": {
          title: "Pickle Is Not a Safe Exchange Format",
          columns: [
            {
              title: "pickle",
              items: [
                "Python-specific",
                "can restore objects",
                "do not use it for untrusted data"
              ]
            },
            {
              title: "JSON",
              items: [
                "simple data types",
                "more suitable for data exchange",
                "content must still be validated"
              ]
            }
          ]
        },
        "23-yaml": {
          title: "Watch the Loaders Too",
          body: "Some serialization libraries can create objects or execute special constructors. For untrusted data, use a safe loader and read the documentation."
        },
        "24-path-section": {
          title: "Files and Paths",
          subtitle: "A file name from the user is not automatically a safe path."
        },
        "25-path-traversal": {
          title: "Path Traversal",
          body: "A filename can contain path parts the programmer did not expect."
        },
        "26-safe-path": {
          title: "The Path Must Stay Inside the Allowed Directory",
          code: {
            code: `base = Path("uploads").resolve()
target = (base / filename).resolve()

if not target.is_relative_to(base):
    raise ValueError("Path outside uploads")`
          }
        },
        "27-file-upload": {
          title: "With Files, the Name Is Not Enough",
          points: [
            "extension does not prove content",
            "MIME type may be misleading",
            "file size must be handled",
            "store outside sensitive locations",
            "handle error states explicitly"
          ]
        },
        "28-secrets-section": {
          title: "Secrets and Configuration",
          subtitle: "Passwords, tokens and API keys do not belong in source code."
        },
        "29-hardcoded-secret": {
          title: "A Secret in Git Remains a Problem"
        },
        "30-env-vars": {
          title: "Configuration Through the Environment"
        },
        "31-dotenv": {
          title: "`.env` Is a Development Convenience"
        },
        "32-random-secrets": {
          title: "`random` and `secrets` Have Different Purposes",
          columns: [
            {
              title: "`random`",
              items: [
                "simulations",
                "test data",
                "random selection in an application"
              ]
            },
            {
              title: "`secrets`",
              items: [
                "reset token",
                "API token",
                "security-sensitive random value"
              ]
            }
          ]
        },
        "33-token": {
          title: "Generate Tokens with `secrets`"
        },
        "34-crypto-terms": {
          title: "Hashing, Encryption, Encoding",
          table: {
            headers: ["Term", "Meaning"],
            rows: [
              ["Hashing", "one-way fingerprint of data"],
              ["Encryption", "reversible encryption with a key"],
              ["Encoding", "change of representation, not security"]
            ]
          }
        },
        "35-passwords": {
          title: "Do Not Store Passwords as Plaintext",
          points: [
            "a plain SHA-256 hash is not a good password storage scheme",
            "we need a salt and a password hashing function",
            "Argon2, bcrypt or scrypt are the right category of tools",
            "do not invent your own algorithm"
          ]
        },
        "36-cryptography": {
          title: "Use High-Level Crypto APIs"
        },
        "37-http-section": {
          title: "HTTP and Dependencies",
          subtitle: "Security does not end with our own code."
        },
        "38-https": {
          title: "HTTP vs HTTPS",
          columns: [
            {
              title: "HTTP",
              items: [
                "no transport encryption",
                "not suitable for sensitive data",
                "easier to eavesdrop on"
              ]
            },
            {
              title: "HTTPS",
              items: [
                "encryption in transit",
                "server identity through a certificate",
                "standard for production APIs"
              ]
            }
          ]
        },
        "39-verify-false": {
          title: "`verify=False` Is Not a Fix"
        },
        "40-dependencies": {
          title: "Third-Party Packages Are Part of the Attack Surface",
          points: [
            "known vulnerabilities",
            "abandoned package",
            "typo in a package name",
            "dependency chain",
            "unnecessary packages in the project"
          ]
        },
        "41-tools": {
          title: "Tools Can Warn About Known Problems"
        },
        "42-logging-errors": {
          title: "Logs and Error Messages",
          subtitle: "Diagnostics can also reveal too much."
        },
        "43-bad-logging": {
          title: "Logs Must Not Contain Secrets"
        },
        "44-review-snippet": {
          title: "Short Security Review"
        },
        "45-summary-next": {
          title: "What to Take Away",
          points: [
            "Validate inputs at the system boundary.",
            "Build SQL with parameters, not f-strings.",
            "Do not execute untrusted text as Python or a shell command.",
            "Secrets, dependencies and logs are part of security.",
            "Next topic: web backend in Python."
          ]
        }
      }
    }
  }
} satisfies Lecture;
