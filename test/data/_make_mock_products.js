//
// Generate mock "products" in an array of JSON objects
//
// name: DataTypes.STRING,
// image: DataTypes.STRING,
// calories: DataTypes.INTEGER,
// gluten_free: DataTypes.BOOLEAN,
// vegetarian: DataTypes.BOOLEAN
//
function makeProduct(name) {
	return {
		name: name,
		image: null,
		calories: Math.floor(Math.random() * 50),
		gluten_free: (Math.random() > 0.5), 
		vegetarian: (Math.random() > 0.5)
	};
}

const prodNames = [
	"cilantro",
	"pistachios",
	"jalapeno",
	"garlic cloves",
	"lime",
	"olive oil",
	"salt",
	"black pepper",
	"shrimp",
	"Gluten Free Brown Rice Spaghetti",
	"goat cheese",
	"cauliflower",
	"sweet potato",
	"curry powder",
	"turmeric",
	"garlic powder",
	"red cayenne pepper",
	"dried cranberries",
	"frozen peas",
	"parsley",
	"tahini",
	"ginger",
	"green onion",
	"lemon juice",  
];

const data = [];

for (let i = 0; i < prodNames.length; i++) {
	data.push(makeProduct(prodNames[i]));
}

console.log(JSON.stringify(data));