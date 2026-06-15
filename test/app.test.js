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

  it("creates a todo with a valid title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "Review pull request" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Review pull request");
    expect(res.body.done).toBe(false);
  });
});