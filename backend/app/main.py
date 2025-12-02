from fastapi import FastAPI, HTTPException, Depends, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from pydantic import ValidationError

from . import models, schemas
from .database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Notes API", version="1.0.0")

# Custom exception handler for Pydantic validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic validation errors with standardized format"""
    errors = {}
    
    for error in exc.errors():
        field_name = error['loc'][-1] if error['loc'] else 'unknown'
        error_msg = error['msg']
        
        # Customize error messages based on type
        if error['type'] == 'value_error':
            # Use the custom error message from our validators
            errors[field_name] = str(error['ctx']['error']) if 'ctx' in error and 'error' in error['ctx'] else error_msg
        else:
            errors[field_name] = error_msg
    
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "One or more validation errors occurred.",
                "fields": errors
            }
        }
    )

# Custom exception handler for general HTTP exceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with standardized format"""
    error_code = "NOT_FOUND_ERROR" if exc.status_code == 404 else "SERVER_ERROR"
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": error_code,
                "message": exc.detail,
                "fields": {}
            }
        }
    )

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create API router
api_router = APIRouter(prefix="/api")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Notes API"}

# Get all notes
@api_router.get("/notes", response_model=List[schemas.Note])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(models.Note).order_by(models.Note.updated_at.desc()).all()
    return notes

# Get a specific note
@api_router.get("/notes/{note_id}", response_model=schemas.Note)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# Create a new note
@api_router.post("/notes", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Note(
        title=note.title,
        content=note.content
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

# Update a note
@api_router.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteUpdate, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Update only provided fields
    if note.title is not None:
        db_note.title = note.title
    if note.content is not None:
        db_note.content = note.content
    
    db_note.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_note)
    return db_note

# Delete a note
@api_router.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(db_note)
    db.commit()
    return {"message": "Note deleted successfully"}

# Include the API router in the app
app.include_router(api_router)

