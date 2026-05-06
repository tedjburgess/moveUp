const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const movementLogRoutes = require("./routes/movementLogRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movement-log", movementLogRoutes);

app.get("/", (req, res) => {
  res.json({ message: "moveUp backend is running" });
});

module.exports = app;
