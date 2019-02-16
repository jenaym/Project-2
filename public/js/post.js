$(document).ready(function () {
    var maxIngredients = 100;
    var x = 0; //Initial ingredient counter
    var ingredientList = $(".allIngredients");

    $(".addIngredient").on("click", function (event) {
        event.preventDefault();
        console.log(`clicked ${x}`);
        if (x < maxIngredients) {
            x++;

            ingredientList.append(makeNewIngredient(x));
        }
    });
});

//
// Construct html elements for a new ingredient 
//
function makeNewIngredient(counter) {
    let newIngredient = $("<div>");

    let newName = $("<div>");
    newName.addClass("form-group").addClass("col-md-6");
    newName.append("<label>Ingredients</label>");

    let newNameInput = $("<input>");
    newNameInput.attr("type", "text").attr("placeholder", "Ingredient");
    newNameInput.addClass("form-control");

    let newQty = $("<div>");
    newQty.addClass("form-group").addClass("col-md-2");
    newQty.append("<label>Quantity</label>");

    let newQtyInput = $("<input>");
    newQtyInput.attr("type", "text").attr("placeholder", "");
    newQtyInput.addClass("form-control");

    let newUnit = $("<div>");
    newUnit.addClass("form-group").addClass("col-md-2");
    newUnit.append('<label style="display: block">Unit</label>');
    

    let newUnitInput = $('<select>');
    newUnitInput.addClass("unit");
    newUnitInput.append('<option selected>Choose...</option>');
    newUnitInput.append('<option value="teaspoon">teaspoon</option>');
    newUnitInput.append('<option value="tablespoon">tablespoon</option>');
    newUnitInput.append('<option value="cup">cup</option>');
    newUnitInput.append('<option value="ounce">ounce</option>');
    newUnitInput.append('<option value="pint">pint</option>');
    newUnitInput.append('<option value="quart">quart</option>');
    newUnitInput.append('<option value="pound">pound</option>');
    
    let newCal = $("<div>");
    newCal.addClass("form-group").addClass("col-md-2");
    newCal.append("<label>Calories per unit</label>");

    let newCalInput = $("<input>");
    newCalInput.attr("type", "text");
    newCalInput.addClass("form-control");

    newIngredient.addClass("form-row").addClass("ingrItem");

    newNameInput.attr("id", `ingrID-${counter}`);
    newQtyInput.attr("id", `qtyID-${counter}`);
    newUnitInput.attr("id", `unitID-${counter}`);
    newCalInput.attr("id", `calID-${counter}`);
    newUnitInput.wrapAll('<div>');

    newIngredient.append(newName.append(newNameInput));
    newIngredient.append(newQty.append(newQtyInput));
    newIngredient.append(newUnit.append(newUnitInput));
    newIngredient.append(newCal.append(newCalInput));

    return newIngredient;
}
