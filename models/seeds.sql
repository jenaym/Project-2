USE recipes_db;

INSERT INTO products (product_name, product_calories, gluten_free, vegetarian, createdAt, updatedAt)
VALUES 
("cilantro", 10, true, true, now(), now()),
("pistachios", 10, true,true, now(), now()),
("jalapeno", 10, true, true, now(), now()),
("garlic cloves", 10, true, true, now(), now()),
("lime", 10, true, true, now(), now()),
("olive oil", 10, true, true, now(), now()),
("salt", 10, true, true, now(), now()),
("black pepper", 10, true, true, now(), now()),
("shrimp", 10, true, false, now(), now()),
("Gluten Free Brown Rice Spaghetti", 10, true, true, now(), now()),
("goat cheese", 10, true, true, now(), now());


INSERT INTO recipes (recipe_name, description, prep_time, rating, createdAt, updatedAt)
VALUES 
("Cilantro Pistachio Pesto Shrimp Pasta", 
"Make the pesto by adding the following to the bowl of a food processor: cilantro, pistachios, jalapeño, garlic cloves, lime juice, olive oil, water and salt and pepper. Process until smooth, scraping down the sides and processing again, if necessary.
Next cook the shrimp: add olive oil to a large skillet or pan and place over medium high heat. Add in shrimp, garlic powder and salt and pepper; cook until shrimp is no longer pink. Remove from heat and set aside.
Cook the pasta until al dente, according to the directions on the package. Drain pasta, then add back to pot. Stir in the pesto and shrimp until well coated. Add pasta to bowls and garnish with goat cheese, a few 
cilantro leaves and a sprinkle of crushed pistachios. Serve immediately. Makes about 4 servings.", 
45, 5, now(), now());

INSERT INTO ingredients (RecipeId, ProductId, amount, createdAt, updatedAt)
VALUES 
(1, 1, 0.5, now(), now()),
(1, 2, 0.3, now(), now()),
(1, 3, 1, now(), now()),
(1, 4, 3, now(), now()),
(1, 5, 0.5, now(), now()),
(1, 6, 3.5, now(), now()),
(1, 7, 0.5, now(), now()),
(1, 8, 0.2, now(), now()),
(1, 9, 1, now(), now()),
(1, 10, 10, now(), now()),
(1, 11, 0.25, now(), now());
