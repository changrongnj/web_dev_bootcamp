var todo = [];
var input = prompt("What would you like to do?");

while (input != "quit") {
	if (input == "list") {
		listTodo();
	}
	else if (input == "delete") {
		deleteTodo();
	}
	else if (input == "new") {
		addTodo();
	}
	input = prompt("What would you like to do?");
}

console.log("OK, YOU QUIT THE APP");


function listTodo() {
	console.log("***************")
	todo.forEach(function(todoEntry, index) {
		console.log(index + " : " + todoEntry);
	});
	console.log("***************");
}

function addTodo() {
	todo.push(prompt("Enter new todo"));
	console.log("added");
}

function deleteTodo() {
	var index = prompt("Enter index of todo to delete");
	//splice() index is the argument to start the cut, and second arg is how many elements to delete
	todo.splice(index, 1); 
	console.log("Deleted");
}