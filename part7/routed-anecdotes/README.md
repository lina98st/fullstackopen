# Anecdote App

A small React application for displaying, creating, and viewing software anecdotes.  
This project is based on exercises from the [Full Stack Open](https://fullstackopen.com/) course.

## Features

- Display a list of anecdotes  
- View details of a single anecdote  
- Add a new anecdote via a form  
- Show notification after successful creation  
- Reset input fields with a reset button  
- Navigation using React Router  

## Installation

1. Clone the repository  
```bash
git clone <your-repo-url>
cd routed-anecdotes
 

 nstall dependencies

 
npm install
Start development server

 
npm run dev
Open in browser at http://localhost:3000

Structure
src/App.jsx: Main component with routing

src/components/: Contains components like Anecdote, AnecdoteList

src/hooks/useField.js: Custom hook for form input handling

Notes
React Router is used for navigation

Custom hook useField simplifies form management

After creating an anecdote, user is redirected to the list

License
This project is free to use.

