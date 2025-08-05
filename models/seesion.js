'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seesion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Time_slot, {
        foreignKey: 'seesion_id',
        sourceKey: 'id',
      });
      this.belongsTo(models.Stage, {
        foreignKey: 'stage_id',
        targetKey: 'id',
      });
    }
  }
  seesion.init({
    stage_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    max_capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Seesion',
  });
  return seesion;
};