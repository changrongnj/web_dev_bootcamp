const express = require("express");
// mreger param from different files, such as comment.js access campground params.id
const router = express.Router({mergeParams: true}); 
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//Comments New
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:foundCampground});
		}
	})
})

// Comments Create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
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

// comment edit
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
		}
	});
})

//post comment edit
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})


// delete comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;
