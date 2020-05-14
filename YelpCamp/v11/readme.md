# YelpCamp - V11
* Adding in Flash!
	* Demo working version
	* Install and configure connect-flash
		* `flash = require("connect-flash")`,
		* `app.use(flash());` //comes before your router configuration in app.js
		* `router.get("/login", function(req, res) {
	res.render("login", {message: "You need to log in"});` or add flash `router.get("/login", function(req, res) {
	res.render("login", {message: req.flash("failure")});`
	* Add boostrap alerts to header
		* if we want every single page has this message, we need to add to header, however, we need to pass the  defnition of message into every router that needs the message.
		* in app.js, add `res.locals.message = req.flash("failure");` to app.use(function(req, res, next) {...});
		* This would pass the definition of the message to every file.