const User = require("../models/User");

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("isAdmin");

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        error: "Admin access required",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      error: "Failed to verify admin access",
    });
  }
};

module.exports = requireAdmin;
