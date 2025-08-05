const { Application } = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 申请表服务
 * @module services/application
 * @requires models/Application
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回申请表数据
 */

exports.getAllApplications = async () => {

    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;


    const applications = await Application.findAndCountAll({
      order: [['createdAt', 'DESC']],
    });

    if (!applications || applications.length === 0) {
      throw new AppError('没有查询到申请表', 'NO_APPLICATION');
    }

    return { applications };
}