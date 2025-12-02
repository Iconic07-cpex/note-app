import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import api from './api';
import { toast } from 'react-toastify';

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
            const response = await api.get('/notes');
            // Ensure data is an array
            setNotes(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notes:', error);

            // Show appropriate error toast
            if (error.normalizedError) {
                if (error.normalizedError.code === 'NETWORK_ERROR') {
                    toast.error(error.normalizedError.message);
                } else {
                    toast.error('Failed to load notes. Please try again.');
                }
            }

            // Set notes to empty array on error
            setNotes([]);
            setLoading(false);
        }
    };

    // Function to create a new note
    const createNote = async (noteData) => {
        try {
            const response = await api.post('/notes', noteData);

            // Refresh the notes list
            fetchNotes();
            toast.success('Note created successfully!');
        } catch (error) {
            console.error('Error creating note:', error);

            // Handle validation errors
            if (error.normalizedError) {
                if (error.normalizedError.code === 'VALIDATION_ERROR') {
                    toast.error('Please fix the highlighted fields.');
                    // Return field errors to the form
                    return error.normalizedError.fields;
                } else if (error.normalizedError.code === 'NETWORK_ERROR') {
                    toast.error(error.normalizedError.message);
                } else {
                    toast.error('Failed to create note. Please try again.');
                }
            }
        }
    };

    // Function to update an existing note
    const updateNote = async (noteData) => {
        try {
            const response = await api.put(`/notes/${editingNote.id}`, noteData);

            // Clear editing state and refresh notes
            setEditingNote(null);
            fetchNotes();
            toast.success('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);

            // Handle different error types
            if (error.normalizedError) {
                if (error.normalizedError.code === 'VALIDATION_ERROR') {
                    toast.error('Please fix the highlighted fields.');
                    return error.normalizedError.fields;
                } else if (error.normalizedError.code === 'NOT_FOUND_ERROR') {
                    toast.error('Note not found.');
                } else if (error.normalizedError.code === 'NETWORK_ERROR') {
                    toast.error(error.normalizedError.message);
                } else {
                    toast.error('Failed to update note. Please try again.');
                }
            }
        }
    };

    // Function to delete a note
    const deleteNote = async (noteId) => {
        // Ask for confirmation before deleting
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const response = await api.delete(`/notes/${noteId}`);

                // Refresh the notes list
                fetchNotes();
                toast.success('Note deleted successfully!');
            } catch (error) {
                console.error('Error deleting note:', error);

                // Handle different error types
                if (error.normalizedError) {
                    if (error.normalizedError.code === 'NOT_FOUND_ERROR') {
                        toast.error('Note not found.');
                    } else if (error.normalizedError.code === 'NETWORK_ERROR') {
                        toast.error(error.normalizedError.message);
                    } else {
                        toast.error('Failed to delete note. Please try again.');
                    }
                }
            }
        }
    };

    // Handle form submission (create or update)
    const handleFormSubmit = async (noteData) => {
        if (editingNote) {
            const errors = await updateNote(noteData);
            return errors; // Return errors to form for inline display
        } else {
            const errors = await createNote(noteData);
            return errors; // Return errors to form for inline display
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
