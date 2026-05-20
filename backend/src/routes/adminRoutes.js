const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");
const { updateMovementLog } = require("../controllers/adminController");

const router = express.Router();

router.patch(
  "/movement-logs/:id",
  requireAuth,
  requireAdmin,
  updateMovementLog
);

module.exports = router;
