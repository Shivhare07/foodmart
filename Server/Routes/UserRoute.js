const router = require("express").Router();
const Jwt = require("jsonwebtoken");

const {
    registeruserController,
    loginController,
    alluserController,
    deleteuserController,
    getProfile,
    forgotpassword,
    verifyOtp,
    newPassword,
    resetPassword,
    logoutController 

} = require("../Controllers/UserController.js");
const checkprofile = require("../Middlewares/checkprofile.js");
const isAdmin = require("../Middlewares/isAdmin.js");
const upload = require("../Middlewares/Upload.js");
// Register and Login
router.post("/register", upload.single("profileImage"), registeruserController);
router.post("/login", loginController);

// Profile route with middleware
router.get("/profile", checkprofile, getProfile);

// Delete user by ID (admin only)
router.delete("/delete/:id", checkprofile, isAdmin, deleteuserController);

// Logout user
router.get("/logout", logoutController);

// All users
router.get("/allusers", alluserController);

router.post("/forgot-password", forgotpassword)
router.post("/verify-otp", verifyOtp)
router.post("/newpassword", newPassword)
router.get("/newpassword", (req, res) => {
    let filepath = path.join(__dirname, "../newpassword.html");
    let file = fs.readFileSync(filepath, "utf-8")
    res.send(file)
})
router.post("/reset-password", resetPassword);

module.exports = router;