"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const cls = require("cls-hooked");
const transactionNamespace = cls.createNamespace("transaction_namespace");
const dotenv = require("dotenv");
dotenv.config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const db = {};

Sequelize.useCLS(transactionNamespace);

let sequelize;
if (config.development) {
  sequelize = new Sequelize(process.env[config.development], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
