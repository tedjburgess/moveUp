const express = require("express");
const router = express.Router();

const { getUserSummary } = require("../controllers/userController");

router.get("/:userId/summary", getUserSummary);

module.exports = router;


