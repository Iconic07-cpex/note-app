import React from 'react';

// Simple component to display a single note
function NoteCard({ note, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.content}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(note)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(note.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default NoteCard;
