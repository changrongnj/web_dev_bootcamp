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

//requiring routes
const commentRoutes = require("./routes/comment"),
	  campgroundRoutes = require("./routes/campground"),
	  indexRoutes = require("./routes/index");

//seedDB(); // seed the database for now, leave the db empty
mongoose.connect('mongodb://localhost:27017/yelp_camp_v7', {useNewUrlParser: true, useUnifiedTopology: true});
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

// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("The Yelp camp Server Has Started!");
})