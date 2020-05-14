var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
	{name: "Salmon Creek", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Granite Hill", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Salmon Creek", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Granite Hill", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Salmon Creek", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Granite Hill", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"},
	{name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417d2973d39e45c0_340.jpg"}
];

app.get("/", function(req, res) {
	res.render("landing");
})

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image:image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs"); //only send back the form to add new campground
})

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("The Yelp camp Server Has Started!");
})