const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
  createMovementLog,
  getMovementLogsByUser,
  getMovementLogStats,
} = require("../controllers/movementLogController");

router.get("/me", requireAuth, getMovementLogsByUser);
router.get("/me/stats", requireAuth, getMovementLogStats);
router.post("/", requireAuth, createMovementLog);

module.exports = router;
