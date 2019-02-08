//
// Recipes Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Recipes = sequelize.define("Recipes", {
        recipe_name: DataTypes.STRING,
        description: DataTypes.TEXT,
        recipe_image: DataTypes.STRING,
        prep_time: DataTypes.INTEGER,
        rating: DataTypes.INTEGER
    });
    
    return Recipes;
};
