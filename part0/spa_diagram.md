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

    Note right of browser: User can also add new notes without reloading the page
