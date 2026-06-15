# Todo API Contract

## GET /todos

Returns all todos.

Optional query:
- done=true returns only completed todos.
- done=false returns only incomplete todos.

## POST /todos

Creates a new todo.

Rules:
- title is required.
- title must be a string.
- title must be trimmed.
- title length must be from 1 to 80 characters.
- invalid input returns status 400.
- error response format: { "error": "message" }

## PATCH /todos/:id/toggle

Toggles the done value of a todo.

Rules:
- existing id returns status 200.
- missing id returns status 404.
- error response format: { "error": "message" }