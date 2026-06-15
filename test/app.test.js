const request = require("supertest");
const { app, resetTodos } = require("../src/app");

describe("Todo API", () => {
  beforeEach(() => {
    resetTodos();
  });

  it("returns all todos", async () => {
    const res = await request(app).get("/todos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("filters completed todos with done=true", async () => {
    const res = await request(app).get("/todos?done=true");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 2, title: "Write tests", done: true }]);
  });

  it("filters incomplete todos with done=false", async () => {
    const res = await request(app).get("/todos?done=false");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, title: "Learn Copilot", done: false }]);
  });

  it("creates a todo with a valid title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "Review pull request" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Review pull request");
    expect(res.body.done).toBe(false);
  });

  it("rejects a missing title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title is required" });
  });

  it("rejects a non-string title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: 123 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title is required" });
  });

  it("trims title before saving", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "  Trim me  " });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Trim me");
  });

  it("rejects a title that becomes empty after trim", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "   " });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title must be between 1 and 80 characters" });
  });

  it("rejects a title longer than 80 characters after trim", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "a".repeat(81) });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title must be between 1 and 80 characters" });
  });

  it("toggles todo done state", async () => {
    const res = await request(app).patch("/todos/1/toggle");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, title: "Learn Copilot", done: true });
  });

  it("returns 404 when toggling missing todo", async () => {
    const res = await request(app).patch("/todos/999/toggle");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "todo not found" });
  });
});