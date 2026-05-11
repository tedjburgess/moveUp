const express = require("express");
const router = express.Router();

const { createMovementLog } = require("../controllers/movementLogController");

router.post("/", createMovementLog);

module.exports = router;
