const User = require("../models/user.js");
const crypto = require("crypto");
const sendOtp = require("../utils/sendOtp");

module.exports.signup = (req, res) => {
  res.render("users/signup.ejs");
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports.signupUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered. Please login.");
      return res.redirect("/login");
    }

    const otp = generateOTP();

    const otpExpiry = Date.now() + 5 * 60 * 1000;
    const otpResendAt = Date.now() + 60 * 1000;

    const newUser = new User({
      email,
      username,
      otp,
      otpExpiry,
      otpResendAt,
      isVerified: false,
    });
    const registeredUser = await User.register(newUser, password);

    try {
      await sendOtp(email, otp);
    } catch (mailErr) {
      console.error("OTP email failed:", mailErr);

      // rollback user creation
      await User.findByIdAndDelete(registeredUser._id);

      req.flash("error", "Unable to send OTP. Please try again.");
      return res.redirect("/signup");
    }

    req.flash("success", "OTP sent to your email");
    res.render("users/verifyOtp.ejs", { email });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/signup");
  }

  // Already verified?
  if (user.isVerified) {
    req.flash("success", "Email already verified. Please login.");
    return res.redirect("/login");
  }

  //  OTP expired?
  if (!user.otp || user.otpExpiry < Date.now()) {
    req.flash("error", "OTP expired. Please resend OTP.");
    return res.render("users/verifyOtp.ejs", { email });
  }

  // OTP mismatch?
  if (user.otp !== otp) {
    req.flash("error", "Invalid OTP");
    return res.render("users/verifyOtp.ejs", { email });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.otpResendAt = undefined;

  await user.save();

  req.login(user, (err) => {
    if (err) return next(err);

    req.flash("success", "Email verified! Welcome to WanderLust");
    res.redirect("/listings");
  });
};

module.exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.otpResendAt > Date.now()) {
    const wait = Math.ceil((user.otpResendAt - Date.now()) / 1000);
    return res.status(429).json({ error: `Wait ${wait}s` });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  user.otpResendAt = Date.now() + 60 * 1000;

  await user.save();
  await sendOtp(user.email, otp);

  res.json({ success: "OTP resent" });
};

module.exports.login = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.loginUser = async (req, res) => {
  if (!req.user.isVerified) {
    req.logout(() => {});
    req.flash("error", "Please verify your email first");
    return res.redirect("/login");
  }

  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
