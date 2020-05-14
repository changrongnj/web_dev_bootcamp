const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");



router.get("/", function(req, res) {
	res.render("landing");
})


router.get("/register", function(req, res) {
	res.render("register");
})

//sign up logic
router.post("/register", function(req, res) {
	User.register(new User({username:req.body.username}), req.body.password, function(err, user) {
		if(err) {
			req.flash("failure", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		})
	})
})

//login form
router.get("/login", function(req, res) {
	res.render("login");  //{message: "You need to log in"} // {message: req.flash("failure")} 
	// if we want every single page has this message, we need to add to header, however, we need to pass the  defnition of message into every router that needs the message.
})

// login logic
router.post("/login", 
		 passport.authenticate("local",
							  {successRedirect:"/campgrounds",
							  	failureRedirect:"/login"}),
		 function(req, res) {}
		);


//logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
})


module.exports = router;
