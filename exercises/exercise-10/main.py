from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from database import create_schema, get_session
from schemas import NoteCreate, NoteResponse, NoteUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_schema()
    yield


app = FastAPI(title="Notes API", lifespan=lifespan)


def unfinished():
    raise HTTPException(status_code=501, detail="Exercise implementation required")


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Notes API"}


@app.get("/items", response_model=list[NoteResponse])
def list_items(
    limit: int = 20,
    offset: int = 0,
    q: str | None = None,
    include_archived: bool = False,
    session: Session = Depends(get_session),
):
    unfinished()


@app.get("/items/{item_id}", response_model=NoteResponse)
def get_item(item_id: int, session: Session = Depends(get_session)):
    unfinished()


@app.post("/items", response_model=NoteResponse, status_code=201)
def create_item(data: NoteCreate, session: Session = Depends(get_session)):
    unfinished()


@app.patch("/items/{item_id}", response_model=NoteResponse)
def update_item(item_id: int, data: NoteUpdate, session: Session = Depends(get_session)):
    unfinished()


@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, session: Session = Depends(get_session)):
    unfinished()
