//
// Recipes Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Recipes = sequelize.define("Recipes", {
      
   //   recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
<<<<<<< HEAD
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
=======
        recipe_name: DataTypes.STRING,
        description: DataTypes.TEXT,
        recipe_image: DataTypes.STRING,
>>>>>>> master
        prep_time: DataTypes.INTEGER,
        rating: DataTypes.INTEGER
    });
    
    return Recipes;
  };
  