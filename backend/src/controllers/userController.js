const User = require("../models/User");

const getUserSummary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("username email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        username: username,
        email: email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve email and username" });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select(
      "totalPoints currentSessionStreak bestSessionStreak bestDailyStreak lastDailyBonusDate"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
        bestDailyStreak: user.bestDailyStreak,
        lastDailyBonusDate: user.lastDailyBonusDate,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve user summary" });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("username totalPoints")
      .sort({ totalPoints: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
};

const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "reminderMode customReminderMinutes timezone"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      reminderMode: user.reminderMode,
      customReminderMinutes: user.customReminderMinutes,
      timezone: user.timezone,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve user settings" });
  }
};

const updateUserSettings = async (req, res) => {
  try {
    const { reminderMode, customReminderMinutes } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (reminderMode !== undefined) {
      if (!["science", "custom"].includes(reminderMode)) {
        return res.status(400).json({ error: "Invalid reminderMode" });
      }

      user.reminderMode = reminderMode;
    }

    if (reminderMode === "custom") {
      if (
        typeof customReminderMinutes !== "number" ||
        customReminderMinutes <= 0 ||
        customReminderMinutes > 60
      ) {
        return res.status(400).json({
          error: "customReminderMinutes must be between 1 and 60",
        });
      }
    }

    if (customReminderMinutes !== undefined) {
      user.customReminderMinutes = customReminderMinutes;
    }

    await user.save();

    return res.status(200).json({
      reminderMode: user.reminderMode,
      customReminderMinutes: user.customReminderMinutes,
      timezone: user.timezone,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user settings" });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.userId !== userId) {
      return res.status(403).json({
        error: "You can only delete your own account",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User account deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete user account",
    });
  }
};

module.exports = {
  getUserSummary,
  getLeaderboard,
  getUserSettings,
  updateUserSettings,
  getUserStats,
  deleteUserAccount,
};
