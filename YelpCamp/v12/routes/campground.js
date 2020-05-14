const express = require("express");
const router = express.Router();
const methodOverride  = require("method-override");
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");
router.use(methodOverride("_method"));  //override method routing



// INDEX - show all campgrpunds
router.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			req.flash("failure", err);
		} else {
			//source is not the array we defined, instead campgrounds in the function()
			res.render("campgrounds/index", {campgrounds: campgrounds});  
			// request user for checking if someone is logged in, empty/underfined means not logged in
		}
	})
	
})

// CREATE - add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image:image, price: price, description: desc, author: author};
	// create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			req.flash("failure", "Something wrong in creating the new campground");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "A new campground created!");
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
})

// NEW - show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new"); //only send back the form to add new campground
})


// SHOW - show more infor about one campground
router.get("/campgrounds/:id", function(req, res) {
	// find the campgrpund with the provided ID
	//Campground.findById(req.params.id, function(err, foundCampground) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			req.flash("failure", "Something wrong in creating the new campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			req.flash("failure", "Something wrong in editing the campground");
			console.log(err);
			res.redirect("/campgrounds");
		}
		res.render("campgrounds/edit", {campground: foundCampground});
	})
})

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			req.flash("failure", "Something wrong in editing the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Edit successfully!");
			res.redirect("/campgrounds/" + req.params.id); //updatedCampground._id
		}
	});
});


//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, removedCampground) {
		if (err) {
			req.flash("failure", "Something wrong in deleting the campground");
			console.log(err);
			res.redirect("/campgrounds");
		} 
		Comment.deleteMany({_id: {$in: removedCampground.comments}},function(err) {
			if (err) {
				console.log(err);
			} else {
				req.flash("success", "Campground deleted.");
				res.redirect("/campgrounds");
			}
		})
	})
})


module.exports = router;
