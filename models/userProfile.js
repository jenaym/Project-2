//
// Schema model for users' own posted and favorite recipes
//

module.exports = function(sequelize, DataTypes) {
	const userProfile = sequelize.define("UserFavorites", {
		// Sequelize will add the following fiels based on associations
		// 1. RecipesId
		// 2. UsersId
		
		// true/false if the recipe is user's favorite
		favorite: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		// whether or not a recipe is posted by the user 
		posted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	
	//
	// Associations
	//
  userProfile.associate = function(db) {
		this.belongsToMany(db.Recipes);
		this.belongsToMany(db.User);
	}

	return userProfile;
};
