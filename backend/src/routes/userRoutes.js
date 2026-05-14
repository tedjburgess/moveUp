const express = require("express");
const router = express.Router();

const {
  getUserSummary,
  getLeaderboard,
  updateReminderSettings,
} = require("../controllers/userController");

router.get("/leaderboard", getLeaderboard);
router.get("/:userId/summary", getUserSummary);
router.patch("/:userId/reminder-settings", updateReminderSettings);

module.exports = router;
