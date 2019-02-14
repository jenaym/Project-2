//
// Insert mock recipe data
//

const db = require("../../models");

db.sequelize.sync({
	force: false
});

// == Mock Recipes, Ingredients, and Products ==

const dataFile = "./recipe_raw_data-sm"; // --> 15 recipes and 100 ingredients
// const dataFile = "./recipe_raw_data";    // --> 50 recipes and about 350 ingredients
const inputData = require(dataFile);
	
//
// == Mock user data ==
// 5 users: user1@email.com, user2@email.com, ... and so on
// password is the same "abcd1234" for all the users
//
function insertUsers() {
	return new Promise((resolve, reject) => {
		const inputUsers = require("./mock_users");

		db.User.bulkCreate(inputUsers)
			.then(_ => {
				db.User.findAll()
					.then(users => {
						resolve(users.map(user => user.id));
					})
					.catch(err => reject(err));
			})
			.catch(err => reject(err));
	});
}

<<<<<<< HEAD
//
// Insert data into the tables
//
// Recipes(id) -- Ingredients(RecipeId, ProductId) -- Products(id)
//             `- User(RecipeId)
//
async function insertData() {
	// First, insert users into User table
=======
async function insertData() {
>>>>>>> master
	const userIDs = await insertUsers();

	console.log(`Got user IDs: ${JSON.stringify(userIDs)}`);

<<<<<<< HEAD
	// Iterate over each recipe and the ingredients
	for (let i = 0; i < inputData.length; i++) {
		const ptr = inputData[i].recipe;
		
		// Prepare a single recipe data for inserting into Recipes table
		let _recipe = {
			name: ptr.label,
			description: ptr.url,
			image: ptr.image,
=======
	for (let i = 0; i < inputData.length; i++) {
		const ptr = inputData[i].recipe;
		let _recipe = {
			name: ptr.label,
			description: ptr.url,
			imageURL: ptr.imageURL,
>>>>>>> master
			gluten_free: (ptr.cautions.findIndex(e => /Gluten/i.test(e)) > -1),
			dairy_free: (ptr.ingredientLines.findIndex(e => /milk|cheese/i.test(e)) > -1),
			vegetarian: (ptr.healthLabels.findIndex(e => /vegetarian/i.test(e)) > -1),
			vegan: (ptr.healthLabels.findIndex(e => /vegan/i.test(e)) > -1),
			prep_time: (ptr.totalTime == 0) ? Math.floor(Math.random() * 20) : Math.round(ptr.totalTime * 0.2),
			cook_time: (ptr.totalTime == 0) ? Math.floor(Math.random() * 180) : Math.round(ptr.totalTime * 0.8),
			instructions: null, //JSON.stringify(ptr), // oops, save the whole recipe data 
			rating: Math.floor(Math.random() * 10) + 1
		};

<<<<<<< HEAD
		// Insert each _recipe into Recipes table
=======
>>>>>>> master
		db.Recipes.findOrCreate({
				where: {
					name: _recipe.name
				},
				defaults: _recipe
			})
			.spread((recipe, createdRecipe) => {
<<<<<<< HEAD
				// randomly assign a user for the recipe post
				const _userProfile = {
					favorite: Math.floor(Math.random() < 0.25), // favor by 25% chance
=======
				const _userProfile = {
					favorite: Math.floor(Math.random() > 0.5),
>>>>>>> master
					posted: true,
					RecipeId: recipe.id,
					UserId: userIDs[Math.floor(Math.random() * userIDs.length)]
				};
<<<<<<< HEAD
				
				// Obtaining recipe ID is critical for UserProfile and Ingredients foreign key 
=======
>>>>>>> master
				if (!recipe || !recipe.id) {
					console.log(JSON.stringify(recipe));
					throw "No recipe ID";
				}	
<<<<<<< HEAD
				// inesrt into the UserProfile table
				db.UserProfile.create(_userProfile);

				// Iterate over each ingredient of this recipe
				for (let j = 0; j < ptr.ingredients.length; j++) {
					// Prepare a single product/ingredient data for insertion
=======

				db.UserProfile.create(_userProfile);

				for (let j = 0; j < ptr.ingredients.length; j++) {
>>>>>>> master
					let _product = {
						name: ptr.ingredients[j].text,
						image: null,
						calories: ptr.calories, // this is actually total for the recipe
						gluten_free: (ptr.cautions.findIndex(e => /Gluten/i.test(e)) > -1),
						vegetarian: (ptr.healthLabels.findIndex(e => /vegetarian/i.test(e)) > -1),
					};

<<<<<<< HEAD
					// Insert each _product into Products table
=======
>>>>>>> master
					db.Products.findOrCreate({
							where: {
								name: _product.name,
							},
							defaults: _product
						})
						.spread((product, createdProduct) => {
<<<<<<< HEAD
							// Obtaining product ID is critical for Ingredients table
							if (!product || !product.id) {
								throw "No product ID";
							}	
							
							// Prepare an ingredient data for insertion into Ingredients table
=======
							if (!product || !product.id) {
								throw "No recipe ID";
							}	
>>>>>>> master
							let _ingredient = {
								amount: ptr.ingredients[j].weight,
								RecipeId: recipe.id,
								ProductId: product.id
							};
<<<<<<< HEAD
							
							// Insert _ingredient into Ingredients table
=======
>>>>>>> master
							db.Ingredients.findOrCreate({
									where: {
										RecipeId: recipe.id,
										ProductId: product.id
									},
									defaults: _ingredient
								})
								.spread((ingredient, createdIngredient) => {
									console.log(`Inserted recipeId ${recipe.id} product ${product.id} ingredient ${ingredient.id}`);
								})
						});
				}
			});
	}
}

// insertData();
module.exports = insertData;
