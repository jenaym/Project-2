//
// Generate mock recipe data
//

require("dotenv").config(); // for API key
const db = require("../../models");

//
// Search recipes on EDAMAM
// https://developer.edamam.com/edamam-docs-recipe-api
//
class EdamamAPI {
	//
	// PARAM:
	// * key = API key expanded by dotenv in keys.js
	//
	constructor(key = this.apiKey()) {
		this.key = Object.entries(key).map(_ => _.join("=")).join("&");
		this.request = require("request");
	}

	//
	// Return the API ID and KEY
	//
	apiKey() {
		return {
			app_id: process.env.EDAMAM_APPLICATION_ID,
			app_key: process.env.EDAMAM_APPLICATION_KEY
		};
	}

	//
	// Search by queryText
	//
	// PARAMS:
	// * queryText = e.g. "chiken", "beef", etc.
	//
	findRecipe(queryText = process.argv.join(" ")) {
		return new Promise((resolve, reject) => {
			let query = [
				"https://api.edamam.com/search?" +
				`q=${queryText}`,
				this.key,
				// "from=0",
				// "to=15",
			].join("&");

			console.log(query);
			console.log(`\n=======\nSearching recipe "${queryText}"`);
			this.request(query, (error, response, body) => {
				if (error) {
					console.log("ERROR: ", error);
					reject(error);
					return;
				}
				if (!/^2\d\d.*/.test(response.statusCode)) {
					console.log("ERROR: status", response.statusCode, error);
					reject("ERROR: status " + response.statusCode);
				}
				const jsonObj = this.body2JSON(body);
				if (!jsonObj) reject('ERROR during JSON conversion');

				console.log(`\n=======\nResults for the recipe "${queryText}"`);
				// this.printRecipeInfo(jsonObj);
				resolve(jsonObj);
			});
		});

	}

	//
	// Convert returned body from "request" to JSON
	//
	// RETURN:
	// * JSON, if successful
	// * null, otherwise
	//
	body2JSON(body) {
		const data = JSON.parse(body);
		// console.log(data);

		if ("Error" in data) {
			console.log("Error: " + data.Error);
			return null;
		}
		return data;
	}

	//
	// Output mock recipe data based on the result
	//
	// PARAMS:
	// * data = returned data from calling "request" in JSON format
	//
	// Output an array of the following objects per models/recipes.js
	//    name: DataTypes.STRING,
	//    description: DataTypes.TEXT,
	//    image: DataTypes.STRING,
	//    prep_time: DataTypes.INTEGER,
	//    rating: DataTypes.INTEGER 
	//
	printRecipeInfo(data) {
		let recipes = [];

		for (let i = 0; i < data.hits.length; i++) {
			const ptr = data.hits[i].recipe;
			let recipe = {
				name: ptr.label,
				description: ptr.uri,
				image: null,
				imageURL: ptr.image,
				gluten_free: (Math.random() > 0.5),
				dairy_free: (Math.random() > 0.5),
				vegetarian: (Math.random() > 0.5),
				vegan: (Math.random() > 0.5),
				prep_time: Math.floor(Math.random() * 60),
				cook_time: Math.floor(Math.random() * 180),
				instructions: ptr.url,
				rating: Math.floor(Math.random() * 10) + 1
			};
			recipes.push(recipe);
		}

		const jRecipes = JSON.stringify(recipes);
		console.log(jRecipes);
	}
}

const edaman = new EdamamAPI();

function searchRecipe(searchTerm) {
	return new Promise((resolve, reject) => {
		edaman.findRecipe(searchTerm)
		.then(res => {
			resolve(res.hits);
		}).catch(err => reject(err));
	});
}


async function printRecipes(outputFile = 'recipe_raw_data.js') {
	let recipes = [];
	const fs = require('fs');

	for (let i = 2; i < process.argv.length; i++) {
		const result = await searchRecipe(process.argv[i]);
		setTimeout(() => { console.log("Next...")}, 3000);
		// console.log("**** RESULT ****", JSON.stringify(result));
		recipes = recipes.concat(result);
	}
	
	// console.log(JSON.stringify(recipes));
	fs.writeFileSync(outputFile, JSON.stringify(recipes, null, 2), 'utf8');
	process.exit(0);
}

printRecipes();