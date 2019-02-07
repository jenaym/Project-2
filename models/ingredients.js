//
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Ingredients", {
        amount: DataTypes.INTEGER
    });

    return Products;
};
