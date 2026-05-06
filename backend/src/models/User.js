const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
    },

    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentSessionStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    bestSessionStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    dailyStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    bestDailyStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    reminderMode: {
      type: String,
      enum: ["science", "custom"],
      default: "science",
    },

    customReminderMinutes: {
      type: Number,
      default: null,
      min: 0,
    },

    timezone: {
      type: String,
      default: null,
    },

    lastDailyBonusDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
