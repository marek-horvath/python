from pydantic import BaseModel


class NoteCreate(BaseModel):
    title: str
    body: str | None = None
    archived: bool = False


class NoteUpdate(BaseModel):
    title: str | None = None
    body: str | None = None
    archived: bool | None = None


class NoteResponse(BaseModel):
    id: int
    title: str
    body: str | None
    archived: bool
