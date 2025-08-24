'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_selection extends Model {
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
      this.belongsTo(models.Time_slot, {
        foreignKey: 'time_slot_id',
        targetKey: 'id',
        as: 'time_slot'
      });
    }
  }
  User_selection.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    time_slot_id: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'User_selection',
    tableName: 'user_selections',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'time_slot_id']
      }
    ]
  });
  return User_selection;
};