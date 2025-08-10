'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('time_slots', [
      {
        id: 1,
        seesion_id: 1,
        start_time: new Date('2025-09-10T09:00:00Z'),
        end_time: new Date('2025-09-10T12:00:00Z'),
        max_seats: 10,
        booked_seats: 2,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        seesion_id: 1,
        start_time: new Date('2025-09-10T14:30:00Z'),
        end_time: new Date('2025-09-10T17:30:00Z'),
        max_seats: 10,
        booked_seats: 2,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        seesion_id: 2,
        start_time: new Date('2025-09-11T09:00:00Z'),
        end_time: new Date('2025-09-11T12:00:00Z'),
        max_seats: 10,
        booked_seats: 2,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        seesion_id: 2,
        start_time: new Date('2025-09-11T14:30:00Z'),
        end_time: new Date('2025-09-11T17:30:00Z'),
        max_seats: 10,
        booked_seats: 1,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        seesion_id: 3,
        start_time: new Date('2025-09-12T09:00:00Z'),
        end_time: new Date('2025-09-12T12:00:00Z'),
        max_seats: 10,
        booked_seats: 0,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        seesion_id: 3,
        start_time: new Date('2025-09-12T14:30:00Z'),
        end_time: new Date('2025-09-12T17:30:00Z'),
        max_seats: 10,
        booked_seats: 0,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('time_slots', null, {});
  }
};
