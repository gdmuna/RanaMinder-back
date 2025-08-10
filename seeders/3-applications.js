'use strict';

const { Json } = require('sequelize/lib/utils');
const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('applications', [
      {
        id: 1,
        user_id: 1,
        campaign_id: 1,
        stu_id: '20251111000',
        information: JSON.stringify({
          name: '爱莉希雅',
          sex: '女',
          age: 20,
          phone: '12345678901',
          email: 'alxy@qq.com',
          address: '北京市海淀区某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大一',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: 2,
        campaign_id: 1,
        stu_id: '20251207000',
        information: JSON.stringify({
          name: '琪亚娜',
          sex: '女',
          age: 20,
          phone: '12345678902',
          email: 'qyn@qq.com',
          address: '北京市海淀区某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大一',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 3,
        campaign_id: 2,
        stu_id: '20250413000',
        information: JSON.stringify({
          name: '芽衣',
          sex: '女',
          age: 20,
          phone: '12345678903',
          email: 'yy@qq.com',
          address: '北京市海淀区某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大一',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 4,
        campaign_id: 2,
        stu_id: '20250818000',
        information: JSON.stringify({
          name: '布洛妮娅',
          sex: '女',
          age: 20,
          phone: '12345678904',
          email: 'blny@qq.com',
          address: '北京市海淀区某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大一',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id: 5,
        campaign_id: 3,
        stu_id: '20251018000',
        information: JSON.stringify({
          name: '希儿',
          sex: '女',
          age: 20,
          phone: '12345678905',
          email: 'xe@qq.com',
          address: '北京市海淀区某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大一',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id: 6,
        campaign_id: 3,
        stu_id: '24208030097',
        information: JSON.stringify({
          name: '邝政',
          sex: '男',
          age: 19,
          phone: '12345678906',
          email: 'kz@gdmu.edu.com',
          address: '广东省广州市某小区',
          college: '生物医学工程',
          major: '数据与科学',
          grade: '大二',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        user_id: 7,
        campaign_id: 4,
        stu_id: '24209020059',
        information: JSON.stringify({
          name: '胡鑫霖',
          sex: '男',
          age: 19,
          phone: '12345678907',
          email: 'xlxl@qq.com',
          address: '广东省广州市某小区',
          college: '生物医学工程',
          major: '信息与管理',
          grade: '大二',
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('applications', null, {});
  }
};
