const express = require("express");
const router = express.Router();
const checkProfile = require("../Middlewares/checkprofile");
const { registerAdminController, loginAdminController, logoutAdminController } = require("../Controllers/AdminController");

// Register admin (one-time)
router.post("/register", registerAdminController);

// Login admin and set cookie
router.post("/login", loginAdminController);

// Logout admin (clear cookie)
router.post("/logout", logoutAdminController);

// Protected admin dashboard (optional test route)
router.get("/dashboard", checkProfile, (req, res) => {
  res.send({ success: true, message: "Welcome to the admin dashboard" });
});

// ✅ Admin /me route (used by frontend to verify login)
router.get("/me", checkProfile, (req, res) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied: Admin only" });
  }

  res.status(200).json({
    success: true,
    admin: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;