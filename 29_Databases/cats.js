//npm install mongoose

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', {useNewUrlParser: true, useUnifiedTopology: true});

const catSchema = new mongoose.Schema({ //a model of cat contains what information
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model("Cat", catSchema);  // turn the model to the collection: Cat, and Cat now has method, such as Cat.find()

// adding a new cat to the DB
var george = new Cat({
	name: "George",
	age: 11,
	temperament: "Grouchy"
});

george.save(function(err, cat) {  // george is a js data, cat is a george data saved on database cat_app collection Cat
	if (err) {
		console.log("SOMETHING WENT WRONG");
	}
	else {
		console.log("We just saved a cat to the DB");
		console.log(cat);
	}
})


Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat) {
	if (err) {
		console.log("SOMETHING WENT WRONG");
	}
	else {
		console.log("We just saved a cat to the DB");
		console.log(cat);
	}
});



// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) { //cats is the parameter refers to all the returned cats
	if (err) {
		console.log("error!");
		console.log(err);
	} else {
		console.log("all tthe cats ....");
		console.log(cats);
	}
})