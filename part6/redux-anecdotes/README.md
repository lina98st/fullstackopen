📄 README.md (für Part 6)
# Fullstack Open – Part 6: State management with Redux

This project is part of the Fullstack Open course, University of Helsinki.  
It covers Part 6 of the course, focusing on state management in React using Redux and React Query.

## 🔧 Tech stack

- React with Vite
- Redux (with `@reduxjs/toolkit`)
- React Query (`@tanstack/react-query`)
- Context API (for notifications)
- Axios
- JSON Server (mock backend)

## 🚀 Run the app

Start the frontend:

```bash
npm install
npm run dev
Start the backend (JSON Server):

 
npm run server
Make sure db.json is present in the root with some initial anecdotes.

✅ Features in Part 6
Display anecdotes and vote on them

Filter anecdotes by content

Create new anecdotes

Prevent creating too short anecdotes (min. 5 characters)

Show success and error notifications using Context API

Use React Query for data fetching and caching

Use Redux for filter state

🗂 Folder structure
src/
  components/
    AnecdoteList.jsx
    AnecdoteForm.jsx
    Filter.jsx
    AppNotification.jsx
    NotificationContext.jsx
  services/
    anecdotes.js
  store.js
  App.jsx
  main.jsx
🌐 Local development
Frontend: http://localhost:5173
Backend (JSON Server): http://localhost:3001/anecdotes

