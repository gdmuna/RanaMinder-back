const {Time_slot,Seesion, sequelize} = require('../models');
const { Op } = require('sequelize');
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
    const session = await Seesion.findByPk(seesion_id);
    if (!session) {
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

/**
 * @description 创建新的时间段
 * @param {Object} data - 时间段数据
 * @return {Promise<Object>} 返回新创建的时间段数据
 */
exports.createNewTimeSlot = async (data) => {
    const { seesion_id, start_time, end_time, max_seats } = data;
    // 检查必填字段
    if (!seesion_id || !start_time || !end_time || !max_seats) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }
    // 检查面试节点是否存在
    const session = await Seesion.findByPk(seesion_id);
    if (!session) {
        throw new AppError('指定的seesion不存在', 404, 'SEESION_NOT_FOUND');
    }

    const start = new Date(start_time);
    const end = new Date(end_time);

    // 检查时间顺序
    if (start >= end) {
        throw new AppError('开始时间必须早于结束时间', 400, 'INVALID_TIME_RANGE');
    }

    // 检查时间段是否在seesion时间范围内
    if (start < session.start_time || end > session.end_time) {
        throw new AppError('时间段必须在对应seesion的时间范围内', 400, 'TIME_SLOT_OUT_OF_SEESION');
    }

    // 检查时间段是否与已有时间段冲突
    const existingTimeSlot = await Time_slot.findOne({
        where: {
            seesion_id,
            [Op.or]: [
                {
                    start_time: {
                        [Op.lt]: end,
                        [Op.gte]: start
                    }
                },
                {
                    end_time: {
                        [Op.lte]: end,
                        [Op.gt]: start
                    }
                },
                {
                    start_time: {
                        [Op.lte]: start
                    },
                    end_time: {
                        [Op.gte]: end
                    }
                }
            ]
        }
    });
    if (existingTimeSlot) {
        throw new AppError('时间段冲突，请选择其他时间段', 400, 'TIME_SLOT_CONFLICT');
    }

    // 创建新时间段
    const newTimeSlot = await Time_slot.create({
        seesion_id,
        start_time: start,
        end_time: end,
        max_seats: max_seats,
        booked_seats: 0,
        is_available: true
    });
    return newTimeSlot;
}

//删除时间段
exports.deleteTimeSlot = async (id) => {
    const timeSlot = await Time_slot.findByPk(id);
    if (!timeSlot) {
        throw new AppError('时间段不存在', 404, 'TIME_SLOT_NOT_FOUND');
    }
    await timeSlot.destroy();
    return { message: '时间段已删除' };
}

// 更新时间段
exports.updateTimeSlot = async (id, data) => {
    const timeSlot = await Time_slot.findByPk(id);
    if (!timeSlot) {
        throw new AppError('时间段不存在', 404, 'TIME_SLOT_NOT_FOUND');
    }

    const { start_time, end_time, max_seats } = data;

    // 如果有更新开始或结束时间，进行验证
    if (start_time || end_time) {
        const start = start_time ? new Date(start_time) : timeSlot.start_time;
        const end = end_time ? new Date(end_time) : timeSlot.end_time;

        // 检查时间顺序
        if (start >= end) {
            throw new AppError('开始时间必须早于结束时间', 400, 'INVALID_TIME_RANGE');
        }

        // 检查时间段是否在seesion时间范围内
        const session = await Seesion.findByPk(timeSlot.seesion_id);
        if (start < session.start_time || end > session.end_time) {
            throw new AppError('时间段必须在对应seesion的时间范围内', 400, 'TIME_SLOT_OUT_OF_SEESION');
        }

        // 检查时间段是否与已有时间段冲突
        const existingTimeSlot = await Time_slot.findOne({
            where: {
                seesion_id: timeSlot.seesion_id,
                id: { [Op.ne]: id }, // 排除当前时间段
                [Op.or]: [
                    {
                        start_time: {
                            [Op.lt]: end,
                            [Op.gte]: start
                        }
                    },
                    {
                        end_time: {
                            [Op.lte]: end,
                            [Op.gt]: start
                        }
                    },
                    {
                        start_time: {
                            [Op.lte]: start
                        },
                        end_time: {
                            [Op.gte]: end
                        }
                    }
                ]
            }
        });
        if (existingTimeSlot) {
            throw new AppError('时间段冲突，请选择其他时间段', 400, 'TIME_SLOT_CONFLICT');
        }

        timeSlot.start_time = start;
        timeSlot.end_time = end;
    }

    // 如果有更新最大座位数，进行验证
    if (max_seats !== undefined) {
        if (max_seats < timeSlot.booked_seats) {
            throw new AppError('最大座位数不能小于已预订座位数', 400, 'INVALID_MAX_SEATS');
        }
        timeSlot.max_seats = max_seats;
        timeSlot.is_available = (timeSlot.booked_seats < max_seats);
    }
    await timeSlot.save();
    return timeSlot;
}

