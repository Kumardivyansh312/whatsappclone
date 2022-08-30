const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    port:587,
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
    from:process.env.EMAIL_FROM
});


module.exports = {
    transporter
}