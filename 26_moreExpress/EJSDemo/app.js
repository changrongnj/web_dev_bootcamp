var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
	//res.send("<h1>Welcome to the home page!</h1><h2>blahblah</h2>");
})


app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
	//res.send("You fall in love with " + thing);
})

app.get("/posts", function(req, res) {
	var posts = [
		{title: "hello", author: "hi"},
		{title: "goodbye", author: "bye"},
		{title: "laugh out", author: "lol"}
	];
	res.render("posts", {postsVar: posts});
})

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("Server is listening!!!");
})