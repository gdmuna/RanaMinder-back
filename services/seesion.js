const {Seesion,Stage, sequelize} = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 面试服务
 * @module services/seesion
 * @requires models/Seesion
 * @requires models/Stage
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回面试数据
 */

//查询stage的seesion
exports.getSeesionByStageId = async (stage_id) => {

    // 检查阶段是否存在
    const stage = await Stage.findByPk(stage_id);
    if (!stage) {
        throw new AppError('阶段不存在', 404, 'STAGE_NOT_FOUND');
    }
    const seesions = await Seesion.findAll({
        where: { stage_id },
        order: [['createdAt', 'DESC']],
    });
    return {
        seesions
    };
}