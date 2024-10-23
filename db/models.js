'use strict';
const sequelize = require("sequelize")
const db = require("./index.js")

const Category = db.define("Category", {
    title: {
      type: sequelize.DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false
    }
})
  
const Plan = db.define("Plan", {
    user_id: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    goal: {
      type: sequelize.DataTypes.DECIMAL,
      allowNull: false
    },
    category_id: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: sequelize.DataTypes.STRING,
      allowNull: false
    }
})

const Transaction = db.define("Transaction", {
    type: {
      type: sequelize.DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: sequelize.DataTypes.DECIMAL,
      allowNull: false
    },
    description: {
      type: sequelize.DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: sequelize.DataTypes.DATE,
      allowNull: false
    }
})

const User = db.define("User", {
    email: { type: sequelize.DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: sequelize.DataTypes.STRING, allowNull: false },
});
  
User.hasMany(Transaction, { foreignKey: 'user_id' });
User.hasMany(Category, { foreignKey: 'user_id' });
User.hasMany(Plan, { foreignKey: 'user_id' });
  
Transaction.belongsTo(User, { foreignKey: 'user_id' })
Transaction.belongsTo(Category, { foreignKey: 'category_id' })
  
Plan.belongsTo(User, { foreignKey: 'user_id' })
Plan.belongsTo(Category, { foreignKey: 'category_id' })

Category.belongsTo(User, { foreignKey: 'user_id' });
Category.hasMany(Transaction, { foreignKey: 'category_id' });
Category.hasMany(Plan, { foreignKey: 'category_id' });

module.exports = { User, Plan, Transaction, Category }