'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_selections', [
      {
        id: 1,
        user_id: 1,
        time_slot_id: 1,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: 2,
        time_slot_id: 1,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 3,
        time_slot_id: 2,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 4,
        time_slot_id: 2,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: 5,
        time_slot_id: 3,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id: 6,
        time_slot_id: 3,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        user_id: 7,
        time_slot_id: 4,
        selection_status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_selections', null, {});
  }
};
