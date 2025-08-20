'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Application, {
        foreignKey: 'application_id',
        targetKey: 'id',
        as: 'application'
      });
      this.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        targetKey: 'id',
        as: 'campaign'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  Result.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    association: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Result',
    tableName: 'results',
    timestamps: true,
    indexes: [
      {
        name: 'idx_results_application_id',
        fields: ['application_id']
      },
      {
        name: 'idx_results_campaign_id',
        fields: ['campaign_id']
      }
    ]
  });
  return Result;
};