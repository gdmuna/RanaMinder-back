'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('time_slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seesion_id: {
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.DATE
      },
      max_seats: {
        type: Sequelize.INTEGER
      },
      reserved_seats: {
        type: Sequelize.INTEGER
      },
      is_avaliable: {
        type: Sequelize.BOOLEAN
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('time_slots');
  }
};