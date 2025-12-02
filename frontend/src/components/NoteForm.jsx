import React, { useState, useEffect } from 'react';

// Form component for creating and editing notes
function NoteForm({ onSubmit, editingNote, onCancel }) {
    // State to hold form data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // When editing a note, fill the form with existing data
    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        console.log('Title:', title);
        console.log('Content:', content);

        // Don't submit if fields are empty
        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }

        console.log('Calling onSubmit with:', { title, content });
        // Call the onSubmit function passed from parent
        onSubmit({ title, content });

        // Clear the form
        setTitle('');
        setContent('');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {editingNote ? 'Edit Note' : 'Create New Note'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter note title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter note content"
                        rows="4"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    >
                        {editingNote ? 'Update Note' : 'Add Note'}
                    </button>

                    {editingNote && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NoteForm;
