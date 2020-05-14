# Rendering HTML and Templates

* Use `res.render()` to render HTML (from an EJS file)
* Explian what EJS is and Why we use it
	* embed JS into HTML file
	* usage: `<%= %>` in ejs file
	* usage: `var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});` in app.js
* pass variables to EJS templates

# EJS control flow
* Show examples of conrol flow in EJS templates
	* `app.set("view engine", "ejs");`
	* does not need to specify res.render("love.`ejs`")
* Write if statements in an EJS file
	* `<%= %>` the sign of = refers to the content is to be displayed in html text
	* `<% %>` the sign of logic statements
* Write loops in an EJS file

# Serving custom assets
* show how to properly include public assets
	* `mkdir public`
	* `touch public/app.css`
* properly configure our app to use EJS
	* `app.use(express.static("public"));` inside app.js
* partials
	* `mkdir views/partials`
	* `touch views/partials/header (footer).ejs`
	* `<%- include("partials/header") %>` or `<%- include("partials/footer") %>`
	* check EJS version in project's package.json file and update it, if need be, to v3.0.1, by running the following command in your terminal: `npm i -S ejs`


# Post Requests!!!
* Write post routes, and test them with Postman
* Use a form to send a post request
	* `<form action="/..." method="POST">`
* Use body parser to get form data
	* `npm install body-parser --save`
	* `var bodyParser = require("body-parser");`
	* `app.use(bodyParser.urlencoded({extended: true}));`
	* `req.body....`