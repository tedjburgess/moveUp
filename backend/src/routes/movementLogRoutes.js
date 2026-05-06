const express = require("express");
const router = express.Router();

const {
  getMovement,
  createMovementLog,
} = require("../controllers/movementLogController");

router.get("/", getMovement);
router.post("/", createMovementLog);

module.exports = router;
