
const mealType = $("#mealType");
const proteinType = $("#proteinType");
const veggieType = $("#veggieType");
const glutenFree = $("#glutenFree");
const dairyFree = $("#dairyFree");
const vegan = $("#vegan");
const vegetarian = $("#vegetarian");
const searchBtn = $(".searchRecipe");


		// $.ajax("/api/burgers/" + id, {
		// 	type: "PUT",
		// 	data: updatedBurger
		// }).then(function() {
		// 	console.log("updated id ", id);
		// 	location.reload();
searchBtn.on("click", function(event) {
	event.preventDefault();

	var searchParam = {
		gluten_free: glutenFree.is(":checked", function () { glutenFree.prop("checked", true); }),
		dairy_free: dairyFree.is(":checked", function () { glutenFree.prop("checked", true); }),
		vegetarian: vegetarian.is(":checked", function () { glutenFree.prop("checked", true); }),
		vegan: vegan.is(":checked", function () { glutenFree.prop("checked", true); }),
	};

	if (mealType.val()) {
		searchParam.mealType = mealType.val(),
	}
	if (proteinType.val()) {
		searchParam.proteinType = proteinType.val().trim(),
	}
	if (veggieType.val()) {
		searchParam.veggieType = veggieType.val().trim(),
	}

	search(searchParam).then(function (data) {
		
		results(data);
	}
	)


})
function search(searchParam) {
		return $.ajax({
			url: "api/recipes",
			type: "GET",
			data: searchParam
		});
}

function results(data) {
	return $.ajax({
		url: "/search",
		type: "POST",
		data: data
	});
}
