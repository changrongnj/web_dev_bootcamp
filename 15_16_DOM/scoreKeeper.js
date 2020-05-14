
var p1Btn = document.querySelector("#p1");
var p2Btn = document.querySelector("#p2");
var p1Score = 0;
var p2Score = 0;
var p1Display = document.querySelector("#s1");
var p2Display = document.querySelector("#s2");
var resetBtn = document.getElementById("reset");
var input = document.querySelector("input[type='number']");
var gameOver =false;
var winningScore = 5;


input.addEventListener("change", function() {
	winningScore = this.value;
	document.querySelector("p span").textContent = winningScore;
	reset();
});


p1Btn.addEventListener("click", function(){
	if (!gameOver) {
		p1Score++;
		p1Display.textContent = p1Score;
		if (p1Score == winningScore) {
			p1Display.classList.add("green");
			gameOver = true;
		}
	}
});


p2Btn.addEventListener("click", function() {
	if (!gameOver) {
		p2Score++;
		p2Display.textContent = p2Score;
		if (p2Score == winningScore) {
			p2Display.classList.add("green");
			gameOver = true;
		}
	}
});


resetBtn.addEventListener("click", function() {
	reset();
});

function reset() {
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("green");
	p2Display.classList.remove("green");
	gameOver = false;
}

