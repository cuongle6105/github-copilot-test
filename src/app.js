const express = require("express");

const app = express();
app.use(express.json());

let todos = [
  { id: 1, title: "Learn Copilot", done: false },
  { id: 2, title: "Write tests", done: true }
];

function resetTodos() {
  todos = [
    { id: 1, title: "Learn Copilot", done: false },
    { id: 2, title: "Write tests", done: true }
  ];
}

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 1 || trimmedTitle.length > 80) {
    return res.status(400).json({ error: "title must be between 1 and 80 characters" });
  }

  const todo = {
    id: todos.length + 1,
    title: trimmedTitle,
    done: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

module.exports = { app, resetTodos };