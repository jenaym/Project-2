//
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Ingredients = sequelize.define("Ingredients", {
      
     //   product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        calories: DataTypes.INTEGER,
        gluten_free: DataTypes.BOOLEAN,
        vegetarian: DataTypes.BOOLEAN
    });
    
    return Ingredients;
  };
  
