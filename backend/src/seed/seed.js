require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const MovementLog = require("../models/MovementLog");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await MovementLog.deleteMany({});
    await User.deleteMany({});

    const users = await User.insertMany([
      {
        username: "ted",
        email: "ted@example.com",
        totalPoints: 1800,
        currentSessionStreak: 0,
        bestSessionStreak: 0,
        dailyStreak: 2,
        bestDailyStreak: 3,
        reminderMode: "science",
        customReminderMinutes: null,
        timezone: "Europe/Stockholm",
        lastDailyBonusDate: null,
      },
      {
        username: "osama",
        email: "osama@example.com",
        totalPoints: 900,
        currentSessionStreak: 1,
        bestSessionStreak: 3,
        dailyStreak: 1,
        bestDailyStreak: 2,
        reminderMode: "custom",
        customReminderMinutes: 45,
        timezone: "Europe/Stockholm",
        lastDailyBonusDate: null,
      },
      {
        username: "ralph",
        email: "ralph@example.com",
        totalPoints: 500,
        currentSessionStreak: 0,
        bestSessionStreak: 2,
        dailyStreak: 0,
        bestDailyStreak: 1,
        reminderMode: "science",
        customReminderMinutes: null,
        timezone: "Europe/Stockholm",
        lastDailyBonusDate: null,
      },
      {
        username: "osayi",
        email: "osayi@example.com",
        totalPoints: 0,
        currentSessionStreak: 0,
        bestSessionStreak: 0,
        dailyStreak: 0,
        bestDailyStreak: 0,
        reminderMode: "science",
        customReminderMinutes: null,
        timezone: "Europe/Stockholm",
        lastDailyBonusDate: null,
      },
    ]);

    await MovementLog.insertMany([
      {
        userId: users[0]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 180,
        creditedSeconds: 180,
        pointsEarned: 300,
        sessionStreakAtTime: 1,
        multiplierAtTime: 1,
      },
      {
        userId: users[0]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 240,
        creditedSeconds: 240,
        pointsEarned: 800,
        sessionStreakAtTime: 2,
        multiplierAtTime: 2,
      },
      {
        userId: users[0]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 900,
        creditedSeconds: 600,
        pointsEarned: 700,
        sessionStreakAtTime: 3,
        multiplierAtTime: 4,
      },

      {
        userId: users[1]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 300,
        creditedSeconds: 300,
        pointsEarned: 600,
        sessionStreakAtTime: 1,
        multiplierAtTime: 1,
      },
      {
        userId: users[1]._id,
        responseType: "no",
        moved: false,
        durationSeconds: 0,
        creditedSeconds: 0,
        pointsEarned: 0,
        sessionStreakAtTime: 0,
        multiplierAtTime: 1,
      },
      {
        userId: users[1]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 150,
        creditedSeconds: 150,
        pointsEarned: 300,
        sessionStreakAtTime: 1,
        multiplierAtTime: 1,
      },

      {
        userId: users[2]._id,
        responseType: "yes",
        moved: true,
        durationSeconds: 200,
        creditedSeconds: 200,
        pointsEarned: 500,
        sessionStreakAtTime: 1,
        multiplierAtTime: 1,
      },
      {
        userId: users[2]._id,
        responseType: "timeout",
        moved: false,
        durationSeconds: 0,
        creditedSeconds: 0,
        pointsEarned: 0,
        sessionStreakAtTime: 0,
        multiplierAtTime: 1,
      },
    ]);

    console.log("Seed data inserted");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
