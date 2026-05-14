const express = require("express");
const router = express.Router();

const {
  getUserSummary,
  getLeaderboard,
} = require("../controllers/userController");

const requireAuth = require("../middleware/authMiddleware");

router.get("/me/test", requireAuth, (req, res) => {
  res.status(200).json({
    message: "Protected route works",
    userId: req.userId,
  });
});

router.get("/leaderboard", getLeaderboard);
router.get("/:userId/summary", getUserSummary);

module.exports = router;
