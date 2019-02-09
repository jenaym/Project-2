var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../../server");
var db = require("../../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;
const recipes = require("../data/mock_recipe_beef");
const products = require("../data/mock_products");

describe("GET /api/recipes/:id", function () {
	// Before each test begins, create a new request server for testing
	// & delete all examples from the db
	beforeEach(function () {
		request = chai.request(server);
		return db.sequelize.sync({
			force: true
		});
	});

	it("should find a recipe id 1", function (done) {
		// Add some examples to the db to test with
		db.Recipes.bulkCreate(recipes).then(function () {
			db.Products.bulkCreate(products).then(function () {
				// Request the route that returns all examples
				request.get("/api/recipes/1").end(function (err, res) {
					var responseStatus = res.status;
					var responseBody = res.body;

					// Run assertions on the response

					expect(err).to.be.null;

					expect(responseStatus).to.equal(200);

					expect(responseBody)
						.to.be.an("object");

					expect(responseBody.recipe)
						.to.be.an("object")
						.that.includes({
							id: 1
						});

					// The `done` function is used to end any asynchronous tests
					done();
				});
			});
		});
	});
});