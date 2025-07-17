const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");
const adminModel = require("../Models/Admin");

const checkProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let user;

    // ✅ Dynamically pick model based on role
    if (decoded.role === "admin") {
      user = await adminModel.findById(decoded.id).select("-password");
    } else {
      user = await userModel.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // attaches user or admin to req
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = checkProfile;
