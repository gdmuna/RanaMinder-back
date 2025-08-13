'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Time_slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.User_selection, {
        foreignKey: 'time_slot_id',
        sourceKey: 'id',
      });
      this.belongsTo(models.Seesion, {
        foreignKey: 'seesion_id',
        targetKey: 'id',
      });
    }
  }
  Time_slot.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    seesion_id: {
      type: DataTypes.INTEGER
    },
    start_time: {
      type: DataTypes.DATE
    },
    end_time: {
      type: DataTypes.DATE
    },
    max_seats: {
      type: DataTypes.INTEGER
    },
    booked_seats: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_available: {
      type: DataTypes.BOOLEAN
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Time_slot',
    tableName: 'time_slots',
    paranoid: true,
    deletedAt: 'deletedAt',
    timestamps: true
  });
  return Time_slot;
};