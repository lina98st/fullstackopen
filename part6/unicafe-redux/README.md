# UniCafe Redux – Fullstack Open Part 6

This project is part of the Fullstack Open course (University of Helsinki).  
It is a simplified feedback app called UniCafe, built using React and Redux.

## 📦 Tech stack

- React (Vite)
- Redux Toolkit

## 📚 What it does

- Users can leave feedback: `good`, `ok`, or `bad`
- Feedback is stored in Redux state
- The app shows statistics: total, average score, percentage of positive feedback
- Includes a reset button to clear all feedback

## 🚀 How to run

Install dependencies:

```bash
npm install

Start the app:
 
npm run dev
Open in browser:
http://localhost:5173

🗂 File structure
src/
  components/
    App.jsx
    Statistics.jsx
    Buttons.jsx
  redux/
    store.js
    feedbackReducer.js
main.jsx


