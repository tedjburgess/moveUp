const mongoose = require("mongoose");

const movementLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    responseType: {
      type: String,
      enum: ["yes", "no", "timeout"],
      required: true,
    },

    moved: {
      type: Boolean,
      required: true,
    },

    durationSeconds: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    creditedSeconds: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 600,
    },

    pointsEarned: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    sessionStreakAtTime: {
      type: Number,
      default: 0,
      min: 0,
    },

    multiplierAtTime: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovementLog", movementLogSchema);
