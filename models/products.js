//
// Products Schema Model
//

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        product_name: DataTypes.STRING,
        product_image: DataTypes.STRING,
        product_calories: DataTypes.INTEGER,
        gluten_free: DataTypes.BOOLEAN,
        vegetarian: DataTypes.BOOLEAN
    });
    
    return Products;
};
