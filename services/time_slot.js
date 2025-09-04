const { Time_slot, Session, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

/**
 * @description 时间段服务
 * @module services/time_slot
 * @requires models/Time_slot
 * @requires models/Session
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回时间段数据
 */

exports.getTimeSlotsBySessionId = async (session_id) => {

    // 检查面试是否存在
    const session = await Session.findByPk(session_id);
    if (!session) {
        throw new AppError('面试不存在', 404, 'SESSION_NOT_FOUND');
    }
    const time_slots = await Time_slot.findAll({
        where: { session_id },
        order: [['createdAt', 'ASC']],
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
    const { session_id, start_time, end_time, max_seats } = data;
    // 检查必填字段
    if (!session_id || !start_time || !end_time || !max_seats) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }
    // 检查面试节点是否存在
    const session = await Session.findByPk(session_id);
    if (!session) {
        throw new AppError('指定的session不存在', 404, 'SESSION_NOT_FOUND');
    }

    const start = new Date(start_time);
    const end = new Date(end_time);

    // 检查时间顺序
    if (start >= end) {
        throw new AppError('开始时间必须早于结束时间', 400, 'INVALID_TIME_RANGE');
    }

    // 检查时间段是否在session时间范围内
    if (start < session.start_time || end > session.end_time) {
        throw new AppError('时间段必须在对应session的时间范围内', 400, 'TIME_SLOT_OUT_OF_SESSION');
    }

    // 创建新时间段
    const newTimeSlot = await Time_slot.create({
        session_id,
        start_time: start,
        end_time: end,
        max_seats: max_seats,
        booked_seats: 0,
        is_available: true
    });
    return { time_slots: newTimeSlot };
}

//删除时间段
exports.deleteTimeSlot = async (id) => {
  return await sequelize.transaction(async (t) => {
    // 检查time_slot是否存在
    const timeSlot = await Time_slot.findByPk(id);
    if (!timeSlot) {
      throw new AppError('时间段不存在', 404, 'TIME_SLOT_NOT_FOUND');
    }
    
    // 删除与该time_slot关联的所有user_selection
    await sequelize.models.User_selection.destroy({ 
      where: { time_slot_id: id }, 
      transaction: t 
    });
    
    // 最后删除time_slot
    await timeSlot.destroy({ transaction: t });
    return { message: '时间段已删除' };
  });
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

        // 检查时间段是否在session时间范围内
        const session = await Session.findByPk(timeSlot.session_id);
        if (start < session.start_time || end > session.end_time) {
            throw new AppError('时间段必须在对应session的时间范围内', 400, 'TIME_SLOT_OUT_OF_SESSION');
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
    return { time_slots: timeSlot };
}

/**
 * @description 通过campaignId查找所有下属的时间段
 * @param {number} campaignId - 面试ID
 * @returns {Promise<Object>} 返回所有相关时间段
 */
exports.getTimeSlotsByCampaignId = async (campaignId) => {
    const { Campaign, Stage, Session } = require('../models');
    
    // 检查面试是否存在
    const campaign = await Campaign.findByPk(campaignId);
    if (!campaign) {
        throw new AppError('面试不存在', 404, 'CAMPAIGN_NOT_FOUND');
    }
    
    // 查找所有关联的阶段、面试节点和时间段
    const timeSlots = await Time_slot.findAll({
        include: [
            {
                model: Session,
                as: 'session',
                required: true,
                include: [
                    {
                        model: Stage,
                        as: 'stage',
                        required: true,
                        where: { campaign_id: campaignId }
                    }
                ]
            }
        ],
        order: [['start_time', 'ASC']]
    });
    
    return { time_slots: timeSlots };
}

