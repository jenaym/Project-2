var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../../server");
var db = require("../../models");
var expect = chai.expect;


const recipes = require("./mock_recipe_chicken");
const products = require("./mock_products");

db.sequelize.sync({
	force: false
});
// Add some example recipes to the db to test with
db.Recipes.bulkCreate(recipes);
db.Products.bulkCreate(products);
