import React, { useState, useEffect } from 'react';

function NoteForm({ onSubmit, editingNote, onCancelEdit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});

    // When editingNote changes, populate the form
    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
            setErrors({});
        } else {
            setTitle('');
            setContent('');
            setErrors({});
        }
    }, [editingNote]);

    // Clear error for a specific field
    const clearError = (field) => {
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // Frontend validation function
    const validateForm = () => {
        const newErrors = {};
        const trimmedTitle = title.trim();

        // Title validation
        if (!trimmedTitle) {
            newErrors.title = 'Title is required.';
        } else if (trimmedTitle.length < 3) {
            newErrors.title = 'Title must be at least 3 characters.';
        } else if (trimmedTitle.length > 150) {
            newErrors.title = 'Title must not exceed 150 characters.';
        }

        // Content validation
        if (!content) {
            newErrors.content = 'Content is required.';
        } else if (content.length < 10) {
            newErrors.content = 'Content must be at least 10 characters.';
        } else if (content.length > 10000) {
            newErrors.content = 'Content must not exceed 10,000 characters.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run frontend validation first
        const validationErrors = validateForm();

        // If there are validation errors, show them and don't submit
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear any previous errors
        setErrors({});

        const noteData = {
            title: title.trim(),
            content: content,
        };

        // Call the onSubmit function and handle backend errors
        const backendErrors = await onSubmit(noteData);

        if (backendErrors) {
            // Show backend validation errors
            setErrors(backendErrors);
        } else if (!editingNote) {
            // Only clear form if we're creating a new note (not editing)
            setTitle('');
            setContent('');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setErrors({});
        onCancelEdit();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {editingNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''
                            }`}
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            clearError('title');
                        }}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 ${errors.content ? 'border-red-500' : ''
                            }`}
                        placeholder="Enter note content"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            clearError('content');
                        }}
                    ></textarea>
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {editingNote ? 'Update Note' : 'Add Note'}
                    </button>
                    {editingNote && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
