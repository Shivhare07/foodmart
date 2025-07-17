const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    number: Number, 
    img: { filename: String, path: String },
    forgot_password_otp: String,
    forgot_password_token: String,
    refresh_token: String
})

let User = mongoose.model("users", userSchema);
module.exports = User;