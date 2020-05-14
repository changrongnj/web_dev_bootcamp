window.setTimeout(function() {

	var btn = document.querySelector("button");
	// var paragraph = document.querySelector("p");

	btn.addEventListener("click", function() {
		// paragraph.textContent = "Someone Clicked Me!";
		document.querySelector("p").textContent = "Someone Clicked Me!";
	});

	// btn.addEventListener("Click", changeText);
	// function changeText() {
	// 	paragraph.textContent = "Someone clicked the button";
	// }

	var head = document.querySelector("h1");
	head.addEventListener("click", function() {
		alert("h1 was clicked!");
		head.textContent = "I am clicked";
		head.style.background = "orange";
	});

	lis = document.querySelectorAll("li");
	for (var i=0; i<lis.length; i++) {
		lis[i].addEventListener("click", function() {
			this.style.color = "pink";
		});
	};


	document.querySelector("div").addEventListener("click", function() {
		this.classList.toggle("purple");
	});

}, 500);


