var db = require("../models");
const ensureAuthenticated = require("./usersAuthHelper");
var multiparty = require("multiparty");
var fs = require("fs");

module.exports = function (app) {
	// Get all Recipes
	app.get("/api/recipes", function (req, res) {
		db.Recipes.findAll({
			where: req.body
		}).then(function (recipes) {
			res.json(recipes);
		});
	});

	// Get Recipe details by recipe id 
	app.get("/api/recipes/:id", function (req, res) {
		db.Recipes.findByPk(req.params.id).then(function (dbRecipe) {
			if (dbRecipe === null) {
				res.status(404).send("Not Found");
			}

			// Sequelize provides getProducts() function, when we build associations 
			dbRecipe.getProducts().then(function (products) {
				var response = {
					recipe: dbRecipe,
					products: products
				};

				// TODO: Fix image vs imageURL as done in html route
				dbRecipe.image = dbRecipe.image.toString("base64");
				res.json(response);
			});
		});
	});

	// Create or Post a new recipe
	app.post("/api/recipes", function (req, res) {
		db.Recipes.create(req.body).then(function (recipe) {
			res.json(recipe.id);
		});
	});

	// Get all Products 
	app.get("/api/products", function (req, res) {
		db.Products.findAll({
			where: req.body
		}).then(function (products) {
			res.json(products);
		});
	});

	// Find/insert one product and return the id
	app.post("/api/products", function (req, res) {
		db.Products.findOrCreate({
				where: {
					name: req.body.name
				},
				defaults: req.body
			})
			.spread(function (product, created) {
				console.log(created);
				console.log(product.id)
				res.json(product.id)
			}).catch(err => {
				console.log()
			})
	});

	//
	// Post Ingredients for a recipe
	//	
	// Table: ingredients
	// Columns:
	//   amount int(11) 
	//   measurement varchar(255) 
	//   createdAt datetime     <-- auto 
	//   updatedAt datetime     <== auto
	//   ProductId int(11) PK   <== REQUIRED
	//   RecipeId int(11) PK    <== REQUIRED
	//
	app.post("/api/ingredient/:recipeid/:productid", function (req, res) {
		db.Ingredients.findOrCreate({
				where: {
					RecipeId: req.params.recipeid,
					ProductId: req.params.productid
				},
				defaults: req.body
			})
			.spread((ingr, created) => {
				console.log("Ingredient inserted successfully");
				return;
			}).catch(err => {
				console.log("Failed adding the ingredient ");
				return;
			});
	});

	// Delete a recipe by id
	app.delete("/api/recipes/:id", ensureAuthenticated, function (req, res) {
		db.Recipes.destroy({
			where: {
				id: req.params.id
			}
		}).then(function (recipe) {
			res.json(recipe);
		});
	});


	// ======================== Update recipe rating ===========================
	app.put("/api/recipes/:id/rating", function (req, res) {
		db.Recipes.findByPk(req.params.id).then(function (dbRecipe) {
			if (dbRecipe === null) {
				res.status(404).send("Not Found");
			}
			dbRecipe.update({
				rating: dbRecipe.rating + 1
			}).then(function (dbRecipeUpdated) {
				res.json(dbRecipeUpdated);
			});
		});
	});

	//================================Upload Image=================================
	app.put("/api/recipes/:id/image", function (req, res) {

		var form = new multiparty.Form();
		form.parse(req, function (err, fields, files) {
			if (err) {
				res.status(400).send("Bad User Input");
			}

			fs.readFile(files["image"][0].path, function (err, data) {
				db.Recipes.findByPk(req.params.id).then(function (dbRecipe) {
					if (dbRecipe === null) {
						res.status(404).send("Not Found");
					}
					dbRecipe.update({
						image: data
					}).then(function (dbRecipeUpdated) {
						res.json(dbRecipeUpdated.id);
					});
				});
			});
		});
	});

	// Searching Recipes
	app.get("/api/recipes", function (req, res) { 
		db.Recipes.findAll({
			where: req.body
		}).then(function (recipes) {
			res.json(recipes);
		});
	});
};