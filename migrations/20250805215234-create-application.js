'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'       
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'campaigns', 
          key: 'id'           
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      stu_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('applications', ['user_id']);
    await queryInterface.addIndex('applications', ['campaign_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications');
  }
};