//
// Products Schema Model
//

// module.exports = function(sequelize, DataTypes) {
//     var Products = sequelize.define("Products", {
      
//      //   product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
//         name: DataTypes.STRING,
//         image: DataTypes.STRING,
//         calories: DataTypes.INTEGER,
//         gluten_free: DataTypes.BOOLEAN,
//         vegetarian: DataTypes.BOOLEAN
//     });
    
//     return Products;
//   };
  
//
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {

    // var Products = sequelize.define("Products", {
    //     product_name: DataTypes.STRING,
    //     product_image: DataTypes.STRING,
    //     product_calories: DataTypes.INTEGER,
    //     gluten_free: DataTypes.BOOLEAN,
    //     vegetarian: DataTypes.BOOLEAN
    // });
	var Products = sequelize.define("Products", {
      
		//   product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
		name: DataTypes.STRING,
		image: DataTypes.STRING,
		calories: DataTypes.INTEGER,
		gluten_free: DataTypes.BOOLEAN,
		vegetarian: DataTypes.BOOLEAN
	});
    
	return Products;
};
