//
// Schema model for users' own posted and favorite recipes
//

module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
	const userProfile = sequelize.define("UserFavorites", {
=======
	const userProfile = sequelize.define("UserProfile", {
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6
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
<<<<<<< HEAD
  userProfile.associate = function(db) {
		this.belongsToMany(db.Recipes);
		this.belongsToMany(db.User);
	}
=======
	userProfile.associate = function(db) {
		this.belongsTo(db.Recipes);
		this.belongsTo(db.User);
	};
>>>>>>> 31ff5ec95ca8769a03a582511545ccb112508df6

	return userProfile;
};
