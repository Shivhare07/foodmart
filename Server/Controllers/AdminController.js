const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Admin Only Once
const registerAdminController = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(403).send({ success: false, message: "Admin already registered" });
        }

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashpassword,
            role: "admin" // ✅ REQUIRED
        });

        await admin.save();

        res.status(201).send({
            success: true,
            message: "Admin Registered Successfully",
            data: admin
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Admin Login
const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ success: false, message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: "admin", email: admin.email, name: admin.name, },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // ✅ Set token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).send({
            success: true,
            message: "Admin Login Successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const logoutAdminController = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, message: "Admin logged out" });
};

module.exports = {
    registerAdminController,
    loginAdminController,
    logoutAdminController
};