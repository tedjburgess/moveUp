const MovementLog = require("../models/MovementLog");

const allowedUpdateFields = [
  "responseType",
  "durationSeconds",
  "creditedSeconds",
  "pointsEarned",
];

const updateMovementLog = async (req, res) => {
  try {
    const updates = {};

    for (const field of allowedUpdateFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const hasUpdates = Object.keys(updates).length > 0;

    if (!hasUpdates) {
      return res.status(400).json({
        error: "No valid update fields provided",
      });
    }

    if (
      updates.responseType !== undefined &&
      !["yes", "no", "timeout"].includes(updates.responseType)
    ) {
      return res.status(400).json({
        error: "Invalid responseType",
      });
    }

    if (
      updates.durationSeconds !== undefined &&
      (typeof updates.durationSeconds !== "number" ||
        updates.durationSeconds < 0)
    ) {
      return res.status(400).json({
        error: "durationSeconds must be 0 or higher",
      });
    }

    if (
      updates.creditedSeconds !== undefined &&
      (typeof updates.creditedSeconds !== "number" ||
        updates.creditedSeconds < 0 ||
        updates.creditedSeconds > 600)
    ) {
      return res.status(400).json({
        error: "creditedSeconds must be between 0 and 600",
      });
    }

    if (
      updates.pointsEarned !== undefined &&
      (typeof updates.pointsEarned !== "number" || updates.pointsEarned < 0)
    ) {
      return res.status(400).json({
        error: "pointsEarned must be 0 or higher",
      });
    }

    if (updates.responseType === "no" || updates.responseType === "timeout") {
      updates.moved = false;
      updates.durationSeconds = 0;
      updates.creditedSeconds = 0;
      updates.pointsEarned = 0;
    }

    if (updates.responseType === "yes") {
      updates.moved = true;
    }

    const updatedLog = await MovementLog.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLog) {
      return res.status(404).json({
        error: "Movement log not found",
      });
    }

    return res.status(200).json({
      message: "Movement log updated",
      movementLog: updatedLog,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to update movement log",
    });
  }
};

module.exports = {
  updateMovementLog,
};
