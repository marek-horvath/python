from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from database import create_schema, get_session
from models import Note
from schemas import NoteCreate, NoteResponse, NoteUpdate

app = FastAPI(title="Notes API")


@app.on_event("startup")
def startup() -> None:
    create_schema()


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Notes API"}


@app.get("/items", response_model=list[NoteResponse])
def list_items(
    limit: int = 20,
    session: Session = Depends(get_session),
):
    # Úloha 3 a 6: vráťte najviac limit poznámok a doplňte filtre.
    return []


@app.get("/items/{item_id}", response_model=NoteResponse)
def get_item(item_id: int, session: Session = Depends(get_session)):
    # Úloha 3: načítajte detail alebo vyhoďte HTTPException 404.
    raise HTTPException(status_code=404, detail="Item not found")


@app.post("/items", response_model=NoteResponse, status_code=201)
def create_item(data: NoteCreate, session: Session = Depends(get_session)):
    # Úloha 4: vytvorte Note a ošetrite duplicate title.
    note = Note(title=data.title, body=data.body)
    return note


@app.patch("/items/{item_id}", response_model=NoteResponse)
def update_item(
    item_id: int,
    data: NoteUpdate,
    session: Session = Depends(get_session),
):
    # Úloha 5: upravte poznámku alebo vráťte 404.
    raise HTTPException(status_code=404, detail="Item not found")


@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, session: Session = Depends(get_session)):
    # Úloha 5: odstráňte poznámku alebo vráťte 404.
    return None
