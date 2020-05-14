const mongoose = require("mongoose");

//USER -email,name
const userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts: [
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"pppo"
		}
	]
});

//const User = mongoose.model("user", userSchema);
module.exports = mongoose.model("user", userSchema);