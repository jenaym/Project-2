var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../../server");
var db = require("../../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;
const data = require("../data/mock_recipe_beef");

describe("POST /api/recipes", function() {
	// Before each test begins, create a new request server for testing
	// & delete all examples from the db
	beforeEach(function() {
		request = chai.request(server);
		return db.sequelize.sync({ force: true });
	});

	it("should save a recipe", function(done) {
		// Create an object to send to the endpoint
		const reqBody = data[1];

		// POST the request body to the server
		request
			.post("/api/recipes")
			.send(reqBody)
			.end(function(err, res) {
				var responseStatus = res.status;
				var responseBody = res.body;

				// Run assertions on the response

				expect(err).to.be.null;

				expect(responseStatus).to.equal(200);

				expect(responseBody)
					.to.be.an("number")
					.that.to.equal(1);

				// The `done` function is used to end any asynchronous tests
				done();
			});
	});
});
