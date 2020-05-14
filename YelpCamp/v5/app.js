const express     = require("express"),
	  app         = express(),
	  bodyParser  = require("body-parser"),
	  mongoose    = require("mongoose"),
	  Campground  = require("./models/campground"),
	  Comment     = require("./models/comment"),
	  seedDB      = require("./seeds");


seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);



app.get("/", function(req, res) {
	res.render("landing");
})

// INDEX - show all campgrpunds
app.get("/campgrounds", function(req, res) {
	// get all campgrounds from DB
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log("ERROR");
		} else {
			//source is not the array we defined, instead campgrounds in the function()
			res.render("campgrounds/index", {campgrounds: campgrounds});  
		}
	})
	
})

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
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
			res.redirect("/campgrounds");
		}
	})
})

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new"); //only send back the form to add new campground
})


// SHOW - show more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find the campgrpund with the provided ID
	//Campground.findById(req.params.id, function(err, foundCampground) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log("===================");
			console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})



// =======================
// COMMENTS ROUTE
// =======================
app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:foundCampground});
		}
	})
})


app.post("/campgrounds/:id/comments", function(req, res) {
	//look up campground using ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			console.log(req.body.comment);
			
			//create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
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




app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("The Yelp camp Server Has Started!");
})