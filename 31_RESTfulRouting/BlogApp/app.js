//npm install express mongoose body-parser ejs --save
//npm install method-override --save
//npm install express-sanitizer --save
const express  = require("express"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
app            = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "testBlog",
// 	image: "https://images.unsplash.com/photo-1588617312537-5df90cc4acd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
// 	body: "hello this is a blog post"
// });

// RESTFUL ROUTES
app.get("/", function(req, res) {
	res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("error!");
		} else {
			res.render("index", {blogs:blogs});
		}
	});
})

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
})

//CREATE ROUTE
app.post("/blogs", function(req, res) {
	//create blogs
	req.body.blog.body = req.sanitize(req.body.blog.body); // no hacker alert will affect post
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	})
})

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");	
		} else {
			res.render("show", {blog:foundBlog});
		}
	})
})

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog:foundBlog});
		}
	})
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//Blog.findByIdAndUpdate(id, newData, callback)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
	// destroy blogs
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect("/blogs");
		} else {
			// redirect		
			res.redirect("/blogs");
		}
	})
})



app.listen(process.env.PORT||3000, process.env.IP, function() {
	console.log("Server has started!");
})