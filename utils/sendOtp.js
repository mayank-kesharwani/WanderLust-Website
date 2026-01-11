const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL, // must be verified in SendGrid
    subject: "WanderLust OTP Verification",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  await sgMail.send(msg);
};