# Exercise 0.5 – Single Page App Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    participant javascript

    browser->>server: GET /spa
    server-->>browser: HTML page

    browser->>server: GET /main.css
    server-->>browser: CSS file

    browser->>server: GET /spa.js
    server-->>browser: JavaScript file

    browser->>javascript: Execute spa.js
    javascript->>server: GET /data.json
    server-->>javascript: JSON data
    javascript->>browser: Render notes using DOM API

    browser->>browser: User writes note and clicks "Save"
    javascript->>javascript: preventDefault()
    javascript->>javascript: create note object
    javascript->>server: POST /new_note_spa
    server-->>javascript: 200 OK
    javascript->>browser: Add new note to DOM
