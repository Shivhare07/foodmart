const sendEmail = require("../Middlewares/sendEmail");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Register User Controller
const registeruserController = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;
        let image = null;
        if (req.file) {
            image = {
                filename: req.file.filename,
                path: "https://foodmart-4p8z.onrender.com"+ req.file.path,
            };
        }
        if (!name || !email || !password || !number) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ success: false, message: "User already registered" });
        }
        const saltround = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, saltround);

        const data = new User({ name, email, password: hashpassword, number, image });
        await data.save();

        res.status(201).send({ success: true, message: "User Registered Successfully", data });
        sendEmail(email, "You have registered successfully!");
    } catch (error) {
        res.status(500).send({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                image: user.image,
                role: "user"
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).send({
            success: true,
            message: "User Login Successfully",
            token
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Get All Users Controller
const alluserController = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// Delete User by ID Controller
const deleteuserController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ success: false, message: "User ID is required" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        const data = await User.findByIdAndDelete(id);
        res.send({ success: true, message: "User deleted successfully", data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Get Profile Controller
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        res.status(200).send({ success: true, message: "User found", data: user });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message || "Internal Server Error" });
    }
};

// logout Controller
const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Logout failed" });
  }
};

// forgot password
let forgotpassword = async (req, res) => {
    try {
        let { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }
        let genrateotp = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }

        let otp = genrateotp();

        let genratetoken = async (id) => {
            let token = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '300s' })
            return token
        }
        let forgot_token = await genratetoken(user._id);
        await User.findByIdAndUpdate(user._id, { forgot_password_otp: otp, forgot_password_token: forgot_token })

        await sendEmail(email, `this is your otp:  ${otp}`);

        res.status(200).json({ success: true, message: "forgot otp sent , Please check your registered mail", token: forgot_token })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}
let verifyOtp = async (req, res) => {
    try {
        let { otp, token } = req.body;

        let decode = await jwt.verify(token, process.env.SECRET_KEY);
        let user = await User.findById(decode.id);
        if (!user) {
            return res.status(404).send({ sucess: false, message: "user not found" });
        }
        if (otp != user.forgot_password_otp) {
            return res.status(404).send({ sucess: false, message: "Invalid Otp" });
        }

        let genratetoken = async (id) => {
            let token = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' })
            return token
        }
        let forgot_token = await genratetoken(user._id);
        await User.findByIdAndUpdate(decode.id, { refresh_token: forgot_token })
        res.send({ decode, refresh_token: forgot_token })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

let newPassword = async (req, res) => {
    try {
        let { refresh_token, password } = req.body;

        let decode = await jwt.verify(refresh_token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).send({ success: false, message: "unauthorized" })
        }

        let user = await User.findById(decode.id);

        if (!user) {
            return res.status(401).send({ success: false, message: "user not found" })
        }
        if (!user.refresh_token) {
            return res.status(401).send({ success: false, message: "You are not able to access this resource" })
        }
        let saltround = await bcrypt.genSalt(10)
        let hashpassword = await bcrypt.hash(password, saltround);

        await User.findByIdAndUpdate(user._id, { password: hashpassword, forgot_password_otp: "", forgot_password_token: "", refresh_token: "" })
        res.send({ success: true, message: "password change successfully" })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}
let resetPassword = async (req, res) => {
    try {
        let { email, oldpassword, newpassword } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ success: false, message: "user not found" })
        }
        let verifypassword = await bcrypt.compare(oldpassword, user.password);

        if (verifypassword) {
            user.password = await bcrypt.hash(newpassword, 10);
            user.save();

        } else {
            return res.status(401).send({ success: false, message: "Unauthorized" })
        }
        res.send({ success: true, message: "password reset successfully" })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

module.exports = {
    registeruserController,
    loginController,
    alluserController,
    deleteuserController,
    getProfile,
    verifyOtp,
    newPassword,
    forgotpassword,
    resetPassword,
    logoutController,
};