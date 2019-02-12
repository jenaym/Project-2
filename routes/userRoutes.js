//
// Routes for logged in users
//

// Bring in express and database models
const express = require("express");
const router = express.Router();
const db = require("../models");
<<<<<<< HEAD
const ensureAuthenticated = require("./usersAuthHelper");


// User's personalized page route
router.get("/:id", ensureAuthenticated, (req, res) => {
	res.render("users/index", getUserData(req.user));
});

// Mark a recipe as favorite
router.post("/api/users/favorite/:recipeId", ensureAuthenticated, function (req, res) {
	db.UserProfile.findOrCreate({
		where: {
			UserId: req.user,
			RecipeId: req.params.recipeId
		},
		defaults: {
			favorite: true
		}
	}).spread((userInfo, created) => {
=======
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
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
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

<<<<<<< HEAD
//////////////////////////////////////////////////////
// Helper functions
=======
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
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6

//
// Find the user's login info by user's ID
//
function userInfoById(userId) {
	return new Promise((resolve, reject) => {
<<<<<<< HEAD
		db.User.findOne({
			where: {
				id: userId
			}
		}).then(info => {
			resolve(info);
		}).catch(err => reject(err));
=======
		db.User.findByPk(userId)
			.then(user => {
				console.log(`Found user info for [${userId}] ${user}`);
				resolve(user);
			})
			.catch(err => {
				reject(err);
			});
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
	});
}

//
// Find all recipes by the user
//
<<<<<<< HEAD
=======
// PARAMS:
// * userId = the user ID
// RETURN:
// * Promise instance
//
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
function getAllRecipesByUser(userId) {
	console.log(`Finding all recipes by userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				posted: true
			}
<<<<<<< HEAD
		}).then(recipes => {
			resolve(recipes);
=======
		}).then(items => {
			if (!items || items.length === 0) resolve(null);
			db.Recipes.findAll({
				[Op.in]: items.map(recipe => recipe.id)
			}).then(recipes => {
				// console.log(`Found all recipes by userId[${userId}] ${JSON.stringify(recipes)}`);
				resolve(recipes);
			}).catch(err => reject(err));
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
		}).catch(err => reject(err));
	});
}

//
// Retrieve user's favorite recipes
//
<<<<<<< HEAD
=======
// PARAMS:
// * userId = the user ID
// RETURN:
// * Promise instance
//
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
function getAllUserFavorites(userId) {
	console.log(`Finding all favorite recipes of userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				favorite: true
			}
<<<<<<< HEAD
		}).then(recipes => {
			resolve(recipes);
=======
		}).then(items => {
			if (!items || items.length === 0) resolve(null);
			db.Recipes.findAll({
				[Op.in]: items.map(recipe => recipe.id)
			}).then(recipes => {
				resolve(recipes);
			}).catch(err => reject(err));
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
		}).catch(err => reject(err));
	});
}

//
<<<<<<< HEAD
//
// collect user's favorites and own posted recipes
// by starting queries asynchronously
//
async function getUserData(userId) {
	const info = userInfoById(userId);
	const	recipes = getAllRecipesByUser(req.user);
	const	favorites = getAllUserFavorites(req.user);
	const userData = {
		info: await info,
		recipes: await recipes,
		favorites: await favorites
	};

	return userData;
}
=======
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
			if (!recipes || recipes.length === 0) recipes = null;
			resolve(recipes);
		}).catch(err => reject(err));
	});
}

// Export the router
module.exports = router;
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
