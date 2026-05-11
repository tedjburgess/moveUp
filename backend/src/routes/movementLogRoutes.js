const express = require("express");
const router = express.Router();

const {
  getMovementLogsByUser,
  createMovementLog,
} = require("../controllers/movementLogController");

router.get("/user/:userId", getMovementLogsByUser);
router.post("/", createMovementLog);

module.exports = router;
