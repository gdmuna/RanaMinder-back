'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class time_slot extends Model {
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
  time_slot.init({
    seesion_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    max_seats: DataTypes.INTEGER,
    reserved_seats: DataTypes.INTEGER,
    is_avaliable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Time_slot',
  });
  return time_slot;
};