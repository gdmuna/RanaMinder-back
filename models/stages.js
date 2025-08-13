'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Seesion, {
        foreignKey: 'stage_id',
        sourceKey: 'id',
      });
      this.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        targetKey: 'id',
      });
    }
  }
  Stages.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    campaign_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    sort_order: {
      type: DataTypes.TINYINT
    },
    is_required: {
      type: DataTypes.BOOLEAN
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    paranoid: true,
    deletedAt: 'deletedAt',
    timestamps: true
  });
  return Stages;
};