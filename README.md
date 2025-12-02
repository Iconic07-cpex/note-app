# Notes App - CRUD Application

A full-stack notes application built with React, Tailwind CSS, FastAPI, and SQLite.

## Features

- ✅ Create, Read, Update, and Delete notes
- ✅ Clean and responsive UI
- ✅ RESTful API backend
- ✅ SQLite database for persistence

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS

**Backend:**
- Python FastAPI
- SQLAlchemy
- SQLite

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.8+)
- npm

### Backend Setup

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend runs at: http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a note
- `GET /api/notes/{id}` - Get a specific note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## Project Structure

```
notes-app/
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── database.py
│   └── requirements.txt
│
└── frontend/          # React frontend
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   └── main.jsx
    └── package.json
```

## License

MIT
