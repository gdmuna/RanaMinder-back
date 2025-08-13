'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('seesions', [
      {
        id: 1,
        stage_id: 1,
        title: '一面10号场',
        start_time: new Date('2025-09-10T00:00:00Z'),
        end_time: new Date('2025-09-10T23:59:59Z'),
        location: '会议室A',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        stage_id: 1,
        title: '一面11号场',
        start_time: new Date('2025-09-11T00:00:00Z'),
        end_time: new Date('2025-09-11T23:59:59Z'),
        location: '会议室B',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        stage_id: 2,
        title: '一面12号场',
        start_time: new Date('2025-09-12T00:00:00Z'),
        end_time: new Date('2025-09-12T23:59:59Z'),
        location: '会议室C',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        stage_id: 2,
        title: '二面13号场',
        start_time: new Date('2025-09-13T00:00:00Z'),
        end_time: new Date('2025-09-13T23:59:59Z'),
        location: '会议室D',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        stage_id: 3,
        title: '二面14号场',
        start_time: new Date('2025-09-14T00:00:00Z'),
        end_time: new Date('2025-09-14T23:59:59Z'),
        location: '会议室E',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        stage_id: 3,
        title: '二面15号场',
        start_time: new Date('2025-09-15T00:00:00Z'),
        end_time: new Date('2025-09-15T23:59:59Z'),
        location: '会议室F',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        stage_id: 3,
        title: '三面16号场',
        start_time: new Date('2025-09-16T00:00:00Z'),
        end_time: new Date('2025-09-16T23:59:59Z'),
        location: '会议室G',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        stage_id: 3,
        title: '三面17号场',
        start_time: new Date('2025-09-17T00:00:00Z'),
        end_time: new Date('2025-09-17T23:59:59Z'),
        location: '会议室H',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        stage_id: 3,
        title: '三面18号场',
        start_time: new Date('2025-09-18T00:00:00Z'),
        end_time: new Date('2025-09-18T23:59:59Z'),
        location: '会议室I',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('seesions', null, {});
  }
};
