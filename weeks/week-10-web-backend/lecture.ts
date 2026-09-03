import type { Lecture } from "../../shared/slide.types";

export const lecture10 = {
  weekNumber: 10,
  slug: "10-web-backend",
  title: "Web backend v Pythone",
  description: "Základy tvorby vlastného HTTP API vo FastAPI s validáciou, databázou, testovaním a bezpečnými návykmi.",
  duration: "50-60 minút",
  slides: [
    {
      id: "01-title",
      type: "title",
      title: "Web backend v Pythone"
    },
    {
      id: "02-client-server-switch",
      type: "compare",
      title: "Od API klienta k API serveru",
      columns: [
        {
          title: "API klient",
          items: ["náš program posiela request", "cudzí server odpovedá", "spracujeme JSON", "riešime timeouty a chyby"]
        },
        {
          title: "API server",
          items: ["cudzí klient posiela request", "naša aplikácia odpovedá", "validujeme vstup", "vraciame status code a JSON"]
        }
      ]
    },
    {
      id: "03-backend-responsibilities",
      type: "diagram",
      title: "Backend spája viac vrstiev",
      diagramItems: ["HTTP", "routing", "validation", "business logic", "database", "response"]
    },
    {
      id: "04-own-api-question",
      type: "question",
      title: "Čo musí vedieť vlastné API?",
      prompt: "Ak klient pošle `POST /students` s JSON body, čo musí backend skontrolovať, uložiť a vrátiť?"
    },
    {
      id: "05-fastapi",
      type: "statement",
      title: "FastAPI",
      body: "FastAPI je Python web framework pre tvorbu HTTP API. Priamo využíva type hints, Pydantic modely a generuje OpenAPI popis endpointov.",
      points: [
        "route decorator spája URL s Python funkciou",
        "type hints pomáhajú validácii a dokumentácii",
        "návratová hodnota sa serializuje ako response"
      ]
    },
    {
      id: "06-first-app",
      type: "code",
      title: "Minimálna aplikácia",
      code: {
        language: "python",
        label: "main.py",
        runnable: false,
        highlightLines: [3, 6],
        code: `from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello"}`
      }
    },
    {
      id: "07-run-app",
      type: "code",
      title: "Spustenie development servera",
      code: {
        language: "bash",
        label: "terminal",
        code: `uvicorn main:app --reload`
      }
    },
    {
      id: "08-main-app",
      type: "statement",
      title: "`main:app` je adresa objektu aplikácie",
      body: "`main` je Python modul a `app` je premenná, ktorá obsahuje FastAPI aplikáciu. `--reload` patrí do vývoja, nie ako produkčný proces manager.",
      points: [
        "zmena súboru reštartuje development server",
        "chyby sú viditeľné rýchlo",
        "produkčné nasadenie rieši samostatná vrstva"
      ]
    },
    {
      id: "09-request-endpoint-response",
      type: "diagram",
      title: "Request -> endpoint -> response",
      diagramItems: ["GET /students", "route match", "Python function", "return value", "JSON response"]
    },
    {
      id: "10-routing-section",
      type: "section",
      title: "Routing",
      subtitle: "HTTP method a path určujú, ktorá funkcia sa zavolá."
    },
    {
      id: "11-routing",
      type: "code",
      title: "Kolekcia a detail",
      code: {
        language: "python",
        label: "routes.py",
        runnable: false,
        code: `@app.get("/students")
def list_students():
    return students


@app.get("/students/{student_id}")
def get_student(student_id: int):
    return find_student(student_id)`
      }
    },
    {
      id: "12-path-parameters",
      type: "code",
      title: "Path parameter má typ",
      body: "FastAPI použije type hint na konverziu hodnoty z URL.",
      code: {
        language: "python",
        label: "path.py",
        runnable: false,
        code: `@app.get("/students/{student_id}")
def get_student(student_id: int):
    return {"student_id": student_id}`
      }
    },
    {
      id: "13-query-parameters",
      type: "code",
      title: "Query parameters filtrujú alebo menia výpis",
      code: {
        language: "python",
        label: "query.py",
        runnable: false,
        code: `@app.get("/students")
def list_students(
    course: str | None = None,
    limit: int = 20,
):
    return search_students(course=course, limit=limit)`
      }
    },
    {
      id: "14-path-query-question",
      type: "question",
      title: "Path alebo query?",
      prompt: "`/students/42` a `/students?course=Python` používajú iný typ parametra. Ktorý identifikuje konkrétny resource a ktorý filtruje zoznam?"
    },
    {
      id: "15-status-codes",
      type: "table",
      title: "API hovorí aj cez status code",
      table: {
        headers: ["Status", "Typická situácia"],
        rows: [
          ["200", "úspešné načítanie"],
          ["201", "vytvorený resource"],
          ["204", "úspech bez response body"],
          ["400", "neplatná požiadavka"],
          ["404", "resource neexistuje"],
          ["422", "validácia vstupu zlyhala"]
        ]
      }
    },
    {
      id: "16-request-body-section",
      type: "section",
      title: "Request body",
      subtitle: "Pri vytváraní alebo úprave dát posiela klient JSON."
    },
    {
      id: "17-pydantic-model",
      type: "code",
      title: "Pydantic model opisuje vstup",
      code: {
        language: "python",
        label: "schemas.py",
        runnable: false,
        code: `from pydantic import BaseModel


class StudentCreate(BaseModel):
    name: str
    email: str`
      }
    },
    {
      id: "18-json-validation-flow",
      type: "diagram",
      title: "JSON input -> validácia -> Python objekt",
      diagramItems: ["request body", "Pydantic validation", "StudentCreate", "endpoint function"]
    },
    {
      id: "19-field-validation",
      type: "code",
      title: "Pravidlá nad poľami",
      code: {
        language: "python",
        label: "fields.py",
        runnable: false,
        code: `from pydantic import BaseModel, Field


class ResultCreate(BaseModel):
    student_id: int
    course_id: int
    points: int = Field(ge=0, le=100)`
      }
    },
    {
      id: "20-response-model",
      type: "code",
      title: "Input a output model nemusia byť rovnaké",
      code: {
        language: "python",
        label: "response.py",
        runnable: false,
        code: `class StudentResponse(BaseModel):
    id: int
    name: str


@app.post("/students", response_model=StudentResponse)
def create_student(student: StudentCreate):
    return save_student(student)`
      }
    },
    {
      id: "21-validation-question",
      type: "question",
      title: "Čo sa stane pri nevalidnom type?",
      prompt: "Endpoint očakáva `points: int`, ale klient pošle JSON s hodnotou `\"abc\"`. Má backend vrátiť úspech, 404, validačnú chybu alebo traceback?"
    },
    {
      id: "22-http-exception",
      type: "code",
      title: "HTTPException pre očakávané chyby",
      code: {
        language: "python",
        label: "errors.py",
        runnable: false,
        code: `from fastapi import HTTPException


if student is None:
    raise HTTPException(
        status_code=404,
        detail="Student not found",
    )`
      }
    },
    {
      id: "23-crud-api",
      type: "code",
      title: "Students API ako malý CRUD povrch",
      code: {
        language: "text",
        label: "endpoints",
        code: `GET    /students
GET    /students/{id}
POST   /students
PATCH  /students/{id}
DELETE /students/{id}`
      }
    },
    {
      id: "24-in-memory-section",
      type: "section",
      title: "Od pamäte k databáze",
      subtitle: "Na pochopenie HTTP stačí zoznam, na reálnu aplikáciu nie."
    },
    {
      id: "25-in-memory",
      type: "code",
      title: "In-memory verzia je iba medzikrok",
      code: {
        language: "python",
        label: "memory.py",
        runnable: false,
        code: `students: list[dict] = []


@app.post("/students")
def create_student(student: StudentCreate):
    students.append(student.model_dump())
    return student`
      }
    },
    {
      id: "26-restart-question",
      type: "question",
      title: "Čo sa stane po reštarte servera?",
      prompt: "Ak sú všetci študenti uložený iba v `students = []`, čo zostane po vypnutí a zapnutí aplikácie?"
    },
    {
      id: "27-database-flow",
      type: "diagram",
      title: "Backend potrebuje perzistenciu",
      diagramItems: ["HTTP request", "FastAPI route", "application function", "SQLAlchemy", "database"]
    },
    {
      id: "28-sqlalchemy-model",
      type: "code",
      title: "Databázový model",
      code: {
        language: "python",
        label: "models.py",
        runnable: false,
        code: `class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)`
      }
    },
    {
      id: "29-depends",
      type: "code",
      title: "`Depends` pripraví dependency pre endpoint",
      code: {
        language: "python",
        label: "session.py",
        runnable: false,
        code: `from fastapi import Depends
from sqlalchemy.orm import Session


def get_session():
    with Session(engine) as session:
        yield session`
      }
    },
    {
      id: "30-create-with-db",
      type: "code",
      title: "POST s databázou",
      code: {
        language: "python",
        label: "create_db.py",
        runnable: false,
        code: `@app.post("/students", response_model=StudentResponse, status_code=201)
def create_student(
    data: StudentCreate,
    session: Session = Depends(get_session),
):
    student = Student(name=data.name, email=data.email)
    session.add(student)
    session.commit()
    session.refresh(student)
    return student`
      }
    },
    {
      id: "31-integrity-error",
      type: "code",
      title: "Databázová chyba má byť HTTP odpoveď",
      code: {
        language: "python",
        label: "integrity.py",
        runnable: false,
        code: `try:
    session.commit()
except IntegrityError:
    session.rollback()
    raise HTTPException(
        status_code=409,
        detail="Email already exists",
    )`
      }
    },
    {
      id: "32-separation",
      type: "compare",
      title: "Endpoint nemá byť skladisko všetkej logiky",
      columns: [
        {
          title: "neprehľadné",
          items: ["HTTP", "validácia navyše", "SQL", "výpočty", "externé API", "formatovanie"]
        },
        {
          title: "udržateľné",
          items: ["route rieši HTTP", "funkcia rieši aplikačnú logiku", "databázový helper rieši perzistenciu"]
        }
      ]
    },
    {
      id: "33-openapi-section",
      type: "section",
      title: "Dokumentácia API",
      subtitle: "Kontrakt API má byť čitateľný pre človeka aj nástroje."
    },
    {
      id: "34-openapi",
      type: "statement",
      title: "OpenAPI vzniká z typov a endpointov",
      body: "FastAPI vie z route dekorátorov, type hints a Pydantic modelov vytvoriť popis API.",
      points: [
        "zoznam endpointov",
        "request/response schema",
        "validované typy",
        "interaktívne rozhranie na `/docs`"
      ]
    },
    {
      id: "35-docs-question",
      type: "question",
      title: "Prečo nestačí ústne vysvetlenie API?",
      prompt: "Klientský tím potrebuje vedieť presný tvar requestu, response a chýb. Ktoré časti API kontraktu musia byť explicitné?"
    },
    {
      id: "36-security-section",
      type: "section",
      title: "Bezpečnostný základ backendu",
      subtitle: "Predchádzajúca prednáška sa zrazu týka každého endpointu."
    },
    {
      id: "37-authn-authz",
      type: "compare",
      title: "Authentication vs. authorization",
      columns: [
        {
          title: "authentication",
          items: ["Who are you?", "overenie identity", "login, token, session"]
        },
        {
          title: "authorization",
          items: ["What are you allowed to do?", "oprávnenia", "role, scopes, vlastníctvo dát"]
        }
      ]
    },
    {
      id: "38-security-checklist",
      type: "bullets",
      title: "Backend bezpečnostný základ",
      points: [
        "validovať vstupy cez Pydantic",
        "nevracať interné tracebacks používateľovi",
        "parameterizovaný databázový prístup",
        "secrets mimo source code",
        "timeouty pri volaní externých služieb",
        "HTTPS v produkcii"
      ]
    },
    {
      id: "39-cors",
      type: "statement",
      title: "CORS stretnete pri browser frontende",
      body: "Ak frontend beží na inej origin než API, browser môže vyžadovať CORS povolenie. Nie je to databázová ani Python chyba."
    },
    {
      id: "40-testing-section",
      type: "section",
      title: "Testovanie API",
      subtitle: "Endpoint je správanie, ktoré vieme testovať bez ručného klikania."
    },
    {
      id: "41-test-client",
      type: "code",
      title: "TestClient: request bez reálneho servera",
      code: {
        language: "python",
        label: "test_api.py",
        runnable: false,
        code: `from fastapi.testclient import TestClient

client = TestClient(app)


def test_list_students():
    response = client.get("/students")
    assert response.status_code == 200
    assert isinstance(response.json(), list)`
      }
    },
    {
      id: "42-config-logging",
      type: "split-code",
      title: "Konfigurácia a logging",
      codeBlocks: [
        {
          language: "python",
          label: "config.py",
          runnable: false,
          code: `import os

DATABASE_URL = os.environ["DATABASE_URL"]
DEBUG = os.getenv("DEBUG") == "true"`
        },
        {
          language: "python",
          label: "logging",
          runnable: false,
          code: `logger.info("Created student %s", student.id)
logger.warning("External API timeout")`
        }
      ]
    },
    {
      id: "43-dev-prod",
      type: "compare",
      title: "Development vs. produkcia",
      columns: [
        {
          title: "development",
          items: ["reload", "debug režim", "lokálny server", "viditeľné chyby"]
        },
        {
          title: "produkcia",
          items: ["process manager alebo container", "secrets", "HTTPS/reverse proxy", "logging a monitoring"]
        }
      ]
    },
    {
      id: "44-semester-integration",
      type: "diagram",
      title: "Ako sa spojil semester",
      diagramItems: ["Modern Python", "functions / dataclass", "scripts / config", "tests", "HTTP", "database", "security", "FastAPI API"]
    },
    {
      id: "45-final-demo",
      type: "demo",
      title: "Demo: od prázdneho súboru k API",
      points: [
        "`FastAPI()`",
        "GET `/`",
        "path parameter a Pydantic model",
        "POST endpoint",
        "`/docs`",
        "krátky test cez `TestClient`"
      ]
    }
  ],
  translations: {
    en: {
      title: "Web Backends in Python",
      description: "Basics of building an HTTP API in FastAPI with validation, database access, testing and secure habits.",
      duration: "50-60 min",
      slides: {
        "01-title": {
          title: "Web Backends in Python"
        },
        "02-client-server-switch": {
          title: "From API Client to API Server",
          columns: [
            {
              title: "API client",
              items: [
                "our program sends a request",
                "someone else's server responds",
                "we process JSON",
                "we handle timeouts and errors"
              ]
            },
            {
              title: "API server",
              items: [
                "someone else's client sends a request",
                "our application responds",
                "we validate input",
                "we return a status code and JSON"
              ]
            }
          ]
        },
        "03-backend-responsibilities": {
          title: "A Backend Connects Multiple Layers",
          diagramItems: ["HTTP", "routing", "validation", "business logic", "database", "response"]
        },
        "04-own-api-question": {
          title: "What Must Our Own API Know?",
          prompt: "If a client sends `POST /students` with a JSON body, what must the backend check, store and return?"
        },
        "05-fastapi": {
          title: "FastAPI",
          body: "FastAPI is a Python web framework for building HTTP APIs. It directly uses type hints, Pydantic models and generates an OpenAPI description of endpoints.",
          points: [
            "a route decorator connects a URL with a Python function",
            "type hints help validation and documentation",
            "the return value is serialized as a response"
          ]
        },
        "06-first-app": {
          title: "Minimal Application"
        },
        "07-run-app": {
          title: "Running the Development Server"
        },
        "08-main-app": {
          title: "`main:app` Is the Address of the Application Object",
          body: "`main` is a Python module and `app` is a variable containing the FastAPI application. `--reload` belongs in development, not as a production process manager.",
          points: [
            "a file change restarts the development server",
            "errors are visible quickly",
            "production deployment is handled by a separate layer"
          ]
        },
        "09-request-endpoint-response": {
          title: "Request -> Endpoint -> Response",
          diagramItems: ["GET /students", "route match", "Python function", "return value", "JSON response"]
        },
        "10-routing-section": {
          title: "Routing",
          subtitle: "HTTP method and path determine which function is called."
        },
        "11-routing": {
          title: "Collection and Detail"
        },
        "12-path-parameters": {
          title: "A Path Parameter Has a Type",
          body: "FastAPI uses the type hint to convert a value from the URL."
        },
        "13-query-parameters": {
          title: "Query Parameters Filter or Modify Listing"
        },
        "14-path-query-question": {
          title: "Path or Query?",
          prompt: "`/students/42` and `/students?course=Python` use different parameter types. Which identifies a concrete resource and which filters a list?"
        },
        "15-status-codes": {
          title: "An API Also Speaks Through Status Codes",
          table: {
            headers: ["Status", "Typical situation"],
            rows: [
              ["200", "successful read"],
              ["201", "resource created"],
              ["204", "success without response body"],
              ["400", "invalid request"],
              ["404", "resource does not exist"],
              ["422", "input validation failed"]
            ]
          }
        },
        "16-request-body-section": {
          title: "Request Body",
          subtitle: "When creating or updating data, the client sends JSON."
        },
        "17-pydantic-model": {
          title: "Pydantic Model Describes Input"
        },
        "18-json-validation-flow": {
          title: "JSON Input -> Validation -> Python Object",
          diagramItems: ["request body", "Pydantic validation", "StudentCreate", "endpoint function"]
        },
        "19-field-validation": {
          title: "Rules on Fields"
        },
        "20-response-model": {
          title: "Input and Output Models Do Not Have to Be the Same"
        },
        "21-validation-question": {
          title: "What Happens with an Invalid Type?",
          prompt: "The endpoint expects `points: int`, but the client sends JSON with value `\"abc\"`. Should the backend return success, 404, a validation error or a traceback?"
        },
        "22-http-exception": {
          title: "HTTPException for Expected Errors"
        },
        "23-crud-api": {
          title: "Students API as a Small CRUD Surface"
        },
        "24-in-memory-section": {
          title: "From Memory to Database",
          subtitle: "A list is enough to understand HTTP, but not for a real application."
        },
        "25-in-memory": {
          title: "The In-Memory Version Is Only an Intermediate Step"
        },
        "26-restart-question": {
          title: "What Happens After the Server Restarts?",
          prompt: "If all students are stored only in `students = []`, what remains after turning the application off and on again?"
        },
        "27-database-flow": {
          title: "A Backend Needs Persistence",
          diagramItems: ["HTTP request", "FastAPI route", "application function", "SQLAlchemy", "database"]
        },
        "28-sqlalchemy-model": {
          title: "Database Model"
        },
        "29-depends": {
          title: "`Depends` Prepares a Dependency for the Endpoint"
        },
        "30-create-with-db": {
          title: "POST with a Database"
        },
        "31-integrity-error": {
          title: "A Database Error Should Become an HTTP Response"
        },
        "32-separation": {
          title: "An Endpoint Should Not Store All Logic",
          columns: [
            {
              title: "unclear",
              items: [
                "HTTP",
                "extra validation",
                "SQL",
                "calculations",
                "external API",
                "formatting"
              ]
            },
            {
              title: "maintainable",
              items: [
                "the route handles HTTP",
                "a function handles application logic",
                "a database helper handles persistence"
              ]
            }
          ]
        },
        "33-openapi-section": {
          title: "API Documentation",
          subtitle: "The API contract should be readable by both humans and tools."
        },
        "34-openapi": {
          title: "OpenAPI Comes from Types and Endpoints",
          body: "FastAPI can create an API description from route decorators, type hints and Pydantic models.",
          points: [
            "list of endpoints",
            "request/response schema",
            "validated types",
            "interactive interface at `/docs`"
          ]
        },
        "35-docs-question": {
          title: "Why Is a Verbal API Explanation Not Enough?",
          prompt: "The client team needs to know the exact shape of requests, responses and errors. Which parts of the API contract must be explicit?"
        },
        "36-security-section": {
          title: "Backend Security Basics",
          subtitle: "The previous lecture suddenly applies to every endpoint."
        },
        "37-authn-authz": {
          title: "Authentication vs. Authorization",
          columns: [
            {
              title: "authentication",
              items: [
                "Who are you?",
                "identity verification",
                "login, token, session"
              ]
            },
            {
              title: "authorization",
              items: [
                "What are you allowed to do?",
                "permissions",
                "roles, scopes, data ownership"
              ]
            }
          ]
        },
        "38-security-checklist": {
          title: "Backend Security Basics",
          points: [
            "validate input with Pydantic",
            "do not return internal tracebacks to the user",
            "use parameterized database access",
            "keep secrets outside source code",
            "use timeouts when calling external services",
            "HTTPS in production"
          ]
        },
        "39-cors": {
          title: "You Meet CORS with Browser Frontends",
          body: "If the frontend runs on a different origin than the API, the browser may require CORS permission. It is not a database or Python error."
        },
        "40-testing-section": {
          title: "Testing an API",
          subtitle: "An endpoint is behavior that can be tested without manual clicking."
        },
        "41-test-client": {
          title: "TestClient: Request Without a Real Server"
        },
        "42-config-logging": {
          title: "Configuration and Logging"
        },
        "43-dev-prod": {
          title: "Development vs. Production",
          columns: [
            {
              title: "development",
              items: [
                "reload",
                "debug mode",
                "local server",
                "visible errors"
              ]
            },
            {
              title: "production",
              items: [
                "process manager or container",
                "secrets",
                "HTTPS/reverse proxy",
                "logging and monitoring"
              ]
            }
          ]
        },
        "44-semester-integration": {
          title: "How the Semester Came Together",
          diagramItems: ["Modern Python", "functions / dataclass", "scripts / config", "tests", "HTTP", "database", "security", "FastAPI API"]
        },
        "45-final-demo": {
          title: "Demo: From an Empty File to an API",
          points: [
            "`FastAPI()`",
            "GET `/`",
            "path parameter and Pydantic model",
            "POST endpoint",
            "`/docs`",
            "short test with `TestClient`"
          ]
        }
      }
    }
  }
} satisfies Lecture;
