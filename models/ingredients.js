//
// Ingredients Schema Model


module.exports = function(sequelize, DataTypes) {
	var Ingredients = sequelize.define("Ingredients", {
		amount: DataTypes.INTEGER,
		measurement: DataTypes.STRING
	});

	return Ingredients;
};

