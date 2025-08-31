'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Time_slot, {
        foreignKey: 'session_id',
        sourceKey: 'id',
      });
      this.belongsTo(models.Stage, {
        foreignKey: 'stage_id',
        targetKey: 'id',
        as: 'stage'
      });
    }
  }
  Session.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    stage_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    paranoid: true,
    deletedAt: 'deletedAt',
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['stage_id']
      }
    ]
  });
  return Session;
};