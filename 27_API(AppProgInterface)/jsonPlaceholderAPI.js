
// // example of Yahoo weather
// console.log("SUnset in Hawaii is at ...");
// request("http://www.yahoo weather API.....", function(error, response, body)){
// 	if(!error && response.statusCode == 200) {
// 		var parsedData = JSON.parse(body);  
// 		//console.log(body); //typeof body, it is a string!!!
// 		console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);
// 	} 
// })


const request = require("request");
//request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body){
request("https://jsonplaceholder.typicode.com/users/1", (error, response, body) => {
	// npm i -D locus
	//eval(require('locus'))
	if(!error && response.statusCode == 200) {
		const parsedData = JSON.parse(body);  
		//parsedData["name"]
		//console.log(parsedData.name + " lives in " + parsedData.address.city);
		console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
	
	}
})