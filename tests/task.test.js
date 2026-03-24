const request = require("supertest");
const app = require("../src/index");

describe("Task API", () => {

  // CREATE
  it("should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data.title).toBe("Test Task");
  });

  // READ
  it("should get all tasks", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // UPDATE
  it("should update task", async () => {
    const create = await request(app)
      .post("/tasks")
      .send({ title: "Old Task" });

    const id = create.body.data.id;

    const res = await request(app)
      .put(`/tasks/${id}`)
      .send({ isCompleted: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.isCompleted).toBe(true);
  });

  // DELETE
  it("should delete task", async () => {
    const create = await request(app)
      .post("/tasks")
      .send({ title: "Delete Me" });

    const id = create.body.data.id;

    const res = await request(app)
      .delete(`/tasks/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

  // ERROR CASE
  it("should fail when title is empty", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
  });

});