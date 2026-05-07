const request = require("supertest");

const mockMovementLog = {
  find: vi.fn(),
  create: vi.fn(),
};

require.cache[require.resolve("../src/models/MovementLog")] = {
  exports: mockMovementLog,
};

const app = require("../src/app");

describe("Movement log backend behavior", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a movement log when a user moves", async () => {
    const createdLog = {
      _id: "1",
      responseType: "yes",
      moved: true,
      durationSeconds: 120,
      creditedSeconds: 120,
      pointsEarned: 120,
    };

    mockMovementLog.create.mockResolvedValue(createdLog);

    const response = await request(app).post("/api/movement-log").send({
      durationSeconds: 120,
      responseType: "yes",
    });

    expect(response.status).toBe(201);
    expect(response.body.moved).toBe(true);
    expect(response.body.durationSeconds).toBe(120);
    expect(response.body.pointsEarned).toBe(120);
  });

  it("saves no responses with 0 seconds and 0 points", async () => {
    const createdLog = {
      _id: "2",
      responseType: "no",
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
    };

    mockMovementLog.create.mockResolvedValue(createdLog);

    const response = await request(app).post("/api/movement-log").send({
      durationSeconds: 0,
      responseType: "no",
    });

    expect(response.status).toBe(201);
    expect(response.body.moved).toBe(false);
    expect(response.body.durationSeconds).toBe(0);
    expect(response.body.pointsEarned).toBe(0);
  });

  it("caps credited movement duration at 600 seconds", async () => {
    const createdLog = {
      _id: "3",
      responseType: "yes",
      moved: true,
      durationSeconds: 900,
      creditedSeconds: 600,
      pointsEarned: 600,
    };

    mockMovementLog.create.mockResolvedValue(createdLog);

    const response = await request(app).post("/api/movement-log").send({
      durationSeconds: 900,
      responseType: "yes",
    });

    expect(response.status).toBe(201);
    expect(response.body.creditedSeconds).toBe(600);
    expect(response.body.pointsEarned).toBe(600);
  });

  it("calculates points from credited movement seconds", async () => {
    const createdLog = {
      _id: "4",
      responseType: "yes",
      moved: true,
      durationSeconds: 300,
      creditedSeconds: 300,
      pointsEarned: 300,
    };

    mockMovementLog.create.mockResolvedValue(createdLog);

    const response = await request(app).post("/api/movement-log").send({
      durationSeconds: 300,
      responseType: "yes",
    });

    expect(response.status).toBe(201);
    expect(response.body.pointsEarned).toBe(300);
  });

  it("returns leaderboard data ordered by highest points", async () => {
    const leaderboardData = [
      { _id: "1", username: "Alex", pointsEarned: 800 },
      { _id: "2", username: "Sam", pointsEarned: 500 },
      { _id: "3", username: "Mia", pointsEarned: 300 },
    ];

    const sortMock = vi.fn().mockResolvedValue(leaderboardData);
    mockMovementLog.find.mockReturnValue({ sort: sortMock });

    const response = await request(app).get("/api/movement-log");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(leaderboardData);
    expect(sortMock).toHaveBeenCalledWith({
      pointsEarned: -1,
      createdAt: -1,
    });
  });
});
