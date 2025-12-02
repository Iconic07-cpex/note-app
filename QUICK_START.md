# 🚀 Quick Start Guide - Running the Enhanced Notes App

Follow these steps to run the application with all the new features (Axios, validation, toasts).

## Step 1: Install Frontend Dependencies

**Open a terminal** (Command Prompt or PowerShell as Administrator) and navigate to the frontend directory:

```bash
cd C:\Users\Chirag\.gemini\antigravity\scratch\notes-app\frontend
```

**Install the new packages** (axios and react-toastify):

```bash
npm install
```

**Expected output:**
```
added 2 packages, and audited XXX packages in Xs
```

---

## Step 2: Start the Backend Server

**Open a NEW terminal window** and navigate to the backend directory:

```bash
cd C:\Users\Chirag\.gemini\antigravity\scratch\notes-app\backend
```

**Activate the Python virtual environment:**

```bash
# On Windows
.\venv\Scripts\activate
```

You should see `(venv)` appear in your terminal prompt.

**Start the FastAPI server:**

```bash
uvicorn app.main:app --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend is now running on http://localhost:8000**

**Keep this terminal window open!**

---

## Step 3: Start the Frontend Server

**Open ANOTHER NEW terminal window** and navigate to the frontend directory:

```bash
cd C:\Users\Chirag\.gemini\antigravity\scratch\notes-app\frontend
```

**Start the Vite development server:**

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **Frontend is now running on http://localhost:5173**

**Keep this terminal window open too!**

---

## Step 4: Open the Application

Open your web browser and go to:

**http://localhost:5173**

You should see the Notes app with the header "📝 My Notes App"

---

## Step 5: Test the New Features

### Test 1: Validation Error (Title Too Short)
1. In the "Create New Note" form, type **"ab"** in the Title field (only 2 characters)
2. Type **"This is valid content"** in the Content field
3. Click **"Add Note"**

**Expected Result:**
- ✅ Red border appears around the Title field
- ✅ Red error message appears: "Title must be at least 3 characters."
- ✅ Red toast notification appears in top-right corner: "Please fix the highlighted fields."

### Test 2: Successful Note Creation
1. Type **"My First Note"** in the Title field
2. Type **"This is some valid content for my note"** in the Content field
3. Click **"Add Note"**

**Expected Result:**
- ✅ Green toast notification: "Note created successfully!"
- ✅ Note appears in the list below
- ✅ Form clears

### Test 3: Edit a Note
1. Click the **"Edit"** button on any note
2. Change the title or content
3. Click **"Update Note"**

**Expected Result:**
- ✅ Green toast notification: "Note updated successfully!"
- ✅ Note updates in the list

### Test 4: Delete a Note
1. Click the **"Delete"** button on any note
2. Confirm the deletion in the popup
3. Click **"OK"**

**Expected Result:**
- ✅ Green toast notification: "Note deleted successfully!"
- ✅ Note disappears from the list

### Test 5: Network Error Handling
1. **Stop the backend server** (Press Ctrl+C in the backend terminal)
2. Try to create a new note

**Expected Result:**
- ✅ Red toast notification: "Network error. Please check your connection and try again."

3. **Restart the backend** (run `uvicorn app.main:app --reload` again)

---

## Step 6: View All Validation Rules

### Title Field:
- ❌ Empty → "Title is required."
- ❌ Less than 3 characters → "Title must be at least 3 characters."
- ❌ More than 150 characters → "Title must not exceed 150 characters."
- ✅ 3-150 characters → Valid!

### Content Field:
- ❌ Empty → "Content is required."
- ❌ Less than 10 characters → "Content must be at least 10 characters."
- ❌ More than 10,000 characters → "Content must not exceed 10,000 characters."
- ✅ 10-10,000 characters → Valid!

---

## Troubleshooting

### Issue: "npm: command not found" or execution policy error

**Solution:** Run PowerShell as Administrator and set execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try `npm install` again.

### Issue: "uvicorn: command not found"

**Solution:** Make sure you activated the virtual environment:
```bash
.\venv\Scripts\activate
```

You should see `(venv)` in your prompt.

### Issue: "Port already in use"

**Solution:** Kill the process using that port:
```bash
# For backend (port 8000)
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# For frontend (port 5173)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Issue: Toast notifications not appearing

**Solution:** 
1. Check browser console (F12) for errors
2. Make sure `npm install` completed successfully
3. Refresh the page (Ctrl+F5)

### Issue: No validation errors showing

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Make sure both frontend and backend are running

---

## Summary - What Should Be Running

You should have **3 terminal windows open**:

1. **Terminal 1**: Backend server
   - Location: `C:\Users\Chirag\.gemini\antigravity\scratch\notes-app\backend`
   - Command: `uvicorn app.main:app --reload`
   - Status: Shows "Application startup complete"

2. **Terminal 2**: Frontend server
   - Location: `C:\Users\Chirag\.gemini\antigravity\scratch\notes-app\frontend`
   - Command: `npm run dev`
   - Status: Shows "Local: http://localhost:5173/"

3. **Browser**: Application open
   - URL: http://localhost:5173
   - Status: Shows Notes app interface

---

## Stopping the Application

When you're done testing:

1. **Stop Frontend**: Go to the frontend terminal and press `Ctrl+C`
2. **Stop Backend**: Go to the backend terminal and press `Ctrl+C`
3. **Deactivate venv** (optional): Type `deactivate` in the backend terminal

---

## Next Steps After Testing

Once you've verified everything works:

1. **Create Git commits** - Follow [GIT_WORKFLOW.md](GIT_WORKFLOW.md)
2. **Create Pull Request** - Use the PR template in GIT_WORKFLOW.md
3. **Deploy to production** - If your employer requires it

---

**Need Help?** Check the detailed [TESTING_GUIDE.md](TESTING_GUIDE.md) for more test cases!
