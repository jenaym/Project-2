// var db = require("../models");
// const ensureAuthenticated = require('./usersAuthHelper');

// module.exports = function(app) {
//   // Get all recipes
//   app.get("/api/recipes", function(req, res) {
//     db.Recipes.findAll({}).then(function(recipes) {
//       res.json(recipes);
//     });
//   });

//   // Create a new recipes
//   app.post("/api/recipes", function(req, res) {
//     db.Recipes.create(req.body).then(function(recipe) {
//       res.json(recipe);
//     });
//   });

//   // Delete a recipe by id
//   app.delete("/api/recipes/:id", ensureAuthenticated, function(req, res) {
//     db.Recipes.destroy({ where: { id: req.params.id } }).then(function(recipe) {
//       res.json(recipe);
//     });
//   });
// };
var db = require("../models");
const ensureAuthenticated = require("./usersAuthHelper");
var multiparty = require("multiparty");
var fs = require("fs");

module.exports = function(app) {
	// Get all Recipes
	app.get("/api/recipes", function(req, res) {
		db.Recipes.findAll({
			where: req.body
		}).then(function(recipes) {
			res.json(recipes);
		});
	});

	// Get Recipe details by recipe id 
	app.get("/api/recipes/:id", function(req, res) {
		db.Recipes.findByPk(req.params.id).then(function(dbRecipe) {
			if (dbRecipe === null) {
				res.status(404).send("Not Found");
			}

			// Sequelize provides getProducts() function, when we build associations 
			dbRecipe.getProducts().then(function(products) {
				var response = {
					recipe: dbRecipe,
					products: products
				};

				res.json(response);
			});
		});
	});

	// Create or Post a new recipe
	app.post("/api/recipes", function(req, res) {
		db.Recipes.create(req.body).then(function(recipe) {
			res.json(recipe.id);
		});
	});

	// Get all Products 
	app.get("/api/products", function(req, res) {
		db.Products.findAll({
			where: req.body
		}).then(function(products) {
			res.json(products);
		});
	});

	// Post Ingredients for a recipe
	app.post("/api/recipes/:id/ingredients", function(req, res) {
		req.body.forEach(ingredient => {
			ingredient["RecipeId"] = parseInt(req.params.id);
		});

		db.Ingredients.bulkCreate(req.body).then(function(ingredients) {
			console.log(ingredients);
		});
	});


	// Delete a recipe by id
	app.delete("/api/recipes/:id", ensureAuthenticated, function(req, res) {
		db.Recipes.destroy({ where: { id: req.params.id } }).then(function(recipe) {
			res.json(recipe);
		});
	});


	// ======================== Update recipe rating ===========================
	app.put("/api/recipes/:id/rating", function(req, res) {
		db.Recipes.findByPk(req.params.id).then(function(dbRecipe) {
			if (dbRecipe === null) {
				res.status(404).send("Not Found");
			}
			dbRecipe.update(
				{
					rating: dbRecipe.rating + 1
				}).then(function(dbRecipeUpdated) {
				res.json(dbRecipeUpdated);
			});
		});
	});

	//================================Upload Image=================================
	app.put("/api/recipes/:id/image", function(req, res) {

		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			if (err) {
				res.status(400).send("Bad User Input");
			}

			fs.readFile(files["image"][0].path, function(err, data) {
				db.Recipes.findByPk(req.params.id).then(function(dbRecipe) {
					if (dbRecipe === null) {
						res.status(404).send("Not Found");
					}
					dbRecipe.update(
						{
							image: data
						}).then(function(dbRecipeUpdated) {
						res.json(dbRecipeUpdated.id);
					});
				});
			});
		});
	});
};
