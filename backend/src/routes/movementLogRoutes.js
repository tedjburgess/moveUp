const express = require("express");
const router = express.Router();

const { getMovement } = require("../controllers/movementLogController");

router.get("/", getMovement);

module.exports = router;
