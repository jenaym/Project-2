//
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {
	var Products = sequelize.define("Products", {

		name: DataTypes.STRING,

	});
    
	return Products;
};
