var db = require("../models");
const ensureAuthenticated = require('./usersAuthHelper');

module.exports = function (app) {
  // Get all recipes
  app.get("/", function (req, res) {
    // db.Recipes.findAll({}).then(function(recipes) {
    //   res.json(recipes);
    // });


    // make array recipes which holds the top 10 favorites


    // temporary
    let recipes =
    {
      favoriteRecipes: [
        {
          name: "turkey",
          instructions: "cook it",
          picture: "../public/images/chicken.png"

        },
        {
          name: "chicken",
          instructions: "cook it"
        },
        {
          name: "chicken",
          instructions: "cook it"
        },
        {
          name: "chicken",
          instructions: "cook it"
        }
      ]
    }


    res.render("index", recipes);


  });

  // Create a new recipes
  app.post("/api/recipes", function (req, res) {
    db.Recipes.create(req.body).then(function (recipe) {
      res.json(recipe);
    });
  });

  // Delete a recipe by id
  app.delete("/api/recipes/:id", ensureAuthenticated, function (req, res) {
    db.Recipes.destroy({ where: { id: req.params.id } }).then(function (recipe) {
      res.json(recipe);
    });
  });
};
