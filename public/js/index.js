// Get references to page elements
const recipeName = $("#recipe-name");
const recipeDescription = $("#recipe-description");
const submitBtn = $("#submit");
const recipeList = $("#recipe-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(recipe)
    });
  },
  getRecipe: function() {
    return $.ajax({
      url: "api/recipes",
      type: "GET"
    });
  },
  deleteRecipe: function(id) {
    return $.ajax({
      url: "api/recipes/" + id,
      type: "DELETE"
    });
  }
};

// refreshRecipes gets new recipes from the db and repopulates the list
var refreshRecipes = function() {
  API.getRecipe().then(function(data) {
    var $recipes = data.map(function(recipe) {
      var $a = $("<a>")
        .text(recipe.name)
        .attr("href", "/recipe/" + recipe.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": recipe.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    recipeList.empty();
    recipeList.append($recipes);
  });
};

// handleFormSubmit is called whenever we submit a new recipe
// Save the new recipe to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var recipe = {
    name: recipeName.val().trim(),
    description: recipeDescription.val().trim()
  };
  
  console.log('RECIPE: ' + JSON.stringify(recipe));

  if (!(recipe.name && recipe.description)) {
    alert("You must enter a recipe name and description!");
    return;
  }

  API.saveRecipe(recipe).then(function() {
    refreshRecipes();
  });

  recipeName.val("");
  recipeDescription.val("");
};

// handleDeleteBtnClick is called when an recipe's delete button is clicked
// Remove the recipe from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteRecipe(idToDelete).then(function() {
    refreshRecipes();
  });
};

// Add event listeners to the submit and delete buttons
submitBtn.on("click", handleFormSubmit);
recipeList.on("click", ".delete", handleDeleteBtnClick);








