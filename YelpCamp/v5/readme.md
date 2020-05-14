# YelpCamp - V4
* Refractor Mongoose Code
	* Create a models directory
	* Use module.exports
* Add Seeds File
	* Add a seeds.js file
	* Run the seeds file every time the server starts
* Add the Comment model
* Comment New/Create
	* Discuss nested routes
	* Add comment new and create routes
	* Add the new comment form
* Style show page

	
* Current RESTFUL ROUTES
name     url              verb    desc
====================================================
INDEX   /campgrounds      GET     display a list
NEW     /campgrounds/new  GET     display form to make new
CREATE  /campgrounds      POST    add new to DB
SHOW    /campgrounds/:id  GET     show infor about one

NEW     /campgrounds/:id/comments/new     GET
CREATE  /campgrounds/:id/comments         POST   