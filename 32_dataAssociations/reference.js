const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/ass_ref_data', {useNewUrlParser: true, useUnifiedTopology: true});

const Post = require("./models/post");
const User = require("./models/user");

// CREATE A USER, SAME AS IN EMBED.JS
// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });


// // CREATE A POST, SAME AS IN EMBED.JS
// Post.create({
// 	title: "how to cook the best burger",
// 	content: "blah blah blah blah blah blah blah"
// }, function(err, post) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

// CREATE A POST WITH SAVE FUNCTION, SAME AS IN EMBED.JS
Post.create({
	title: "how to cook the best burger pt.3",
	content: "blah blah blah blah blah blah blah"
}, function(err, post) {
	if (err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
			if (err) {
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save(function(err,data) {
					if (err) {
						console.log(err);
					} else {
						console.log(data);
					}
				})
			}
		})
	}
})


// //FIND USER FIRST, FIND ALL POSTS FOR THAT USER
// User.findOne({email:"bob@gmail.com"}).populate("pppo").exec(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// })
