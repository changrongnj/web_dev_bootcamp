//npm install passport passport-local passport-local-mongoose express-session --save
const express     = require("express"),
	  app         = express(),
	  bodyParser  = require("body-parser"),
	  mongoose    = require("mongoose"),
	  Campground  = require("./models/campground"),
	  Comment     = require("./models/comment"),
	  seedDB      = require("./seeds"),
	  passport    = require("passport"),
	  LocalStrategy = require("passport-local"),
	  User        = require("./models/user");


seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"lovely caroline",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));// compare use login information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// make this [currentUser:req.user] for every route
//res.render("campgrounds/index", {campgrounds: campgrounds, currentUser:req.user});
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// =====================
// ROUTE
// =====================
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
			// request user for checking if someone is logged in, empty/underfined means not logged in
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
			//console.log("===================");
			//console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})



// =======================
// COMMENTS ROUTE
// =======================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:foundCampground});
		}
	})
})


app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

//=======
//AUTH ROUTE
//=======
app.get("/register", function(req, res) {
	res.render("register");
})

//sign up logic
app.post("/register", function(req, res) {
	User.register(new User({username:req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	})
})

//login form
app.get("/login", function(req, res) {
	res.render("login");
})

// login logic
app.post("/login", 
		 passport.authenticate("local",
							  {successRedirect:"/campgrounds",
							  	failureRedirect:"/login"}),
		 function(req, res) {}
		);


//logout route
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
})


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("The Yelp camp Server Has Started!");
})