const MovementLog = require("../models/MovementLog");
const User = require("../models/User");

const calculateMovementLogValues = (responseType, durationSeconds) => {
  if (responseType === "no" || responseType === "timeout") {
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
    const { userId, moved, durationSeconds, responseType } = req.body;

    const finalUserId = req.user?.id || userId;
    const finalResponseType =
      responseType || (moved === true ? "yes" : "no");

    if (!finalUserId || !["yes", "no", "timeout"].includes(finalResponseType)) {
      return res.status(400).json({
        error: "userId and valid responseType are required",
      });
    }

    const user = await User.findById(finalUserId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const movementValues = calculateMovementLogValues(
      finalResponseType,
      durationSeconds,
    );

    user.totalPoints += movementValues.pointsEarned;

    if (movementValues.moved) {
      user.currentSessionStreak += 1;

      if (user.currentSessionStreak > user.bestSessionStreak) {
        user.bestSessionStreak = user.currentSessionStreak;
      }
    } else {
      user.currentSessionStreak = 0;
    }

    await user.save();

    const movementLog = await MovementLog.create({
      userId: finalUserId,
      responseType: finalResponseType,
      ...movementValues,
      sessionStreakAtTime: user.currentSessionStreak,
      multiplierAtTime: 1,
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
    const finalUserId = req.user?.id || req.params.userId;

    const movementLogs = await MovementLog.find({ userId: finalUserId }).sort({
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