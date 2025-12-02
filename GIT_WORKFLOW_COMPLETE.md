# Step-by-Step Git Workflow Guide

## Your GitHub Repo: https://github.com/Iconic07-cpex/note-app

Follow these steps EXACTLY in Command Prompt (not PowerShell).

---

## Step 1: Open Command Prompt

1. Press `Win + R`
2. Type `cmd`
3. Press Enter

---

## Step 2: Navigate to Your Project

Copy and paste this command:

```bash
cd C:\Users\Chirag\.gemini\antigravity\scratch\notes-app
```

Press Enter.

---

## Step 3: Check Git Status

Type this command:

```bash
git status
```

**If you see:** "fatal: not a git repository"
→ **Go to Step 4**

**If you see:** "On branch main" or "On branch master"
→ **Skip to Step 5**

---

## Step 4: Initialize Git (Only if needed)

Run these commands ONE BY ONE:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit: Working notes CRUD application"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/Iconic07-cpex/note-app.git
```

```bash
git push -u origin main
```

**You'll be asked for GitHub credentials:**
- Username: Iconic07-cpex
- Password: Use a **Personal Access Token** (not your GitHub password)

**Don't have a token?**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token and paste it as password

---

## Step 5: Create Feature Branch

Now create the feature branch:

```bash
git checkout -b feature/harden-notes
```

**Expected output:** "Switched to a new branch 'feature/harden-notes'"

---

## Step 6: Stage Backend Changes

Add the backend files:

```bash
git add backend/app/schemas.py backend/app/main.py
```

Check what's staged:

```bash
git status
```

You should see schemas.py and main.py in green.

---

## Step 7: Commit Backend Changes

```bash
git commit -m "feat(backend): Add Pydantic validation and standardized error handling

- Add field validators for title (3-150 chars, trimmed) and content (10-10,000 chars)
- Implement custom exception handlers for ValidationError and HTTPException
- Return standardized error format: { error: { code, message, fields } }
- Support VALIDATION_ERROR, NOT_FOUND_ERROR, NETWORK_ERROR, SERVER_ERROR codes"
```

**Expected output:** Shows files changed and insertions.

---

## Step 8: Stage Frontend Axios Setup

```bash
git add frontend/package.json frontend/src/api.js
```

---

## Step 9: Commit Frontend Axios Setup

```bash
git commit -m "feat(frontend): Create centralized Axios instance with error interceptor

- Add axios and react-toastify dependencies
- Create api.js with base URL, timeout, and default headers
- Implement response interceptor to normalize all error responses
- Handle network errors, validation errors, and server errors gracefully"
```

---

## Step 10: Stage Frontend Component Changes

```bash
git add frontend/src/main.jsx frontend/src/App.jsx frontend/src/components/NoteForm.jsx
```

---

## Step 11: Commit Frontend Component Changes

```bash
git commit -m "feat(frontend): Migrate to Axios and add validation with toast notifications

- Replace all fetch calls with Axios API calls
- Add ToastContainer to main.jsx with react-toastify
- Implement toast notifications for success and error messages
- Add frontend validation matching backend rules (title 3-150, content 10-10000)
- Display inline validation errors with red borders and error messages
- Clear errors dynamically as user types
- Handle validation errors, 404s, network errors with appropriate toasts"
```

---

## Step 12: View Your Commits

Check your work:

```bash
git log --oneline
```

You should see 3 commits with your messages.

---

## Step 13: Push Feature Branch to GitHub

```bash
git push -u origin feature/harden-notes
```

**Expected output:** 
```
To https://github.com/Iconic07-cpex/note-app.git
 * [new branch]      feature/harden-notes -> feature/harden-notes
