//
<<<<<<< HEAD
// Ingredients Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Ingredients = sequelize.define("Ingredients", {
        name: DataTypes.STRING,
        amount: DataTypes.INTEGER
    });
    
    return Ingredients;
=======
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Ingredients", {
        amount: DataTypes.INTEGER
    });
    
    return Products;
>>>>>>> master
  };
  
