# Exercise 0.4 – New note added

```mermaid
sequenceDiagram
    participant browser
    participant javascript
    participant server

    browser->>server: GET /data.json (XMLHttpRequest)
    server-->>browser: JSON data
    javascript->>browser: Render existing notes in DOM

    user->>browser: Write note and click "Save"
    javascript->>javascript: preventDefault()
    javascript->>javascript: create note object
    javascript->>browser: Update DOM with new <li>
    javascript->>server: POST /new_note_spa
    server-->>javascript: 200 OK
