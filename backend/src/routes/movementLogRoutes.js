const express = require("express");
const router = express.Router();

const {
  createMovement,
  getMovement,
} = require("../controllers/movementLogController");

router.post("/", createMovement);
router.get("/", getMovement);

module.exports = router;
