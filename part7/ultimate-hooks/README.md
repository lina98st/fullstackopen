# Ultimate Hooks App

This is a React application demonstrating the use of custom hooks to manage resources and form fields.

## Features

- Custom `useField` hook to manage form input fields
- Custom `useResource` hook to handle fetching and creating resources from backend APIs
- Supports managing notes and persons with separate API endpoints
- Simple forms for creating new notes and persons
- Displays lists of notes and persons fetched from backend

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

git clone <repository-url>


2. Change directory:
cd ultimate-hooks


3. Install dependencies:
npm install


4. Start the backend server (make sure the server runs on port 3005):
npm run server


5. Run the development server:
npm run dev

6. Open your browser and navigate to `http://localhost:5173` (or the port Vite selects)

## Project Structure

- `src/App.jsx`: Main React component implementing the app logic
- `src/hooks/useField.js`: Custom hook for form fields
- `src/hooks/useResource.js`: Custom hook for resource management

## Notes

- The app expects backend APIs running locally on port 3005 for `/notes` and `/persons`.
- The `useResource` hook abstracts the communication with these APIs.

## License

This project is for educational purposes as part of the Full Stack Open course.