'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Application, {
        foreignKey: 'application_id',
        sourceKey: 'id',
      });
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
  result.init({
    application_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    campagin_id: DataTypes.INTEGER,
    department: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Result',
  });
  return result;
};