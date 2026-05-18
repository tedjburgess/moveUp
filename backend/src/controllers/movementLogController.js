const MovementLog = require("../models/MovementLog");
const User = require("../models/User");

const calculateMovementLogValues = (
  responseType,
  durationSeconds,
  currentSessionStreak = 0
) => {
  if (responseType === "no" || responseType === "timeout") {
    return {
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
      nextSessionStreak: 0,
      multiplierAtTime: 1,
    };
  }

  const safeDuration = Math.max(0, Number(durationSeconds) || 0);
  const creditedSeconds = Math.min(safeDuration, 600);
  const nextSessionStreak = currentSessionStreak + 1;
  const multiplierAtTime = 2 ** (nextSessionStreak - 1);
  const pointsEarned = creditedSeconds * multiplierAtTime;

  return {
    moved: true,
    durationSeconds: safeDuration,
    creditedSeconds,
    pointsEarned,
    nextSessionStreak,
    multiplierAtTime,
  };
};

const createMovementLog = async (req, res) => {
  try {
    const userId = req.userId;
    const { responseType, durationSeconds } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: missing user",
      });
    }

    if (!["yes", "no", "timeout"].includes(responseType)) {
      return res.status(400).json({
        error: "responseType must be yes, no, or timeout",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const movementValues = calculateMovementLogValues(
      responseType,
      durationSeconds,
      user.currentSessionStreak
    );

    const movementLog = await MovementLog.create({
      userId,
      responseType,
      moved: movementValues.moved,
      durationSeconds: movementValues.durationSeconds,
      creditedSeconds: movementValues.creditedSeconds,
      pointsEarned: movementValues.pointsEarned,
      sessionStreakAtTime: movementValues.nextSessionStreak,
      multiplierAtTime: movementValues.multiplierAtTime,
    });

    user.totalPoints += movementValues.pointsEarned;
    user.currentSessionStreak = movementValues.nextSessionStreak;
    user.bestSessionStreak = Math.max(
      user.bestSessionStreak || 0,
      movementValues.nextSessionStreak
    );

    await user.save();

    return res.status(201).json({
      movementLog,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
        reminderMode: user.reminderMode,
        customReminderMinutes: user.customReminderMinutes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create movement log",
    });
  }
};

const getMovementLogsByUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: missing user",
      });
    }

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
