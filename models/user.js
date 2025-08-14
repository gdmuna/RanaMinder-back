'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    stu_id: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sso_id: {
      type: DataTypes.UUID
    },
    last_signin_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_forzen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['stu_id']
      },
      {
        unique: true,
        fields: ['sso_id']
      }
    ]
  });
  return User;
};