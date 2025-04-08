# Exercise 0.6 – New note in Single Page App

```mermaid
sequenceDiagram
    participant browser
    participant javascript
    participant server

    browser->>browser: User writes note and clicks "Save"
    javascript->>javascript: preventDefault()
    javascript->>javascript: Create note object (content + date)
    javascript->>server: POST /new_note_spa with note
    server-->>javascript: 200 OK
    javascript->>browser: Add new note to DOM
