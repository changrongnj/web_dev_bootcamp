const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX - show all campgrpunds
router.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log("ERROR");
		} else {
			//source is not the array we defined, instead campgrounds in the function()
			res.render("campgrounds/index", {campgrounds: campgrounds});  
			// request user for checking if someone is logged in, empty/underfined means not logged in
		}
	})
	
})

// CREATE - add new campground to DB
router.post("/campgrounds", isLoggedIn, function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image:image, description: desc, author: author};
	// create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
})

// NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new"); //only send back the form to add new campground
})


// SHOW - show more infor about one campground
router.get("/campgrounds/:id", function(req, res) {
	// find the campgrpund with the provided ID
	//Campground.findById(req.params.id, function(err, foundCampground) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			//console.log("===================");
			//console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})


//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
