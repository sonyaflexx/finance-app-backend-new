'use strict';

const { Sequelize } = require("sequelize");
const pg = require('pg'); 

module.exports = new Sequelize(
    process.env.DB_URL, {
      dialectModule: pg
    }
);
