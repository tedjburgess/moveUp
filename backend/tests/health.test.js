const request = require("supertest");
const app = require("../src/app.js");

describe("GET /api/health", () => {
  it("should return status 200 and a message", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});