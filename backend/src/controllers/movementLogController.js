const MovementLog = require("../models/MovementLog");
const User = require("../models/User");

const calculateMovementLogValues = (
  moved,
  durationSeconds,
  currentSessionStreak
) => {
  if (!moved) {
    return {
      moved: false,
      durationSeconds: 0,
      creditedSeconds: 0,
      pointsEarned: 0,
      multiplierAtTime: 1,
    };
  }

  const safeDuration = Math.max(0, Number(durationSeconds) || 0);
  const creditedSeconds = Math.min(safeDuration, 600);

  const nextSessionStreak = currentSessionStreak + 1;
  const multiplierAtTime = 2 ** (nextSessionStreak - 1);

  const basePoints = Math.floor(creditedSeconds / 60);
  const pointsEarned = basePoints * multiplierAtTime;

  return {
    moved: true,
    durationSeconds: safeDuration,
    creditedSeconds,
    pointsEarned,
    multiplierAtTime,
  };
};

//multiplier does not exist currently multiplier already there
const createMovementLog = async (req, res) => {
  try {
    const { userId, moved, durationSeconds } = req.body;

    if (!userId || typeof moved !== "boolean") {
      return res.status(400).json({
        error: "userId and moved are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movementValues = calculateMovementLogValues(
      moved,
      durationSeconds,
      user.currentSessionStreak
    );

    if (moved) {
      user.totalPoints += movementValues.pointsEarned;
      user.currentSessionStreak += 1;

      if (user.currentSessionStreak > user.bestSessionStreak) {
        user.bestSessionStreak = user.currentSessionStreak;
      }
    } else {
      user.currentSessionStreak = 0;
    }

    const movementLog = await MovementLog.create({
      userId,
      responseType: moved ? "yes" : "no",
      ...movementValues,
      sessionStreakAtTime: user.currentSessionStreak,
    });

    await user.save();

    return res.status(201).json({
      movementLog,
      user: {
        _id: user._id,
        username: user.username,
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
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
