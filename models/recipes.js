//
// Recipes Schema Model
//

module.exports = function(sequelize, DataTypes) {
	var Recipes = sequelize.define("Recipes", {
      
		//   recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		image: DataTypes.STRING,
		prep_time: DataTypes.INTEGER,
		rating: DataTypes.INTEGER
	});
    
	return Recipes;
};
