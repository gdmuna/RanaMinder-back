'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_selection extends Model {
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
      this.belongsTo(models.Time_slot, {
        foreignKey: 'time_slot_id',
        targetKey: 'id',
      });
    }
  }
  user_selection.init({
    user_id: DataTypes.INTEGER,
    time_slot_id: DataTypes.INTEGER,
    selection_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: ' User_selection',
  });
  return user_selection;
};