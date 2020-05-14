//npm install express mongoose passport passport-local possport-local-mongoose body-parse express-session ejs --save

const express       = require("express"),
	  mongoose      = require("mongoose"),
	  passport      = require("passport"),
	  bodyParser    = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  User          = require("./models/user");

mongoose.connect('mongodb://localhost:27017/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set("view engine", "ejs");
// use form and post data
app.use(bodyParser.urlencoded({extended:true}));

// this two lines below are required for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // compare use login information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("express-session")({
	secret: "Caroline is pretty and so sweet!!!!", //secret is used for the encoding and decoding the data
	resave: false,
	saveUninitialized: false
}));



// ==================
// ROUTES
// ==================

app.get("/", function(req, res) {
	res.render("home");

})

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
})


// AUTH ROUTES
//show sign up form
app.get("/register", function(req, res) {
	console.log("signed up");
	res.render("register");
})

//handling user signup
app.post("/register", function(req, res) {
	// only pass the username to the data (this is the new registered one), pass password separately
	User.register(new User({username:req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		} 
		passport.authenticate("local")(req,res,function(){ //use local strategy, this will take the user in
			res.redirect("/secret");
		})
 	})
})


//login route
app.get("/login", function(req, res) {
	res.render("login");
})
//login logic
app.post("/login", 
		 passport.authenticate("local", {//middleware
			successRedirect: "/secret",  
			failureRedirect:"/login"}), 
		 function(req, res) {
});


//logout
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
})


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT || 3000, process.env.ID, function() {
	console.log("Server started ...");
})