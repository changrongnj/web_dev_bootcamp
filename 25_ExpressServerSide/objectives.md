# Introduction to Express

* What is a framework? How is it different from a library?
	* inversion of control
	* library: you are in control
	* framework: control flow is already defined, and there are predefined white spots allow to fill in your own code
* What is Express?
	* web-develop framework
	* http://expressjs.com/
	* $ `npm install express`

# NPM Init and Package.json
* Use `npm init` to create a new package.json
* Use the `npm install XXX --save` flag to install packages (dependencies), e.g.,
	* npm install express --save
	* npm install cat-me --save
* Explain what the package.json file does

# Routing
* Show the `*` route matcher (see example in app.js)
	* `*` matches everything (route) else that not defined for request. 
	* IT NEEDS TO BE AFTER ALL THE OTHER ROUTE
	* app.get("*", function(req,res) {res.send("You are a star");})
* write routes containing route parameters
	* `:` - parameters, therefore, any routing follows the pattern /topic/XXX
	* `app.get("/topic/:subtopicName", function(req, res) {res.send("welcome to a subtopic!");})`
	* `app.get("/topic/:subtopicName/comments/:id/:title/", function(req, res){res.send("welcome to the comments page!");` = https://webdevbootcamp-jyuuo.run-us-west2.goorm.io/topic/hello/comments/wei/hi
* route order

