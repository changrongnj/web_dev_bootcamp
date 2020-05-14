//check off the list
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});


//Deleting todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

//Creating todo
$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		$("ul").append("<li><i class='fas fa-trash'></i> " + $(this).val() + "</li>");
		$(this).val("");
	}
});


$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
})