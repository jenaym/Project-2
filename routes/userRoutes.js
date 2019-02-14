//
// Routes for logged in users
//

// Bring in express and database models
const express = require("express");
const router = express.Router();
const db = require("../models");
const Op = db.Sequelize.Op
const ensureAuthenticated = require("./usersAuthHelper");

// Gateway route for a user's page area
// this route is NOT protected
router.get("/index", (req, res) => {
	if (req.user) res.redirect("/users/" + req.user.id);
	else res.redirect("/users/login");
});

// Gateway route for a user's page area
// this route is NOT protected
router.get("/index", (req, res) => {
	if (req.user) res.redirect("/users/" + req.user.id);
	else res.redirect("/users/login");
});

// User's personalized page route
router.get("/:id", ensureAuthenticated, (req, res) => {
	getUserData(req.user.id, (userData) => {
		// Do not show recommendation if user has favorites
		if (userData.favorites && userData.favorites.length > 0) {
			userData.recommend = null;
		}

		res.render("users/index", {
			recipes: userData
		});
	});
});

// Mark a recipe as favorite
router.post("/favorite/:recipeId", ensureAuthenticated, function (req, res) {
	console.log(`userid: ${req.user.id}, recipeid: ${req.params.recipeId}`);
	db.UserProfile.findOrCreate({
		where: {
			UserId: req.user.id,
			RecipeId: req.params.recipeId
		},
		defaults: {
			favorite: true,
			posted: false
		}
	}).spread((userInfo, created) => {
		console.log('OK');
		if (created) {
			req.flash("success_msg", "The recipe has been added to favorites.");
		} else {
			req.flash("success_msg", "The recipe has been marked as favorite.");
		}
		res.json(userInfo);
	}).catch(err => {
		console.log(err)
		req.flash("error_msg", "Failed to add. User and/or recipe not found.");
		res.json(null);
	});
});

/*
---------------------------------------------------------------------------
 Helper functions
---------------------------------------------------------------------------
*/

//
// Collect user's favorites and own posted recipes
// by starting queries asynchronously
//
// PARAMS:
// * userId = the user ID
// * cbackFunc = callback function to call against the result
//
async function getUserData(userId, cbackFunc) {
	const recommend = getRecipes(5);
	const posted = getAllRecipesByUser(userId);
	const favorites = getAllUserFavorites(userId);
	const userData = {
		recommend: await recommend,
		posted: await posted,
		favorites: await favorites
	};
	
	cbackFunc(userData);
}

//
// Find the user's login info by user's ID
//
function userInfoById(userId) {
	return new Promise((resolve, reject) => {
		db.User.findByPk(userId)
			.then(user => {
				console.log(`Found user info for [${userId}] ${user}`);
				resolve(user);
			})
			.catch(err => {
				reject(err);
			});
	});
}

//
// Find all recipes by the user
//
// PARAMS:
// * userId = the user ID
// RETURN:
// * Promise instance
//
function getAllRecipesByUser(userId) {
	console.log(`Finding all recipes by userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				posted: true
			}
		}).then(items => {
			if (!items || items.length === 0) resolve(null);
			db.Recipes.findAll({
				[Op.in]: items.map(recipe => recipe.id)
			}).then(recipes => {
				// console.log(`Found all recipes by userId[${userId}] ${JSON.stringify(recipes)}`);
				recipes.forEach(recipe => {
					fixRecipeImage(recipe);
				});

				resolve(recipes);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

//
// Retrieve user's favorite recipes
//
// PARAMS:
// * userId = the user ID
// RETURN:
// * Promise instance
//
function getAllUserFavorites(userId) {
	console.log(`Finding all favorite recipes of userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				favorite: true
			}
		}).then(items => {
			if (!items || items.length === 0) resolve(null);
			db.Recipes.findAll({
				[Op.in]: items.map(recipe => recipe.id)
			}).then(recipes => {
				recipes.forEach(recipe => {
					fixRecipeImage(recipe);
				});

				resolve(recipes);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

//
// Generic find recipes function
//
// PARAMS:
// * num = the maximum number of recipes
// RETURN:
// * Promise instance
//
function getRecipes(num = 5) {
	console.log(`Finding ${num} recipes`);

	return new Promise((resolve, reject) => {
		db.Recipes.findAll({
			limit: num
		}).then(recipes => {
			console.log(`Found ${recipes.length} recipes`);
			if (!recipes || recipes.length === 0) {
				recipes = null;
			} else {
				recipes.forEach(recipe => {
					fixRecipeImage(recipe);
				});
			}
			
			resolve(recipes);
		}).catch(err => reject(err));
	});
}

function fixRecipeImage(recipe) {
	recipe.imageSrc = (recipe.image)
		? `data:image/jpeg;base64, ${recipe.image.toString("base64")}`
		: recipe.imageURL;
	recipe.image = null;
	recipe.imageURL = null;
}

// Export the router
module.exports = router;