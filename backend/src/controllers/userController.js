const User = require("../models/User");

const getUserSummary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select(
      "username email totalPoints currentSessionStreak bestSessionStreak"
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

module.exports = {
  getUserSummary,
  getLeaderboard,
  getUserSettings,
  updateUserSettings,
};
