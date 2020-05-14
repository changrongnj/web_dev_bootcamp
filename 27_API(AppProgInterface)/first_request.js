// curl [APIurl] (in termial)

// -- or -- 

// npm install request

// from github: https://github.com/request/request
// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


var request = require("request");
request("http://www.google.com", function(error, response, body){
	if(error) {
		console.log("Something went wrong!");
		console.log(error);
	} else {
		if (response.statusCode == 200) {
			//THINGS WORKED!
			console.log(body);
		}
	}
});

