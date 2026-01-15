const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js")
//Signup
router.route("/signup").get(userController.signup).post(wrapAsync(userController.signupUser))

//Verify OTP & Ressend OTP
router.post("/verify-otp", wrapAsync(userController.verifyOtp));
router.post("/resend-otp", wrapAsync(userController.resendOtp));

// Change Password (standalone)
router.get("/change-password", isLoggedIn, userController.renderChangePassword);
router.post("/change-password", isLoggedIn, userController.changePassword);

//Login
router.route("/login").get(userController.login).post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.loginUser)

//Logout
router.get("/logout", userController.logoutUser)
module.exports = router