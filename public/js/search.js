// Recipe Advanced Search

const searchBtn = $(".searchRecipe");

// Search button click event 
searchBtn.on("click", function (event) {
	event.preventDefault();

	// Variables for user input parameters
	const mealType = $("#mealType option:selected").text();
	const proteinType = $("#proteinType");
	const veggieType = $("#veggieType");
	const glutenFree = $("#glutenFree");
	const dairyFree = $("#dairyFree");
	const vegan = $("#vegan");
	const vegetarian = $("#vegetarian");
	
	// Collect user inputs
	var searchParam = {
		gluten_free: glutenFree.is(":checked", function () {
			glutenFree.prop("checked", true);
		}),
		dairy_free: dairyFree.is(":checked", function () {
			dairyFree.prop("checked", true);
		}),
		vegetarian: vegetarian.is(":checked", function () {
			vegetarianFree.prop("checked", true);
		}),
		vegan: vegan.is(":checked", function () {
			veganFree.prop("checked", true);
		}),
	};

	if (mealType) {
		searchParam.mealType = mealType;
	}
	if (proteinType.val()) {
		searchParam.proteinType = proteinType.val().trim();
	}
	if (veggieType.val()) {
		searchParam.veggieType = veggieType.val().trim();
	}

	const url = "/api/search/" + $.param(searchParam);
	search(searchParam).then(function (data) {
		console.log("Recipe search completed successfully");
		window.location.href = url;
	}).catch(function(error) {
		console.log("Recipe search failed", error);
	});

});

// AJAX http request for recipe search
function search(searchParam) {
	return $.ajax({
		url: searchParam,
		type: "GET",
	});
}