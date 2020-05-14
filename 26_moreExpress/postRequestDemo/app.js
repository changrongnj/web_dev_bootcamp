var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friendsList = ["Wei", "Caroline", "Nathan", "Rong"];

app.get("/", function(req, res) {
	res.render("home");
})


app.post("/addfriend", function(req, res) {
	var friend = req.body.newfriend;
	friendsList.push(friend);
	res.redirect("/friends");
})

app.get("/friends", function(req, res) {
	res.render("friends", {friends:friendsList});
})

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("server started ...");
})
