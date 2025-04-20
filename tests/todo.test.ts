import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.todo.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Todo API - Integration", () => {
  let createdId: number;

  it("Should create a new task", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "Study Jest", description: "Integration tests" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    createdId = res.body.id;
  });

  it("Should list all tasks", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Should fetch a task by ID", async () => {
    const res = await request(app).get(`/api/todos/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Study Jest");
  });

  it("Should update an existing task", async () => {
    const res = await request(app)
      .put(`/api/todos/${createdId}`)
      .send({ title: "Updated", description: "New description" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated");
  });

  it("Should delete an existing task", async () => {
    const res = await request(app).delete(`/api/todos/${createdId}`);
    expect(res.status).toBe(204);
  });

  it("Should return 404 for a non-existent task", async () => {
    const res = await request(app).get(`/api/todos/999999`);
    expect(res.status).toBe(404);
  });
});
