const { User, User_selection, Time_slot, Session, Stage, Campaign,sequelize } = require('../models');
const { Op } = require('sequelize');
const { formatUserSelections } = require('../utils/format');
const AppError = require('../utils/AppError');


/**
 * @description 用户选择服务
 * @module services/user_selection
 * @requires models/User
 * @requires models/User_selection
 * @requires models/Time_slot
 * @requires models/Session
 * @requires models/Stage
 * @requires models/Campaign
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回用户选择数据
 */

//查询用户当前的选择
exports.getUserSelections = async (req) => {
    let userIds = req.query.user_id;
    if (Array.isArray(userIds)) {
        // 多个 id
    } else if (typeof userIds === 'string' && userIds.includes(',')) {
        // 逗号分隔的字符串
        userIds = userIds.split(',').map(id => id.trim());
    } else {
        // 单个 id
        userIds = [userIds];
    }

    const selections = await User_selection.findAll({
        where: {
            user_id: { [Op.in]: userIds }
        },
        include: [
            {
                model: Time_slot,
                as: 'time_slot',
                required: true,
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
                                include: [
                                    {
                                        model: Campaign,
                                        as: 'campaign',
                                        required: true,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']],
    });
    
    const result = formatUserSelections(selections);

    return {User_selections: result};
}

// 获取当前用户的选择
exports.getCurrentUserSelection = async (req) => {
    // 先查用户

    const user = await User.findOne({
        where: { stu_id: req.user.name },
        attributes: ['id'],
        raw: true
    });

    if (!user) {
        throw new AppError('用户不存在', 404, 'USER_NOT_FOUND');
    }
    console.log(user.id);
    // 再查选择
    const selections = await User_selection.findAll({
        where: { user_id:user.id },
        include: [
            {
                model: Time_slot,
                as: 'time_slot',
                required: true,
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
                                include: [
                                    {
                                        model: Campaign,
                                        as: 'campaign',
                                        required: true,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']],
    });
    if (!selections || selections.length === 0) {
        throw new AppError('没有查询到相关选择', 404, 'SELECTION_NOT_FOUND');
    }
    const result = formatUserSelections(selections);

    return {user_selections: result};
}

//新增用户选择
exports.createUserSelection = async (data) => {
    let { user_id, time_slot_id } = data;

    // 支持批量 user_id
    const userIds = Array.isArray(user_id) ? user_id : [user_id];
    if (!userIds.length || !time_slot_id) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }

    // 检查时间段是否存在
    const timeSlot = await Time_slot.findByPk(time_slot_id);
    if (!timeSlot) {
        throw new AppError('时间段不存在', 404, 'TIME_SLOT_NOT_FOUND');
    }

    // 检查时间段是否已满
    if (timeSlot.current_seats + userIds.length > timeSlot.max_seats) {
        throw new AppError('时间段已满，请选择其他时间段', 409, 'TIME_SLOT_FULL');
    }

    const results = [];
    for (const uid of userIds) {
        // 检查用户是否存在
        const user = await User.findByPk(uid);
        if (!user) {
            results.push({ user_id: uid, success: false, error: '用户不存在' });
            continue;
        }

        // 查询当前 time_slot 的 stage_id
        const currentTimeSlot = await Time_slot.findByPk(time_slot_id, {
            include: [{
                model: Session,
                as: 'session',
                include: [{
                    model: Stage,
                    as: 'stage'
                }]
            }]
        });
        const stageId = currentTimeSlot?.session?.stage_id;
        if (!stageId) {
            results.push({ user_id: uid, success: false, error: '未找到对应的面试阶段' });
            continue;
        }

        // 检查该用户在本 stage 下是否已有分配
        const hasAssigned = await User_selection.findOne({
            include: [{
                model: Time_slot,
                as: 'time_slot',
                include: [{
                    model: Session,
                    as: 'session',
                    where: { stage_id: stageId }
                }]
            }],
            where: { user_id: uid }
        });
        if (hasAssigned) {
            results.push({ user_id: uid, success: false, error: '该用户在本面试阶段已分配时间段，不能重复分配' });
            continue;
        }

        // 检查用户是否已经选择了该时间段
        const existingSelection = await User_selection.findOne({
            where: { user_id: uid, time_slot_id },
        });
        if (existingSelection) {
            results.push({ user_id: uid, success: false, error: '用户已经选择了该时间段' });
            continue;
        }

        // 创建新的用户选择
        const newSelection = await User_selection.create({
            user_id: uid,
            time_slot_id,
        });
        results.push({ user_id: uid, success: true, selection: newSelection });
    }

    // 批量递增booked_seats
    await Time_slot.increment('booked_seats', {
        by: results.filter(r => r.success).length,
        where: { id: time_slot_id }
    });

    return {user_selections: results};
}

// 删除用户选择
exports.deleteUserSelection = async (selectionId) => {
    const selection = await User_selection.findByPk(selectionId);
    if (!selection) {
        throw new AppError('用户选择不存在', 404, 'SELECTION_NOT_FOUND');
    }

    await User_selection.destroy({
        where: { id: selectionId }
    });
    await Time_slot.decrement('booked_seats', {
        by: 1,
        where: { id: selection.time_slot_id }
    });
    return { message: '用户选择已删除' };
}