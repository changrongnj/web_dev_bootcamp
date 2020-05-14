var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//SCHEMA SETUP
// `show dbs`
// `use yelp_camp`
// `show collections`
// `db.campgrounds.find()`
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Salmon Creek", 
// 	image: "https://images.unsplash.com/photo-1502298771545-937cd94b0f48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
// }, function(err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Newly created campground:");
// 		console.log(campground);
// 	}
// })

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
// 	description: "This is a huge grandite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Newly created campground:");
// 		console.log(campground);
// 	}
// })

// Campground.create({
// 	name: "Mountain Goat's Rest", 
// 	image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	
// }, function(err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Newly created campground:");
// 		console.log(campground);
// 	}
// })

app.get("/", function(req, res) {
	res.render("landing");
})

// INDEX - show all campgrpunds
app.get("/index", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log("ERROR");
		} else {
			//source is not the array we defined, instead campgrounds in the function()
			res.render("index", {campgrounds: campgrounds});  
		}
	})
	
})

// CREATE - add new campground to DB
app.post("/index", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description: desc};
	// create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/index");
		}
	})
})

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs"); //only send back the form to add new campground
})


// SHOW - show more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find the campgrpund with the provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground:foundCampground});
		}
	});
})


app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("The Yelp camp Server Has Started!");
})