const express = require("express");
const router = express.Router();

const {
  getMovementLogsByUser,
  createMovementLog,
  getMovement,
} = require("../controllers/movementLogController");

router.get("/user/:userId", getMovementLogsByUser);
router.post("/", createMovementLog);
router.get("/", getMovement);

module.exports = router;
