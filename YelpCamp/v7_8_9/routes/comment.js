const express = require("express");
// mreger param from different files, such as comment.js access campground params.id
const router = express.Router({mergeParams: true}); 
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Comments New
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:foundCampground});
		}
	})
})

// Comments Create
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
	//look up campground using ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//console.log(req.body.comment);
			
			//create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					// add username and ide to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//connect new comment to campground
					foundCampground.comments.push(comment);
					foundCampground.save();
					
					//redirect camground show page
					res.redirect("/campgrounds/" + foundCampground._id);
					
				}
			})
			
		}
		
	})
	
})

//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


module.exports = router;
