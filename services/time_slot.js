const {Time_slot,Seesion, sequelize} = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 时间段服务
 * @module services/time_slot
 * @requires models/Time_slot
 * @requires models/Seesion
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回时间段数据
 */ 

exports.getTimeSlotsBySeesionId = async (seesion_id) => {

    // 检查面试是否存在
    const seesion = await Seesion.findByPk(seesion_id);
    if (!seesion) {
        throw new AppError('面试不存在', 404, 'SEESION_NOT_FOUND');
    }
    const time_slots = await Time_slot.findAll({
        where: { seesion_id },
        order: [['createdAt', 'DESC']],
    });
    return {
        time_slots
    };
}