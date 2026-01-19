const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (email, otp) => {
  const msg = {
    to: email,

    // ✅ ONLY ONE FROM
    from: {
      email: process.env.SENDER_EMAIL,
      name: "WanderLust",
    },

    subject: "Verify your WanderLust account",
    text: `Hi 👋,

Welcome to WanderLust!

Your email verification code is:

🔐 ${otp}

This code is valid for 5 minutes.
If you didn’t request this, you can safely ignore this email.

Thanks,
WanderLust Team
https://wanderlust-website-zwnd.onrender.com/listings`,
  };

  await sgMail.send(msg);
};