'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Stage, {
        foreignKey: 'campagin_id',
        sourceKey: 'id',
      });
      this.hasMany(models.Application, {
        foreignKey: 'campagin_id',
        sourceKey: 'id',
      });
      this.hasMany(models.Result, {
        foreignKey: 'campagin_id',
        sourceKey: 'id',
      });
    }
  }
  Campaign.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'campaigns',
    timestamps: true
  });
  return Campaign;
};