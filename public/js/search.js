$(document).ready(function() { 
	$(".searchRecipe").on("click", function() {
		var id = $(this).attr("burgerID");

		var mealType = $("#mealType").val();
		var proteinType = $("#proteinType").val().trim();
		var veggieType = $("#veggieType").val();


		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: updatedBurger
		}).then(function() {
			console.log("updated id ", id);
			location.reload();
		});
	});
});