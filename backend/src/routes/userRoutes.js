const express = require("express");
const router = express.Router();

const {
  getUserSummary,
  getLeaderboard,
  getUserSettings,
  updateUserSettings,
  getUserStats,
  deleteUserAccount,
} = require("../controllers/userController");

const requireAuth = require("../middleware/authMiddleware");

router.get("/me/test", requireAuth, (req, res) => {
  res.status(200).json({
    message: "Protected route works",
    userId: req.userId,
  });
});

router.get("/me/settings", requireAuth, getUserSettings);
router.patch("/me/settings", requireAuth, updateUserSettings);

router.get("/leaderboard", getLeaderboard);
router.delete("/:userId", requireAuth, deleteUserAccount);
router.get("/:userId/summary", getUserSummary);
router.get("/:userId/stats", getUserStats);

module.exports = router;
