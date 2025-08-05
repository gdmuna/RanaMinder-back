'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campaign extends Model {
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
  campaign.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return campaign;
};