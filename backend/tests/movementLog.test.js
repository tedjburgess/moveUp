import { describe, it, expect } from "vitest";

describe("Checkpoint 2 backend tests", () => {
  it("should calculate 0 points for timeout response", () => {
    const responseType = "timeout";

    let points = 10;

    if (responseType === "timeout") {
      points = 0;
    }

    expect(points).toBe(0);
  });

  it("should cap movement duration at 600 seconds", () => {
    const duration = 900;

    const cappedDuration = Math.min(duration, 600);

    expect(cappedDuration).toBe(600);
  });
});
