DROP DATABASE IF EXISTS recipes_db;
CREATE DATABASE recipes_db;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE recipes_db;

CREATE TABLE recipes(
recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
recipe_name VARCHAR(100),
description VARCHAR(500),
recipe_image VARCHAR(100),
prep_time INTEGER,
rating INTEGER
);

CREATE TABLE products(
product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(100),
product_image VARCHAR(100),
product_calories INTEGER,
gluten_free BOOLEAN,
vegetarian BOOLEAN
);

CREATE TABLE ingredients(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
recipe_id INTEGER,
product_id INTEGER,
amount INTEGER
)
