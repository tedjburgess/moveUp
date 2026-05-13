const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const movementLogRoutes = require("./routes/movementLogRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movement-logs", movementLogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "moveUp backend is running" });
});

module.exports = app;
