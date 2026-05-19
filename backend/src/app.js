const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const movementLogRoutes = require("./routes/movementLogRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin, like Postman/browser direct visits
    if (!origin) {
      return callback(null, true);
    }

    // Allow local frontend, exact deployed frontend URL, and Netlify deploy URLs
    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith(".netlify.app");

    if (isAllowed) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(null, false);
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movement-logs", movementLogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "moveUp backend is running" });
});

module.exports = app;
