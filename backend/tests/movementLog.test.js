import { describe, expect, it } from "vitest";
import { calculateMovementLogValues } from "../src/controllers/movementLogController.js";

describe("Checkpoint 2 movement log backend tests", () => {
  it("no responses save with 0 seconds and 0 points", () => {
    const result = calculateMovementLogValues("no", 120);

    expect(result).toEqual({
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
    });
  });

  it("timeout responses save with 0 seconds and 0 points", () => {
    const result = calculateMovementLogValues("timeout", 300);

    expect(result).toEqual({
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
    });
  });

  it("movement duration is capped at 600 seconds", () => {
    const result = calculateMovementLogValues("yes", 900);

    expect(result.durationSeconds).toBe(900);
    expect(result.creditedSeconds).toBe(600);
  });

  it("points calculation is based on credited movement seconds", () => {
    const result = calculateMovementLogValues("yes", 180);

    expect(result.creditedSeconds).toBe(180);
    expect(result.pointsEarned).toBe(3);
  });
});
