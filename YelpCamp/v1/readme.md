# YelpCamp - V1
* preparation
	* `npm init`
	* `npm install express ejs --save`
* Initialization
	* Add Landing Page
	* Add Campgrounds Page that lists all campgrounds
		* Each Campground has:
			* Name
			* Image
			* `[
		{name:"Salmon Creek", image: "http://www.image.com"}
		{name:"Salmon Creek", image: "http://www.image.com"}
		{name:"Salmon Creek", image: "http://www.image.com"}
	...
		]`
* Layout and Basic Styling
	* Create our header and footer partials
	* Add in Bootstrap
* Creating New Campgrounds
	* Setup new campground POST route
		* `app.post("/campgrounds", function(req, res) {})`
	* Add in body-parser
		* `npm install body-parser --save`
	* Setup route to show form
	* Add basic unstyled form
* Style the campgrounds page
	* Bootstrap v3 for Bootstrap v4 - https://www.youtube.com/watch?v=NHHh0sj1uKY
	* Add a better header/title
	* Make campgrounds display in a grid
* Style the Navbar and Form
	* Add a navbar to all templates
	* Style the new campground form
