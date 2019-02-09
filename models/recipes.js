//
// Recipes Schema Model
//

module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
	var Recipes = sequelize.define("Recipes", {
      
		//   recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		image: DataTypes.STRING,
		prep_time: DataTypes.INTEGER,
		rating: DataTypes.INTEGER
	});
=======
    var Recipes = sequelize.define("Recipes", {
      
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        gluten_free: DataTypes.BOOLEAN,
        dairy_free: DataTypes.BOOLEAN,
        vegetarian: DataTypes.BOOLEAN,
        vegan: DataTypes.BOOLEAN,
        prep_time: DataTypes.INTEGER,
        cook_time: DataTypes.INTEGER,
        instructions: DataTypes.TEXT,
        rating: DataTypes.INTEGER
    });
>>>>>>> master
    
	return Recipes;
};
