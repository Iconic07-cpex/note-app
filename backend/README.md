# Backend

Python FastAPI backend for the Notes App.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## Project Structure

- `app/main.py` - FastAPI application and routes
- `app/models.py` - SQLAlchemy database models
- `app/schemas.py` - Pydantic schemas for validation
- `app/database.py` - Database connection setup
- `notes.db` - SQLite database (created automatically)
