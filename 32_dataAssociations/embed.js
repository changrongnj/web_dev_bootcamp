const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/ass_embed_data', {useNewUrlParser: true, useUnifiedTopology: true});

// POST - title, content
const postSchema = new mongoose.Schema({
	title:String,
	content:String
});
const Post = mongoose.model("post", postSchema);


//USER -email,name
const userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts: [postSchema]
});

const User = mongoose.model("user", userSchema);

// create a new user
// const newUser = new User({
// 	email:"chang.ro@husky.neu.edu",
// 	name:"Rong Chang"
// });

// newUser.save(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else{
// 		console.log(user);
// 	}
// })

// create a new post
// const newPost = new Post({
// 	title: "reflection on apple",
// 	content: "They are delicious"
// });
// // save is an INSTANCE method of the model; create is static method from MODEL
// Post.create(newPost, function(err, post) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// })

// add new user with posts.
// const newUser = new User({
// 	email:"hermione@hogwarts.edu",
// 	name:"Hermione Granger"
// });

// newUser.posts.push({
// 	title:"how to bre fjawifa",
// 	content: "this is how to ..."
// });

// save this new HERMIONE USER
// newUser.save(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else{
// 		console.log(user);
// 	}
// })

User.findOne({name:"Hermione Granger"}, function(err, user) {
	if(err) {
		console.log(err);
	} else {
		user.posts.push({
			title: "3 things i really hate",
			content: "voldemore, voldemore, voldemore"
		});
		user.save(function(err, user) {
			if(err) {
				console.log(err);
			} else {
				console.log(user);
			}
		})
	}
})

