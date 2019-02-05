var db = require("../models");
const ensureAuthenticated = require('./usersAuthHelper');

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipes.findAll({}).then(function(recipes) {
      console.log(JSON.stringify(recipes));
      res.render("index", {
        msg: "Welcome!!",
        recipes: recipes
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recipes/:id", ensureAuthenticated, function(req, res) {
    db.Recipes.findOne({ where: { id: req.params.id } }).then(function(recipe) {
      res.render("recipe", {
        recipe: recipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
