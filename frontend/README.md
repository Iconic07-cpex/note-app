# Frontend

React + Vite + Tailwind CSS frontend for the Notes App.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Project Structure

- `src/App.jsx` - Main application component with CRUD logic
- `src/components/NoteForm.jsx` - Form for creating/editing notes
- `src/components/NoteCard.jsx` - Component to display individual notes
- `src/main.jsx` - React entry point
- `src/index.css` - Tailwind CSS imports and global styles

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.
