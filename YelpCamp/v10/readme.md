# YelpCamp - V10
* Editing Campgrounds
	* Add method-override
		* `npm install method-override --save`
	* Add edit route for campgrounds
	* add link to edit page
	* add update route
	* fix $set problem
* Delete Campgrounds
	* add deletion route
	* add deletion button
* Authorization: permission
	* User can only edit his/her campgrounds
	* User can only delete his/her campgrounds
	* Hide/show edit and delete buttons
	* Authentication: find out if someone is who they say they are
* Editing Comments
	* Add Edit route for comments
	* Add Edit buttons
	* Add Update route
	* Campground edit route: `/compgrounds/:id/edit`, Comment edit route: `/campgrounds/:id/comments/:comment_id/edit`
* Deleting comments
	* Add destroy route
	* Add delete button
	* Campground Destroy route: `/campgrounds/:id`, Comment destroy route: `/campgrounds/:id/comments/:comment_id`
* Authorization Part 2: comments
	* User can only edit his/her comments
	* User can only delete his/her comments
	* Hide/Show edit and delete buttons
	* Refactor Middleware: `middleware=require("../middleware")` short for `require("../middleware/index.js")` if the file inside middleware folder is named as "index.js"