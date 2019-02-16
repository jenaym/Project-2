let favButton = $("#addFav");

favButton.on("click", function (event) {
	// console.log("foo");
	// event.preventDefault();
	// // // add to favorites

    let id = $(this).attr("recipeId");


	$.ajax("/api/recipes/" + id +"/rating", {
        type: "PUT",
	}).then(
		function (recipe) {

			console.log("whole recipe updated ", recipe);
		}
	);

	$.ajax("/users/favorite/" + id, {
        type: "PUT",
	}).then(
		function (recipe) {

			console.log("whole recipe updated ", recipe);
		}
	);
});