$(document).ready(function() {
	var maxIngredients = 100;
	var x = 1; //Initial ingredient counter
	var ingredientList = $(".allIngredients");
	var newName = "<div class=\"form-group col-md-3\"><label>Ingredients</label><input id=\"ingredient\" type=\"text\" class=\"form-control\" placeholder=\"Ingredient\"></div>";
	var newQuantity = "<div class=\"form-group col-md-3\"><label>Quantity</label><input id=\"quantity\" type=\"text\" class=\"form-control\" placeholder=\"Whole #\"></div>";
	var newUnit = "<div class=\"form-group col-md-3\">" +
        "<label>Unit</label>" + 
            "<div>" +
            "<select id=\"unit\">" +
                "<option selected>Choose...</option>" +
                "<option value=\"teaspoon\">teaspoon</option>" +
                "<option value=\"tablespoon\">tablespoon</option>" +
                "<option value=\"cup\">cup</option>" +
                "<option value=\"ounce\">ounce</option>" +
                "<option value=\"pint\">pint</option>" +
                "<option value=\"quart\">quart</option>" +
                "<option value=\"pound\">pound</option>" +
            "</select>" +
            "</div>" +
        "</div>";

	var newIngredient = ("<div class=\"form-row\">" + newName + newQuantity + newUnit + "</div>");

	$(".addIngredient").on("click", function(event) {
		event.preventDefault();
		if (x < maxIngredients) {
			x++;
			$(ingredientList).append(newIngredient);
		}
	});



});
		