// create secretNumber
var secretNumber = 4;

// ask user for guess
var guess = Number(prompt("Guess a number"));

// check if guess is right
if (guess === secretNumber) {
	alert("YOU GOT IT RIGHT!");
}
//otherwise, you got it wrong
else if (guess > secretNumber) {
	alert("Too high. Guess again!");
}

else {
	alert("Too lowe. Guess again!");
}

// var num = 2;
// var guess = prompt("Guess a number!");
// while (guess != num) {
// 	if (guess < num) {
// 		guess = prompt("Too low, try again!");
// 	}
// 	else {
// 		guess = prompt("Too high, try again!");
// 	}
// }
// if (guess == num) {
// 	alert("You guessed it!");
// }
