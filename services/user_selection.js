const { User, User_selection, Time_slot, Seesion, Stage, Campaign,sequelize } = require('../models');
const { Op, where } = require('sequelize');
const { formatUserSelections } = require('../utils/format');
const AppError = require('../utils/AppError');
const { raw } = require('express');

/**
 * @description 用户选择服务
 * @module services/user_selection
 * @requires models/User
 * @requires models/User_selection
 * @requires models/Time_slot
 * @requires models/Seesion
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
                        model: Seesion,
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

    return result;
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
                        model: Seesion,
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

    return result;
}
