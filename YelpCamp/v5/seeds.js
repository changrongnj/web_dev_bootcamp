const mongoose     = require("mongoose"),
	  Campground   = require("./models/campground"),
	  Comment      = require("./models/comment");


const data = [
	{
		name: "Cloud's Rest",
		image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lemon drops bear claw gummies sweet halvah. Cheesecake cake marzipan cake ice cream chupa chups fruitcake cotton candy cake. Jujubes ice cream lemon drops dragée liquorice pudding ice cream. Ice cream jelly beans carrot cake. Cupcake oat cake gummies cake. Chocolate cake bear claw apple pie. Sweet cheesecake bear claw pudding powder. Cheesecake caramels oat cake sesame snaps dragée muffin oat cake cake. Cotton candy candy lemon drops fruitcake macaroon toffee chocolate cake fruitcake gingerbread.",
		
	},
	{
		name: "Desert Mesa",
		image:"https://images.unsplash.com/photo-1574105760593-32b4dd6cbf6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Pie cake lemon drops. Pie caramels powder tart powder dessert chocolate cake bonbon. Dragée toffee cookie macaroon lemon drops. Candy canes cupcake wafer halvah donut cheesecake powder. Lollipop dragée cotton candy pudding icing bonbon tootsie roll. Lollipop lollipop sweet roll. Jelly beans candy sweet roll chocolate bar cookie cake lollipop gummies. Bonbon topping toffee chupa chups marshmallow liquorice."
	},
	{
		name: "Canyon floor",
		image:"https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		description: "Muffin danish bonbon gummies gummies danish. Topping pudding pastry. Brownie danish topping icing. Liquorice apple pie sweet roll sweet roll. Cake candy canes cake candy gingerbread lollipop cheesecake sugar plum jelly-o. Apple pie fruitcake dessert chocolate cake sweet."
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