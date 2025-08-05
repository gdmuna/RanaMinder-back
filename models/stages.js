'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stages extends Model {
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
        foreignKey: 'campagin_id',
        targetKey: 'id',
      });
    }
  }
  stages.init({
    campagin_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    selection_type: DataTypes.ENUM,
    sort_order: DataTypes.TINYINT,
    is_required: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Stage',
  });
  return stages;
};