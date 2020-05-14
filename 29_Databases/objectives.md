# DataBases

## Intro to Databases
* What is a database?
	* A collection of information/data
	* Has an interface
* SQL(relational) vs NoSQL(non-relational)

## Intro to MongoDB
* how to launch MongoDB: 
	* https://www.youtube.com/watch?v=jNxBu_HZf9Y&feature=youtu.be
	* `mongod`
	* `echo "mongod --nojournal" > mongod`
	* `chmod a+x mongod` + `./mongod` this will save journal to mongod, and this will not create journal files which save up space
	* create a new terminal window, type `mongo`
* Mongo command: CRUD (create, read, update, delete)
	* mongod
	* mongo
	* help
	* show dbs
		* `show dbs`
		*`use yelp_camp`
		* `show collections`
	* use
		* `use demo`, if demo exists, use it; or create demo database
	* insert
		* `db.dogs.insert({name:"Rusty", breed:"Mutt"})`: db: demo database; dogs: a collection
		* `show collections`
	* find
		* `db.dogs.find()`: show all the database in the dogs collection
		* `db.dogs.find({breed:"Mutt"})`: find particular data with the specific condition
	* update
		* `db.dogs.update({name:"lulu"}, {breed:"labradoodle"})`: will update all the things, if not specify, for example, name is not specified, then the updated data will only have breed without other information
		* `db.dogs.update({name:"lulu"}, {$set:{breed:"labradoodle"}})`
	* remove
		* `db.dogs.remove({breed: "Mutt"})` remove everything that match, specify the number `.limit(1)`

* Mongoose
