const movementLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    cappedDurationSeconds: {
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
  },
  { timestamps: true }
);

const MovementLog = mongoose.model("MovementLog", movementLogSchema);

module.exports = MovementLog;
