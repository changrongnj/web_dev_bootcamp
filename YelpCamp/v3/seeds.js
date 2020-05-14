const mongoose     = require("mongoose"),
	  Campground   = require("./models/campground"),
	  Comment      = require("./models/comment");


const data = [
	{
		name: "Cloud's Rest",
		image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah blah blah blah blah",
		
	},
	{
		name: "Desert Mesa",
		image:"https://images.unsplash.com/photo-1574105760593-32b4dd6cbf6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah blah blah blah blah"
	},
	{
		name: "Canyon floor",
		image:"https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah blah blah blah blah"
	}
]

function seedDB() {
	Campground.remove({}, function(err) {
		//Remove all campgrounds
		if(err) {
			console.log(err);
		}
		else {
			console.log("removed campground");
			
			// wait to remove all the campgrounds, and then add a few camgrounds
			data.forEach(function(el) {
				
				Campground.create(el, function(err, addCampground) {
					if (err) {
						console.log(err);
					} else {
						console.log(addCampground);
						console.log("added new campground");
						// create a comment
						Comment.create({
							text: "This place is great, but I wish there was internet",
							author: "Wei"
						}, function(err, comment) {
							if (err) {
								console.log(err);
							} else {
								addCampground.comments.push(comment);
								addCampground.save();
								console.log("Created a new comment: " + comment);
							}
						})
					}
					
					
				})
				
				
			})
			
		}
	})

}


module.exports = seedDB;