```

**If asked for credentials:** Use your GitHub username and Personal Access Token again.

---

## Step 14: Create Pull Request on GitHub

1. **Go to:** https://github.com/Iconic07-cpex/note-app

2. **You'll see a yellow banner:** "feature/harden-notes had recent pushes"
   - Click the green button **"Compare & pull request"**

3. **If no banner appears:**
   - Click the "Pull requests" tab
   - Click green "New pull request" button
   - Set: base: `main` ← compare: `feature/harden-notes`
   - Click "Create pull request"

4. **Fill in the PR form:**

---

### PR Title:
```
Harden Notes Application: Add Validation, Axios, and Error Handling
```

### PR Description:
Copy and paste this:

```markdown
## Summary
This PR implements comprehensive improvements to the Notes CRUD application, including:
- Backend validation with Pydantic
- Standardized error response format
- Migration from fetch to Axios
- Frontend validation
- User-friendly error notifications with toasts

## Changes Made

### Backend
- **schemas.py**: Added Pydantic field validators for `title` and `content` with strict validation rules
  - Title: 3-150 characters (trimmed)
  - Content: 10-10,000 characters
- **main.py**: Implemented custom exception handlers for `ValidationError` and `HTTPException`
  - Returns standardized error format: `{ error: { code, message, fields } }`
  - Supports error codes: `VALIDATION_ERROR`, `NOT_FOUND_ERROR`, `SERVER_ERROR`, `NETWORK_ERROR`

### Frontend
- **api.js**: Created centralized Axios instance with:
  - Base URL: `http://localhost:8000/api`
  - Timeout: 10 seconds
  - Response error interceptor to normalize all errors
- **App.jsx**: Migrated all API calls from `fetch` to Axios
  - Added toast notifications for success/error scenarios
  - Proper error handling with normalized error objects
- **NoteForm.jsx**: Added comprehensive frontend validation
  - Identical validation rules as backend
  - Inline error display with red borders
  - Real-time error clearing on user input
  - Handles both frontend and backend validation errors
- **main.jsx**: Added `ToastContainer` for global toast notifications
- **package.json**: Added `axios` and `react-toastify` dependencies

## Testing Performed

### Backend Validation
- ✅ Title < 3 chars: Returns validation error
- ✅ Title > 150 chars: Returns validation error
- ✅ Content < 10 chars: Returns validation error
- ✅ Content > 10,000 chars: Returns validation error
- ✅ Valid data: Creates/updates note successfully
- ✅ Error format: Returns standardized JSON format

### Frontend Validation
- ✅ Form validation prevents submission with invalid data
- ✅ Inline errors appear in red below fields
- ✅ Errors clear when user starts typing
- ✅ Toast notifications show for all error types
- ✅ Success toasts show for create/update/delete

### Error Handling
- ✅ Network errors: Shows "Network error. Please try again."
- ✅ Validation errors: Shows "Please fix the highlighted fields."
- ✅ 404 errors: Shows "Note not found."
- ✅ Server errors: Shows "Something went wrong."

## Breaking Changes
None. All changes are backward compatible with the existing API.

## Dependencies Added
- `axios`: ^1.6.2
- `react-toastify`: ^9.1.3

## Next Steps
- Run `npm install` in the frontend directory to install new dependencies
- Test the application with both valid and invalid inputs
- Verify backend error responses match the specification

## Questions/Notes
- The validation rules are enforced on both frontend and backend for security
- Toast notifications auto-dismiss after 3 seconds
- All error messages are user-friendly and actionable
```

---

5. **Click the green "Create pull request" button**

---

## ✅ You're Done!

Your employer can now:
1. See your feature branch
2. Review your 3 commits
3. Read the PR description
4. Approve and merge your changes

---

## 🆘 Troubleshooting

### "Authentication failed"
→ You need a Personal Access Token (not password)
→ Get it from: https://github.com/settings/tokens

### "Permission denied"
→ Make sure the repo URL is correct: https://github.com/Iconic07-cpex/note-app.git

### "Updates were rejected"
→ Someone else pushed to main. Run: `git pull origin main` first

### "Cannot push to main branch" (if main is protected)
→ This is fine! You're pushing to `feature/harden-notes` branch, not main

---

## 📞 Need Help?

If you get stuck at any step, copy the error message and let me know which step you're on!
