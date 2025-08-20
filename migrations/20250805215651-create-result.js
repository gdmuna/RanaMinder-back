'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      application_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'applications', 
          key: 'id'              
        },
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'campaigns', 
          key: 'id'           
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'              
        },
      },
      association: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'), 
        allowNull: false
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
    await queryInterface.addIndex('results', ['application_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  }
};