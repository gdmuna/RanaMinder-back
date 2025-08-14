'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
      });
      this.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        targetKey: 'id',
        as: 'campaign'
      });
      this.hasOne(models.Result, {
         foreignKey: 'application_id' 
      });
    }
  }
  Application.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stu_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    information: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
    timestamps: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['campaign_id']
      }
    ]
  });
  return Application;
};