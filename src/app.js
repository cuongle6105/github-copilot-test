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
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    done: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

module.exports = { app, resetTodos };