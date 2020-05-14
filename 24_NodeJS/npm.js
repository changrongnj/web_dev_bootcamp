//npm demo
//npm install cat-me

var cat = require("cat-me");
console.log(cat());

var joke = require("knock-knock-jokes");
console.log(joke());


//node app.js


//npm exercise install faker

var faker = require("faker");

console.log("=====================");
console.log("WELCOME TO MY SHOP!")
console.log("=====================");
for (var i=0; i<10; i++) {
	console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}

