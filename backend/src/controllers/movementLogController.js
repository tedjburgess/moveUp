const MovementLog = require("../models/MovementLog");

const calculateMovementLogValues = (moved, durationSeconds) => {
  if (!moved) {
    return {
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
    };
  }

  const safeDuration = Math.max(0, Number(durationSeconds) || 0);
  const creditedSeconds = Math.min(safeDuration, 600);
  const pointsEarned = Math.floor(creditedSeconds / 60);

  return {
    moved: true,
    durationSeconds: safeDuration,
    creditedSeconds,
    pointsEarned,
  };
};

const createMovementLog = async (req, res) => {
  try {
    const { userId, moved, durationSeconds } = req.body;

    if (!userId || typeof moved !== "boolean") {
      return res.status(400).json({
        error: "userId and moved are required",
      });
    }

    const movementValues = calculateMovementLogValues(moved, durationSeconds);

    const movementLog = await MovementLog.create({
      userId,
      responseType: moved ? "yes" : "no",
      ...movementValues,
    });

    return res.status(201).json(movementLog);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create movement log",
    });
  }
};

const getMovementLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const movementLogs = await MovementLog.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(movementLogs);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch movement logs",
    });
  }
};

module.exports = {
  createMovementLog,
  getMovementLogsByUser,
  calculateMovementLogValues,
};
