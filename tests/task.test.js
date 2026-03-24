const request = require("supertest");
const app = require("../src/index");

describe("Task API", () => {

  it("should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.title).toBe("Test Task");
  });

  it("should get tasks", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should fail when title is empty", async () => {
    const res = await request(app)
        .post("/tasks")
        .send({});

    expect(res.statusCode).toBe(400);
    });

});