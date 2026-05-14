const User = require("../models/User");

const getUserSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select(
      "username email totalPoints currentSessionStreak bestSessionStreak reminderMode customReminderMinutes"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
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
    return res.status(500).json({ error: "Failed to retrieve user summary" });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("username totalPoints currentSessionStreak bestSessionStreak")
      .sort({ totalPoints: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
};

const updateReminderSettings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { reminderMode, customReminderMinutes } = req.body;

    if (!["science", "custom"].includes(reminderMode)) {
      return res.status(400).json({
        error: "reminderMode must be science or custom",
      });
    }

    let reminderMinutes = null;

    if (reminderMode === "custom") {
      reminderMinutes = Number(customReminderMinutes);

      if (!reminderMinutes || reminderMinutes < 1) {
        return res.status(400).json({
          error: "customReminderMinutes must be at least 1",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        reminderMode,
        customReminderMinutes: reminderMinutes,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select(
      "username email totalPoints currentSessionStreak bestSessionStreak reminderMode customReminderMinutes"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
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
      error: "Failed to update reminder settings",
    });
  }
};

module.exports = {
  getUserSummary,
  getLeaderboard,
  updateReminderSettings,
};
