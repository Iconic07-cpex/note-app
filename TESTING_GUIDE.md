# Testing Guide for Notes Application Enhancements

This document provides step-by-step instructions for testing the validation, error handling, and Axios integration.

## Prerequisites

1. **Install Dependencies**
   ```bash
   # In the frontend directory
   cd frontend
   npm install
   ```

2. **Start the Backend**
   ```bash
   # In the backend directory (in a separate terminal)
   cd backend
   # Activate virtual environment if needed
   .\venv\Scripts\activate  # On Windows
   # Start the server
   uvicorn app.main:app --reload
   ```

3. **Start the Frontend**
   ```bash
   # In the frontend directory (in a separate terminal)
   cd frontend
   npm run dev
   ```

4. **Open the Application**
   - Navigate to `http://localhost:5173` in your browser

## Test Cases

### 1. Frontend Validation Tests

#### Test 1.1: Empty Title
1. Leave the title field empty
2. Enter valid content (at least 10 characters)
3. Click "Add Note"
4. **Expected**: Red border on title field, error message "Title is required."

#### Test 1.2: Title Too Short
1. Enter "ab" in title (2 characters)
2. Enter valid content
3. Click "Add Note"
4. **Expected**: Red border on title field, error message "Title must be at least 3 characters."

#### Test 1.3: Title Too Long
1. Enter 151+ characters in title
2. Enter valid content
3. Click "Add Note"
4. **Expected**: Red border on title field, error message "Title must not exceed 150 characters."

#### Test 1.4: Empty Content
1. Enter valid title
2. Leave content empty
3. Click "Add Note"
4. **Expected**: Red border on content field, error message "Content is required."

#### Test 1.5: Content Too Short
1. Enter valid title
2. Enter "hello" in content (5 characters)
3. Click "Add Note"
4. **Expected**: Red border on content field, error message "Content must be at least 10 characters."

#### Test 1.6: Content Too Long
1. Enter valid title
2. Enter 10,001+ characters in content
3. Click "Add Note"
4. **Expected**: Red border on content field, error message "Content must not exceed 10,000 characters."

#### Test 1.7: Valid Data
1. Enter "My First Note" in title (13 characters)
2. Enter "This is some valid content for testing." in content (40 characters)
3. Click "Add Note"
4. **Expected**: 
   - No validation errors
   - Toast notification "Note created successfully!"
   - Note appears in the list below
   - Form clears

### 2. Backend Validation Tests

To test backend validation, you can bypass frontend validation using browser dev tools or API testing tools like Postman.

#### Test 2.1: Backend Title Validation
1. Open browser developer tools (F12)
2. Go to Console tab
3. Run this code:
   ```javascript
   api.post('/notes', { title: 'ab', content: 'Valid content here' })
   ```
4. **Expected**: Error response with code "VALIDATION_ERROR"

#### Test 2.2: Backend Content Validation
1. In browser console, run:
   ```javascript
   api.post('/notes', { title: 'Valid Title', content: 'short' })
   ```
2. **Expected**: Error response with code "VALIDATION_ERROR"

#### Test 2.3: Whitespace Trimming
1. Enter "   My Title   " (with leading/trailing spaces)
2. Enter valid content
3. Click "Add Note"
4. **Expected**: Note is created with trimmed title "My Title" (no extra spaces)

### 3. Toast Notification Tests

#### Test 3.1: Success Toast - Create
1. Create a valid note
2. **Expected**: Green toast "Note created successfully!" appears in top-right corner

#### Test 3.2: Success Toast - Update
1. Click "Edit" on an existing note
2. Modify the title or content
3. Click "Update Note"
4. **Expected**: Green toast "Note updated successfully!"

#### Test 3.3: Success Toast - Delete
1. Click "Delete" on an existing note
2. Confirm deletion
3. **Expected**: Green toast "Note deleted successfully!"

#### Test 3.4: Error Toast - Validation
1. Submit a form with invalid data
2. **Expected**: Red toast "Please fix the highlighted fields."

#### Test 3.5: Error Toast - Network Error
1. Stop the backend server
2. Try to create a note
3. **Expected**: Red toast "Network error. Please check your connection and try again."

#### Test 3.6: Error Toast - 404 Error
1. In browser console, run:
   ```javascript
   api.get('/notes/99999')
   ```
2. **Expected**: Red toast "Note not found."

### 4. Axios Integration Tests

#### Test 4.1: Verify Axios is Used
1. Open browser developer tools (F12)
2. Go to Network tab
3. Create a new note
4. **Expected**: See POST request to `http://localhost:8000/api/notes`

#### Test 4.2: Verify Request Headers
1. In Network tab, click on a request
2. Check Headers section
3. **Expected**: `Content-Type: application/json` header is present

#### Test 4.3: Verify Timeout Configuration
1. Add a delay in backend (optional)
2. Make a request
3. **Expected**: Request should timeout after 10 seconds if backend doesn't respond

### 5. Error Handling Tests

#### Test 5.1: Multiple Field Errors
1. Leave both title and content empty
2. Click "Add Note"
3. **Expected**: Both fields show red borders and error messages

#### Test 5.2: Real-time Error Clearing
1. Submit form with empty title
2. Error appears below title field
3. Start typing in title field
4. **Expected**: Error message disappears as you type

#### Test 5.3: Edit Mode Validation
1. Click "Edit" on a note
2. Clear the title field
3. Click "Update Note"
4. **Expected**: Validation error appears

#### Test 5.4: Cancel Edit
1. Click "Edit" on a note
2. Make some changes
3. Click "Cancel"
4. **Expected**: Form resets to "Create New Note" mode, no errors shown

### 6. Full CRUD Workflow Test

1. **Create**: Add a note "Shopping List" with content "Buy groceries, milk, and bread"
2. **Read**: Verify the note appears in the list
3. **Update**: Edit the note, change title to "Grocery Shopping"
4. **Delete**: Delete the note
5. **Expected**: All operations work smoothly with appropriate toast notifications

## Error Response Format Verification

### Expected Backend Error Format

When a validation error occurs, the backend should return this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more validation errors occurred.",
    "fields": {
      "title": "Title must be at least 3 characters.",
      "content": "Content must be at least 10 characters."
    }
  }
}
```

### How to Verify

1. Use Postman or browser console
2. Send invalid data:
   ```javascript
   fetch('http://localhost:8000/api/notes', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ title: 'ab', content: 'short' })
   }).then(r => r.json()).then(console.log)
   ```
3. Check the console output matches the expected format

## Troubleshooting

### Issue: "axios is not defined"
- **Solution**: Run `npm install` in the frontend directory

### Issue: "react-toastify styles not loaded"
- **Solution**: Verify `import 'react-toastify/dist/ReactToastify.css'` is in main.jsx

### Issue: Backend not starting
- **Solution**: Make sure you have activated the virtual environment and installed dependencies

### Issue: Validation errors not showing
- **Solution**: Check browser console for JavaScript errors

## Summary Checklist

- [ ] Frontend validation works for all fields
- [ ] Backend validation works and returns standardized errors
- [ ] Toast notifications appear for all operations
- [ ] Axios is used for all API calls
- [ ] Error messages are displayed inline
- [ ] Form clears after successful submission
- [ ] Edit mode works correctly
- [ ] Delete confirmation works
- [ ] Network errors are handled gracefully
- [ ] All CRUD operations work end-to-end
