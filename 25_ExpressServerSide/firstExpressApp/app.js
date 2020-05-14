// 	* Option A:
// 	Change your app.listen code to look like this:

// 	app.listen(3000, function() { 
// 	  console.log('Server listening on port 3000'); 
// 	});
// 	* Option B:
// 	Leave the app.listen code how Colt does it in the lecture, but start your app with this command: PORT=3000 node app.js

var express = require("express");
var app = express();

app.get("/", function(req, res) {
	console.log("someone request home");
	res.send("Hi Wei!");
})

app.get("/bye", function(req, res) {
	console.log("someone request /bye");
	res.send("byebye~~~~");
})

app.get("/wei", function(req, res) {
	console.log("someone request /wei");
	res.send("you are fat fat and fat!!!");
})


// app.get("/topic/soccer");
// app.get("/topic/music");
// app.get("/topic/book");
app.get("/topic/:subtopicName", function(req, res) {
	//any routing follows the pattern /topic/XXX
	// res.send("welcome to a subtopic!");
	console.log(req);
	var subtopic = req.params.subtopicName;
	res.send("welcome to the " + subtopic + " subtopic!");  //dynamic web presentation based on request
});

app.get("/topic/:subtopicName/comments/:id/:title/", function(req, res){
	res.send("welcome to the comments page!");
	// https://webdevbootcamp-jyuuo.run-us-west2.goorm.io/topic/puppl/comments/123/myfirstfjieafj
});



// * matches everything (route) else that not defined for request. 
// IT NEEDS TO BE AFTER ALL THE OTHER ROUTE
app.get("*", function(req,res) {
	res.send("You are a star");
})


app.listen(3000, function() {
	console.log("server listening on port 3000");
})


// app.listen(process.env.PORT, process.env.IP, function() {
// 	console.log("server listening on port 3000");
// });