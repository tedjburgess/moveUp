const express = require("express");
const router = express.Router();

const {
  createMovementLog,
  getMovement,
} = require("../controllers/movementLogController");

router.post("/", createMovementLog);
router.get("/", getMovement);

module.exports = router;
