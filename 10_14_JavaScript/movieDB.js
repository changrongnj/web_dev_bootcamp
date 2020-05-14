var movies = [
	{
		title: "In Bruges",
		rating: 5,
		hasWatched: true
	},
	{
		title: "Frozen",
		rating: 4.5,
		hasWatched: false
	},
	{
		title: "Mad Max Fury Road",
		rating: 5,
		hasWatched: true
	},
	{
		title: "Les Miserables",
		rating: 3.5,
		hasWatched: false
	}
];


movies.forEach(function(movie) {
	console.log(buildString(movie));
});

function buildString(movie) {
	var rtn = "You have ";
	if (movie.hasWatched) {
		rtn += "watched";
	}
	else {
		rtn += "not seen ";
	}
	rtn += "\"" + movie.title + "\" - " + movie.rating + " stars";
	return rtn;
}