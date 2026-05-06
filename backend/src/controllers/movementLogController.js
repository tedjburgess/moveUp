//Returns all movement logs with highest points at front of array

const MovementLog = require("../models/MovementLog");

const getMovement = async (req, res) => {
  try {
    const movementLogs = await MovementLog.find().sort({
      pointsEarned: -1,
      createdAt: -1,
    });

    res.status(200).json(movementLogs);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMovement,
};
