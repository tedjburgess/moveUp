//Returns all movement logs with highest points at front of array

const MovementLog = require("../models/MovementLog");

const getMovementLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const movementLogs = await MovementLog.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(movementLogs);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch movement logs" });
  }
};

const createMovementLog = async (req, res) => {
  try {
    const { durationSeconds, responseType } = req.body;

    const creditedSeconds = Math.min(durationSeconds, 600);

    const newLog = await MovementLog.create({
      userId: "507f1f77bcf86cd799439011",
      responseType,
      moved: durationSeconds > 0,
      durationSeconds,
      creditedSeconds,
      pointsEarned: creditedSeconds,
      sessionStreakAtTime: 1,
      multiplierAtTime: 1,
    });

    res.status(201).json(newLog);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create movement log",
    });
  }
};

module.exports = {
  getMovementLogsByUser,
  createMovementLog,
};
