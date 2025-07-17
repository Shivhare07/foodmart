const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email, message) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Team Shivhare",
        text: message,
        html: `<h1>${message}</h1>`
    });
}

module.exports = sendEmail;