//
// Routes for logged in users
//

// Bring in express and database models
const express = require("express");
const router = express.Router();
const db = require("../models");
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

//////////////////////////////////////////////////////
// Helper functions

//
// Find the user's login info by user's ID
//
function userInfoById(userId) {
	return new Promise((resolve, reject) => {
		db.User.findOne({
			where: {
				id: userId
			}
		}).then(info => {
			resolve(info);
		}).catch(err => reject(err));
	});
}

//
// Find all recipes by the user
//
function getAllRecipesByUser(userId) {
	console.log(`Finding all recipes by userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				posted: true
			}
		}).then(recipes => {
			resolve(recipes);
		}).catch(err => reject(err));
	});
}

//
// Retrieve user's favorite recipes
//
function getAllUserFavorites(userId) {
	console.log(`Finding all favorite recipes of userId[${userId}]`);

	return new Promise((resolve, reject) => {
		db.UserProfile.findAll({
			where: {
				UserId: userId,
				favorite: true
			}
		}).then(recipes => {
			resolve(recipes);
		}).catch(err => reject(err));
	});
}

//
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
