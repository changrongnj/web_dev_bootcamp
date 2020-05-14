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
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	})
})

//login form
router.get("/login", function(req, res) {
	res.render("login");
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
	res.redirect("/campgrounds");
})


module.exports = router;
