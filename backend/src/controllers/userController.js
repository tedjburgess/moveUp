const User = require("../models/User");

const getUserSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve user summary" });
  }
};

module.exports = {
  getUserSummary,
};
