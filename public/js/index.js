// Get references to page elements
const recipeName = $("#recipe-name");
const recipeDescription = $("#description");
const glutenFree = $("#glutenFree");
const dairyFree = $("#dairyFree");
const vegan = $("#vegan");
const vegetarian = $("#vegetarian");
const prepTime = $("#prepTime");
const cookTime = $("#cookTime");
const instructions = $("#instructions");
const img = $("#recipe-image");
const postBtn = $("#postButton");
const recipeList = $("#recipe-list");
const mealType = $("#mealType");


// The API object contains methods for each kind of request we'll make
var API = {
	saveRecipe: function (recipe) {
		return $.ajax({
			headers: {
				"Content-Type": "application/json"
			},
			type: "POST",
			url: "api/recipes",
			data: JSON.stringify(recipe)
		});
	},
	setRecipeImage: function(id, file) {
		// Only JPEG files less than 1MB
		if (file.type != "image/jpeg") {
			alert("JPEG image format is expected.");
			return;
		}

		if (file.size > 1024 * 1024) {
			alert("File size below 1MB is expected.");
			return;
		}

		var data = new FormData();
		data.append("image", file);
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.open("PUT", "api/recipes/" + id + "/image");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.send(data);
	},
	getRecipe: function() {
		return $.ajax({
			url: "api/recipes",
			type: "GET"
		});
	},
	deleteRecipe: function (id) {
		return $.ajax({
			url: "api/recipes/" + id,
			type: "DELETE"
		});
	},
	saveIndvProduct: function (product, callback) {
		return $.ajax({
			headers: {
				"Content-Type": "application/json"
			},
			url: "api/products",
			type: "POST",
			data: JSON.stringify(product)
		}).then(productId => {
			callback(productId);
		}).catch(err => console.log(err));
	},
	getProduct: function () {
		return $.ajax({
			url: "api/products/",
			type: "GET"
		});
	},
	saveIngredient: function (recipeId, productId, ingredient) {
		return $.ajax({
			headers: {
				"Content-Type": "application/json"
			},
			url: `api/ingredient/${recipeId}/${productId}`,
			type: "POST",
			data: JSON.stringify(ingredient)
		});
	},
	// updateRating: function(rating){
	// 	return $.ajax({
	// 		url: "/api/recipes/" + id,
	// 		type: "POST",
	// 		data: rating,
	// 	})
	// }
	// },
	addUserRecipe: function(recipeId) {
		return $.ajax({
			url: "/users/posted/" + recipeId,
			type: "POST",
			data: JSON.stringify(recipeId)
		}).catch(err => {
			if (/^4\d+/.test(err.status)) {
				console.log("Failed to update UserProfile for recipe post");
			}
		});
	},
};


// refreshRecipes gets new recipes from the db and repopulates the list
var refreshRecipes = function () {
	API.getRecipe().then(function (data) {
		var $recipes = data.map(function (recipe) {
			var $a = $("<a>")
				.text(recipe.name)
				.attr("href", "/recipe/" + recipe.id);

			var $li = $("<li>")
				.attr({
					class: "list-group-item",
					"data-id": recipe.id
				})
				.append($a);

			var $button = $("<button>")
				.addClass("btn btn-danger float-right delete")
				.text("ｘ");

			$li.append($button);

			return $li;
		});

		recipeList.empty();
		recipeList.append($recipes);
	});
};

// handleFormSubmit is called whenever we submit a new recipe
// Save the new recipe to the db and refresh the list
var handleFormSubmit = function (event) {
	event.preventDefault();

	var recipe = {
		name: recipeName.val().trim(),
		description: recipeDescription.val().trim(),
		mealType: mealType.val(),
		gluten_free: glutenFree.is(":checked", function () { glutenFree.prop("checked", true); }),
		dairy_free: dairyFree.is(":checked", function () { dairyFree.prop("checked", true); }),
		vegetarian: vegetarian.is(":checked", function () { vegetarian.prop("checked", true); }),
		vegan: vegan.is(":checked", function () { vegan.prop("checked", true); }),
		prep_time: prepTime.val().trim(),
		cook_time: cookTime.val().trim(),
		instructions: instructions.val().trim(),
	};

	console.log("RECIPE: " + JSON.stringify(recipe));

	// Accumulate ingredients and products in arrays
	let ingredients = [];
	let products = [];

	// The number of ingredients the user input
	const numIngredients = $(".ingrItem").length;
	console.log("INGRE ITEMS = " + numIngredients);

	// Get the inputs and store into ingredients and products arrays 
	for (let j = 1; j <= numIngredients; j++) {
		const ingrName = $(`#ingrID-${j}`).val().trim();
		const qty = $(`#qtyID-${j}`).val().trim();
		const unit = $(`#unitID-${j} option:selected`).text();
		const cal = $(`#calID-${j}`).val().trim();

		ingredients.push({
			amount: qty,
			measurement: unit
		});
		products.push({
			name: ingrName,
			calories: cal
		});
	}

	if (!(recipe.name && recipe.description)) {
		alert("You must enter a recipe name and description!");
		return;
	}

	API.saveRecipe(recipe).then(function (resp) {
		const imgFile = $("#recipe-image").val().trim();
		if (imgFile) { // IFF there's an image input, THEN store in database
			console.log("Found the image file: " + imgFile);
			API.setRecipeImage(resp, img[0].files[0]);
		}
		
		console.log("Got recipe ID: " + resp);
		for (let j = 0; j < numIngredients; j++) {
			API.saveIndvProduct(products[j], function(productId) {
				if (productId) {
					console.log("INGREDIENTS => " + JSON.stringify(ingredients[j]));
					API.saveIngredient(resp, productId, ingredients[j]);
				}
			});
		}
		
		// Keep track of the recipe posted by the user
		API.addUserRecipe(resp)
			.then(user => {
				console.log(JSON.stringify(user));
				// console.log(`Recipe ${resp} saved in the user profile.`)
			})
			.catch(err => console.log(err));

		// Naigate to the newly created recipe
		window.setTimeout(function(){ window.location.href = "/recipes/" + resp }, 3000);

	}).catch(error => { console.log("ERROR: Recipe insertion", error); });
};

// handleDeleteBtnClick is called when an recipe's delete button is clicked
// Remove the recipe from the db and refresh the list
var handleDeleteBtnClick = function () {
	var idToDelete = $(this)
		.parent()
		.attr("data-id");

	API.deleteRecipe(idToDelete).then(function () {
		refreshRecipes();
	});
};


// Add event listeners to the submit and delete buttons
postBtn.on("click", handleFormSubmit);
recipeList.on("click", ".delete", handleDeleteBtnClick);
