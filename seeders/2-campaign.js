'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('campaigns', [
      {
        id: 1,
        title:"2025社团招新",
        description:"2025年社团招新，欢迎各位同学加入我们的大家庭！",
        start_date:"2025-09-01",
        end_date:"2025-09-30",
        is_active: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title:"2026干事招新",
        description:"2026年干事招新，欢迎各位同学加入我们的大家庭！",
        start_date:"2026-7-01",
        end_date:"2026-7-15",
        is_active: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title:"2026社团招新",
        description:"2027年社团招新，欢迎各位同学加入我们的大家庭！",
        start_date:"2026-09-01",
        end_date:"2026-09-30",
        is_active: false,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title:"2027干事招新",
        description:"2027年干事招新，欢迎各位同学加入我们的大家庭！",
        start_date:"2027-7-01",
        end_date:"2027-7-15",
        is_active: false,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('campaigns', null, {});
  }
};
