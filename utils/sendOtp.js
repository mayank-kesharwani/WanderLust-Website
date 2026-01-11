const nodemailer = require("nodemailer");

module.exports = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your WanderLust OTP Verification Code",
    html: `<h3>OTP: <b>${otp}</b></h3><p>Valid for 5 minutes</p>`
  });
};