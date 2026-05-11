const express = require("express");
const router = express.Router();

const {
  getUserSummary,
  getLeaderboard,
} = require("../controllers/userController");

router.get("/leaderboard", getLeaderboard);
router.get("/:userId/summary", getUserSummary);

module.exports = router;
