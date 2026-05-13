const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        error: "Email is already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
        reminderMode: user.reminderMode,
        customReminderMinutes: user.customReminderMinutes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints,
        currentSessionStreak: user.currentSessionStreak,
        bestSessionStreak: user.bestSessionStreak,
        reminderMode: user.reminderMode,
        customReminderMinutes: user.customReminderMinutes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to log in",
    });
  }
};


module.exports = {
  signup,
  login,
};
