"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

require('dotenv').config();

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password = process.env.PASSWORD,
    config
  );
}

// Load models into sequialize
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Now, when we have all models ready we can
// build associations
db["Products"].hasMany(db["Ingredients"]);
db["Recipes"].hasMany(db["Ingredients"]);

db.sequelize = sequelize;
db.Sequelize = Sequelize; // TODO: Why do we need it?

module.exports = db;
