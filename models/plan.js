'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsTo(models.User, { foreignKey: 'user_id' });
      Plan.belongsTo(models.Category, { foreignKey: 'category_id' });
    }
  };
  Plan.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};
