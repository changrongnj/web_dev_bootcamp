const mongoose = require("mongoose");


// POST - title, content
const postSchema = new mongoose.Schema({
	title:String,
	content:String
});

//const Post = mongoose.model("post", postSchema);
module.exports = mongoose.model("post", postSchema);