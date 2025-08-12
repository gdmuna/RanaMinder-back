const{Stage, sequelize} = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 阶段服务
 * @module services/stage
 * @requires models/Stage
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回阶段数据
 */

exports.getAllStages = async () => {
    const stages = await Stage.findAll({
        order: [['createdAt', 'DESC']],
    });
    return {
        stages
    };
}
