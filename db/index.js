'use strict';

const { Sequelize } = require("sequelize");

console.log(process.env.DB_HOST)
module.exports = new Sequelize(
  process.env.DB_URL,
  {
    dialect: "postgres",
    ssl: true
  }
);