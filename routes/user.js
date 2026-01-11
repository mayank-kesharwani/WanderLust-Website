const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js")
//Signup
router.route("/signup").get(userController.signup).post(wrapAsync(userController.signupUser))

//Verify OTP
router.post("/verify-otp", wrapAsync(userController.verifyOtp));

//Login
router.route("/login").get(userController.login).post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.loginUser)

//Logout
router.get("/logout", userController.logoutUser)
module.exports = router