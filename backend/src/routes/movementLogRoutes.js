const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
  createMovementLog,
  getMovementLogsByUser,
} = require("../controllers/movementLogController");

router.get("/me", requireAuth, getMovementLogsByUser);
router.post("/", requireAuth, createMovementLog);

module.exports = router;
