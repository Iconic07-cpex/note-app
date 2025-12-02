import React, { useState, useEffect } from 'react';

// Form component for creating and editing notes
function NoteForm({ onSubmit, editingNote, onCancel }) {
    // State to hold form data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // State to hold validation errors
    const [errors, setErrors] = useState({});

    // When editing a note, fill the form with existing data
    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
        // Clear errors when switching between create/edit modes
        setErrors({});
    }, [editingNote]);

    // Frontend validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate title
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            newErrors.title = 'Title is required.';
        } else if (trimmedTitle.length < 3) {
            newErrors.title = 'Title must be at least 3 characters.';
        } else if (trimmedTitle.length > 150) {
            newErrors.title = 'Title must not exceed 150 characters.';
        }

        // Validate content
        if (!content) {
            newErrors.content = 'Content is required.';
        } else if (content.length < 10) {
            newErrors.content = 'Content must be at least 10 characters.';
        } else if (content.length > 10000) {
            newErrors.content = 'Content must not exceed 10,000 characters.';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});

        // Perform frontend validation
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            // Show validation errors
            setErrors(validationErrors);
            return;
        }

        // Call the onSubmit function passed from parent
        const backendErrors = await onSubmit({
            title: title.trim(), // Trim whitespace before sending
            content
        });

        // If backend returns validation errors, display them
        if (backendErrors && Object.keys(backendErrors).length > 0) {
            setErrors(backendErrors);
        } else {
            // Clear the form only if successful
            setTitle('');
            setContent('');
            setErrors({});
        }
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
                        onChange={(e) => {
                            setTitle(e.target.value);
                            // Clear error when user starts typing
                            if (errors.title) {
                                setErrors(prev => ({ ...prev, title: undefined }));
                            }
                        }}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter note title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            // Clear error when user starts typing
                            if (errors.content) {
                                setErrors(prev => ({ ...prev, content: undefined }));
                            }
                        }}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter note content"
                        rows="4"
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                    )}
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
                            onClick={() => {
                                onCancel();
                                setErrors({});
                            }}
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
