'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stages', [
      {
        id: 1,
        title: '一面',
        description: '第一次面试',
        campaign_id: 1,
        sort_order: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: '二面',
        description: '第二次面试',
        campaign_id: 1,
        sort_order: 2,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: '三面',
        description: '第三次面试',
        campaign_id: 1,
        sort_order: 3,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: '一面',
        description: '第一次面试',
        campaign_id: 2,
        sort_order: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: '二面',
        description: '第二次面试',
        campaign_id: 2,
        sort_order: 2,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title: '三面',
        description: '第三次面试',
        campaign_id: 2,
        sort_order: 3,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        title: '一面',
        description: '第一次面试',
        campaign_id: 3,
        sort_order: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        title: '二面',
        description: '第二次面试',
        campaign_id: 3,
        sort_order: 2,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        title: '三面',
        description: '第三次面试',
        campaign_id: 3,
        sort_order: 3,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        title: '一面',
        description: '第一次面试',
        campaign_id: 4,
        sort_order: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        title: '二面',
        description: '第二次面试',
        campaign_id: 4,
        sort_order: 2,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        title: '三面',
        description: '第三次面试',
        campaign_id: 4,
        sort_order: 3,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stages', null, {});
  }
};
