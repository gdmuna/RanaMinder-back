'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Application, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      this.hasMany(models.Result, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      this.hasMany(models.User_selection, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      this.hasMany(models.Interview, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    }
  }


  user.init({
    stu_id: DataTypes.STRING,
    name: DataTypes.STRING,
    oss_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return user;
};