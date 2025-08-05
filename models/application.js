'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      this.belongsTo(models.Campaign, {
        foreignKey: 'campagin_id',
        targetKey: 'id',
      });
    }
  }
  application.init({
    user_id: DataTypes.INTEGER,
    campagin_id: DataTypes.INTEGER,
    std_id: DataTypes.STRING,
    information: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Application',
  });
  return application;
};