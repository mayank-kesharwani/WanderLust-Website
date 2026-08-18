// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports = async (email, otp) => {
//   const msg = {
//     to: email,

//     // ✅ ONLY ONE FROM
//     from: {
//       email: process.env.SENDER_EMAIL,
//       name: "WanderLust",
//     },

//     subject: "Verify your WanderLust account",
//     text: `Hi 👋,

// Welcome to WanderLust!

// Your email verification code is:

// 🔐 ${otp}

// This code is valid for 5 minutes.
// If you didn’t request this, you can safely ignore this email.

// Thanks,
// WanderLust Team
// https://wanderlust-website-zwnd.onrender.com/listings`,
//   };

//   await sgMail.send(msg);
// };
/////////////////////////////////////
// const { BrevoClient } = require("@getbrevo/brevo");

// const brevo = new BrevoClient({
//   apiKey: process.env.BREVO_API_KEY,
// });

// module.exports = async (email, otp) => {
//   try {
//     const response = await brevo.transactionalEmails.sendTransacEmail({
//       sender: {
//         email: process.env.SENDER_EMAIL,
//         name: "WanderLust",
//       },

//       to: [
//         {
//           email: email,
//         },
//       ],

//       subject: "Verify your WanderLust account",

//       textContent: `Hi 👋,

// Welcome to WanderLust!

// Your email verification code is:

// 🔐 ${otp}

// This code is valid for 5 minutes.

// If you didn’t request this, you can safely ignore this email.

// Thanks,
// WanderLust Team

// https://wanderlust-website-zwnd.onrender.com/listings`,
//     });

//     console.log("OTP email sent:", response.messageId);

//     return response;
//   } catch (error) {
//     console.error(
//       "Brevo email error:",
//       error?.body || error?.message || error
//     );

//     throw error;
//   }
// };

const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

module.exports = async (email, otp) => {
  try {
    console.log("Sending OTP...");
    console.log("Recipient:", email);
    console.log("Sender:", process.env.SENDER_EMAIL);
    console.log("API key exists:", !!process.env.BREVO_API_KEY);

    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "WanderLust",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "Verify your WanderLust account",
      textContent: `Hi,

Welcome to WanderLust!

Your email verification code is:

${otp}

This code is valid for 5 minutes.

Thanks,
WanderLust Team`,
    });

    console.log("BREVO SUCCESS:", response);

    return response;
  } catch (error) {
    console.error("========== BREVO ERROR ==========");
    console.error("Status:", error?.statusCode);
    console.error("Message:", error?.message);
    console.error("Body:", error?.body);
    console.error("Full:", error);
    console.error("================================");

    throw error;
  }
};