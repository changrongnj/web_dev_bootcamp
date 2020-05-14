# Associations

## Intro to Associations
* Define associations
* Discuss one:one, one:many, and many:many relationships

## Embedding Data
* `newUser.save(XX, function())` or `User.create(user, function())`
* `push` then `save`
* `User.found(XXX, function() {if.. else {user.XX.push()}; user.save.function()})`

## Referencing Data
* `type:mongoose.Schema.Types.ObjectId`,`ref:"XX"`

## Module.Exports
* Introduce module.exports: clean up the models: `module.exports = mongoose.model("post", postSchema);`
* Move our models into seperate files