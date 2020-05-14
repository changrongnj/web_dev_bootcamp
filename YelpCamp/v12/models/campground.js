const mongoose = require("mongoose");

//SCHEMA SETUP
// `show dbs`
// `use yelp_camp`
// `show collections`
// `db.campgrounds.find()`
const campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"  // this was declared in the comment.js, the module.exports
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);