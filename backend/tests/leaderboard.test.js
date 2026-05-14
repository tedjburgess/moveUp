const dotenv = require("dotenv");
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../src/app.js");
const User = require("../src/models/User.js");

dotenv.config();

const testUserPrefix = "leaderboard-test-user";

beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required to run leaderboard tests");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

beforeEach(async () => {
  await User.deleteMany({
    username: { $regex: `^${testUserPrefix}` },
  });
});

afterAll(async () => {
  await User.deleteMany({
    username: { $regex: `^${testUserPrefix}` },
  });

  await mongoose.connection.close();
});

describe("GET /api/users/leaderboard", () => {
  it("returns users sorted by totalPoints descending without sensitive fields", async () => {
    await User.create([
      {
        username: `${testUserPrefix}-low`,
        email: `${testUserPrefix}-low@example.com`,
        passwordHash: "secret-low",
        totalPoints: 5,
        currentSessionStreak: 1,
        bestSessionStreak: 2,
      },
      {
        username: `${testUserPrefix}-high`,
        email: `${testUserPrefix}-high@example.com`,
        passwordHash: "secret-high",
        totalPoints: 20,
        currentSessionStreak: 3,
        bestSessionStreak: 4,
      },
      {
        username: `${testUserPrefix}-middle`,
        email: `${testUserPrefix}-middle@example.com`,
        passwordHash: "secret-middle",
        totalPoints: 10,
        currentSessionStreak: 2,
        bestSessionStreak: 3,
      },
    ]);

    const response = await request(app).get("/api/users/leaderboard");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const testUsers = response.body.filter((user) =>
      user.username.startsWith(testUserPrefix)
    );

    expect(testUsers).toHaveLength(3);

    expect(testUsers[0].username).toBe(`${testUserPrefix}-high`);
    expect(testUsers[0].totalPoints).toBe(20);

    expect(testUsers[1].username).toBe(`${testUserPrefix}-middle`);
    expect(testUsers[1].totalPoints).toBe(10);

    expect(testUsers[2].username).toBe(`${testUserPrefix}-low`);
    expect(testUsers[2].totalPoints).toBe(5);

    expect(testUsers[0]).toHaveProperty("username");
    expect(testUsers[0]).toHaveProperty("totalPoints");
    expect(testUsers[0]).toHaveProperty("currentSessionStreak");
    expect(testUsers[0]).toHaveProperty("bestSessionStreak");

    expect(testUsers[0]).not.toHaveProperty("passwordHash");
    expect(testUsers[0]).not.toHaveProperty("email");
  });
});
