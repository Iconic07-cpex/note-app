import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';

// API URL - change this if your backend runs on a different port
const API_URL = 'http://localhost:8000/api';

function App() {
    // State to store all notes
    const [notes, setNotes] = useState([]);
    // State to store the note being edited (null if not editing)
    const [editingNote, setEditingNote] = useState(null);
    // State to show loading message
    const [loading, setLoading] = useState(true);

    // Fetch all notes when the app loads
    useEffect(() => {
        fetchNotes();
    }, []);

    // Function to get all notes from the backend
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/notes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Ensure data is an array
            setNotes(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notes:', error);
            // Set notes to empty array on error
            setNotes([]);
            setLoading(false);
        }
    };

    // Function to create a new note
    const createNote = async (noteData) => {
        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                // Refresh the notes list
                fetchNotes();
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    // Function to update an existing note
    const updateNote = async (noteData) => {
        try {
            const response = await fetch(`${API_URL}/notes/${editingNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                // Clear editing state and refresh notes
                setEditingNote(null);
                fetchNotes();
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    // Function to delete a note
    const deleteNote = async (noteId) => {
        // Ask for confirmation before deleting
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const response = await fetch(`${API_URL}/notes/${noteId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Refresh the notes list
                    fetchNotes();
                }
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    // Handle form submission (create or update)
    const handleFormSubmit = (noteData) => {
        if (editingNote) {
            updateNote(noteData);
        } else {
            createNote(noteData);
        }
    };

    // Handle edit button click
    const handleEdit = (note) => {
        setEditingNote(note);
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">📝 My Notes App</h1>
                    <p className="text-blue-100 mt-2">Keep track of your thoughts and ideas</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Note Form */}
                    <NoteForm
                        onSubmit={handleFormSubmit}
                        editingNote={editingNote}
                        onCancel={handleCancelEdit}
                    />

                    {/* Notes List */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Your Notes ({notes.length})
                        </h2>

                        {loading ? (
                            <p className="text-gray-600">Loading notes...</p>
                        ) : notes.length === 0 ? (
                            <p className="text-gray-600">
                                No notes yet. Create your first note above!
                            </p>
                        ) : (
                            notes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onEdit={handleEdit}
                                    onDelete={deleteNote}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
