var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

// start with colors and picked color
var numSquares = 6;
var colors = [];
var pickedColor;

init();


// reset button 
resetBtn.addEventListener("click", function() {
	reset();
});


function init() {
	setupModeButtons();
	setupSquares();
	reset();

}

// mode button even listner - easy and hard button
function setupModeButtons() {
	for (var i=0; i<modeBtn.length; i++) {
		modeBtn[i].addEventListener("click", function(){
			modeBtn[0].classList.remove("selected");
			modeBtn[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent == "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	};
}

// square listner
function setupSquares() {
	for (var i=0; i<squares.length; i++) {
		squares[i].addEventListener("click", function(){
			if (this.style.backgroundColor === pickedColor) {
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				message.textContent = "Correct!";
				resetBtn.textContent = "PLAY AGAIN?";
			}
			else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again";
				resetBtn.textContent = "NEW COLORS";
			}
		});
	};
}


function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	for (var i=0; i<squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
	resetBtn.textContent = "NEW COLORS";
	message.textContent = "";
}

function changeColors(color) {
	for (var i=0; i<squares.length;i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * numSquares);
	return colors[random];
}

function generateRandomColors(num) {
	var arrColors = [];
	for (var i=0; i<num; i++) {
		arrColors.push(randomColor());
	}
	return arrColors;
}

function randomColor() {
	//red
	var red = Math.floor(Math.random() * 256);
	//green
	var green = Math.floor(Math.random() * 256);
	//blue
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}