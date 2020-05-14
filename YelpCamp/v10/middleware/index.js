const Campground      = require("../models/campground"),
	  Comment         = require("../models/comment");


//Middleware

// //method 1:
// var middlewareObj = {
// 	checkCommentOwnership: function() {},
// }

// //method 2:
// module.exports = {
// 	checkCommentOwnership: function() {},
// }

// method 3:
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect("back");
			} else {
				// does the user own this comment post?
				if (req.user._id.equals(foundComment.author.id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		})
	} else {
		res.redirect("back");
	}

}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				res.redirect("back");
			} else {
				// does the user own this campground post?
				if (req.user._id.equals(foundCampground.author.id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		})
	} else {
		res.redirect("back");
	}

}


module.exports = middlewareObj;