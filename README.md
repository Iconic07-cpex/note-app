# Notes App - CRUD Application

A full-stack notes application with robust validation and error handling.

## Features

- ✅ Create, Read, Update, and Delete notes
- ✅ Frontend and backend validation
- ✅ User-friendly error notifications
- ✅ Clean and responsive UI
- ✅ RESTful API backend
- ✅ SQLite database for persistence

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios (API client)
- React-Toastify (notifications)

**Backend:**
- Python FastAPI
- SQLAlchemy ORM
- Pydantic validation
- SQLite database

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
uvicorn app.main:app --reload
```

Backend runs at: http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install  # Install dependencies including axios and react-toastify
npm run dev
```

Frontend runs at: http://localhost:5173

## Validation Rules

**Title:**
- Required field
- Minimum 3 characters
- Maximum 150 characters
- Whitespace is trimmed

**Content:**
- Required field
- Minimum 10 characters
- Maximum 10,000 characters

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a note
- `GET /api/notes/{id}` - Get a specific note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## Error Handling

The application provides clear error messages for:
- Validation errors (inline and toast notifications)
- Network errors
- 404 Not Found errors
- Server errors

## Project Structure

```
notes-app/
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── main.py        # API routes and error handlers
│   │   ├── models.py      # SQLAlchemy models
│   │   ├── schemas.py     # Pydantic schemas with validation
│   │   └── database.py    # Database configuration
│   └── requirements.txt
│
└── frontend/          # React frontend
    ├── src/
    │   ├── App.jsx           # Main application component
    │   ├── api.js            # Axios instance and error interceptor
    │   ├── components/       # React components
    │   └── main.jsx          # Application entry point
    └── package.json
```

## License

MIT
