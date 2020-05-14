# Preparation of Movie_Search_App

* install denpendencies
	* `npm install --save express ejs request`
* get to API and know how to use
	* OMDb API: http://www.omdbapi.com/
	* Send all data requests to: http://www.omdbapi.com/?apikey=[yourkey]&
		* `apikey=thewdb`
		* parameter `s` required
		* http://www.omdbapi.com/?apikey=thewdb&s=star
	* Poster API requests: http://img.omdbapi.com/?apikey=[yourkey]&
		* http://www.omdbapi.com/?apikey=thewdb&i=tt0076759
		* add more optional parameters with `&`: http://www.omdbapi.com/?apikey=thewdb&i=tt0076759&plot=full