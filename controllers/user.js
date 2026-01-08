const User = require("../models/user.js")

module.exports.signup = (req, res)=>{
    res.render("users/signup.ejs")
}

module.exports.signupUser = async(req, res, next)=>{
    try{
        let {username, email, password} = req.body
        const newUser = new User({email, username})
        const userRegistered = await User.register(newUser, password)
        req.login(userRegistered, (err)=>{
            if(err){
                return next(err)
            }
            req.flash("success", "Welcome to Wanderlust")
            res.redirect("/listings")
        })
    } catch(e){
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}
module.exports.login = (req, res)=>{
    res.render("users/login.ejs")
}
module.exports.loginUser = async(req, res)=>{
    req.flash("success", "Welcome back to Wanderlust")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}
module.exports.logoutUser = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success", "You are logged out!")
        res.redirect("/listings")
    })
}