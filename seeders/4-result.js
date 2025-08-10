'use strict';

const { Association } = require('sequelize');
const user = require('../models/user');
const Campaign = require('./2-campaign');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('results', [
      {
        id: 1,
        application_id: 1,
        campaign_id: 1,
        association: null,
        department: null,
        role: null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        application_id: 2,
        campaign_id: 1,
        association: null,
        department: null,
        role: null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        application_id: 3,
        campaign_id: 2,
        association: null,
        department: null,
        role: null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        application_id: 4,
        campaign_id: 2,
        association: null,
        department: null,
        role: null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        application_id: 5,
        campaign_id: 3,
        association: null,
        department: null,
        role:null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        application_id: 6,
        campaign_id: 3,
        association: null,
        department: null,
        role: null,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        application_id: 7,
        campaign_id: 4,
        association: null,
        department: null,
        role: null,
        status:'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('results', null, {});
  }
};
