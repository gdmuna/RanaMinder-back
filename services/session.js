const { Session, Stage, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

/**
 * @description 面试服务
 * @module services/session
 * @requires models/Session
 * @requires models/Stage
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回面试数据
 */

//查询stage的session
exports.getSessionByStageId = async (stage_id) => {

    // 检查阶段是否存在
    const stage = await Stage.findByPk(stage_id);
    if (!stage) {
        throw new AppError('阶段不存在', 404, 'STAGE_NOT_FOUND');
    }
    const sessions = await Session.findAll({
        where: { stage_id },
    order: [['createdAt', 'ASC']],
    });
    return {
        sessions
    };
}

/**
 * @description 创建新的面试节点
 * @param {Object} data - 面试节点数据
 * @returns {Promise<Object>} 返回新创建的面试节点数据
 */
exports.createNewSession = async (data) => {
    const { stage_id, title, start_time, end_time, location } = data;
    // 检查必填字段
    if (!stage_id || !title || !start_time || !end_time || !location) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }
    // 检查阶段是否存在
    const stage = await Stage.findByPk(stage_id);
    if (!stage) {
        throw new AppError('指定的阶段不存在', 404, 'STAGE_NOT_FOUND');
    }

    // 检查时间段是否在面试里面
    const existingSession = await Session.findOne({
        where: {
            stage_id,
            [Op.or]: [
                {
                    start_time: {
                        [Op.lte]: new Date(end_time),
                        [Op.gte]: new Date(start_time)
                    }
                },
                {
                    end_time: {
                        [Op.lte]: new Date(end_time),
                        [Op.gte]: new Date(start_time)
                    }
                },
                {
                    start_time: {
                        [Op.gte]: new Date(start_time),
                        [Op.lte]: new Date(end_time)
                    },
                    end_time: {
                        [Op.gte]: new Date(start_time),
                        [Op.lte]: new Date(end_time)
                    }
                }
            ]
        }
    });
    if (existingSession) {
        throw new AppError('面试时间冲突，请检查开始和结束时间', 409, 'SESSION_CONFLICT');
    }
    // 检查时间是否合理
    if (new Date(start_time) >= new Date(end_time)) {
        throw new AppError('开始时间必须早于结束时间', 400, 'INVALID_TIME_RANGE');
    }

    // 创建新的面试节点
    const newSession = await Session.create({
        stage_id,
        title,
        start_time,
        end_time,
        location
    });
    return {sessions:newSession};
}

/**
 * @description 更新面试节点信息
 * @param {number} id - 面试节点ID
 * @param {Object} data - 更新数据
 * @returns {Promise<Object>} 返回更新后的面试节点数据
 */
exports.updateSession = async (id, data) => {
    // 检查必填字段
    if (!data.stage_id && !data.title && !data.start_time && !data.end_time && !data.location) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }
    // 检查面试节点是否存在
    const session = await Session.findByPk(id);
    if (!session) {
        throw new AppError('面试节点不存在', 404, 'SESSION_NOT_FOUND');
    }

    // 检查阶段是否存在（如果有变更）
    let targetStageId = session.stage_id;
    if (data.stage_id && data.stage_id !== session.stage_id) {
        const stage = await Stage.findByPk(data.stage_id);
        if (!stage) {
            throw new AppError('指定的阶段不存在', 404, 'STAGE_NOT_FOUND');
        }
        targetStageId = data.stage_id;
    }

    // 检查时间是否合理
    const newStart = data.start_time ? new Date(data.start_time) : session.start_time;
    const newEnd = data.end_time ? new Date(data.end_time) : session.end_time;

    if (newStart >= newEnd) {
        throw new AppError('开始时间必须早于结束时间', 400, 'INVALID_TIME_RANGE');
    }

    // 检查时间冲突
    // if (data.start_time || data.end_time || data.stage_id) {
    //     const conflict = await Session.findOne({
    //         where: {
    //             stage_id: targetStageId,
    //             id: { [Op.ne]: id }, // 排除自己
    //             [Op.or]: [
    //                 {
    //                     start_time: {
    //                         [Op.lt]: newEnd,
    //                         [Op.gte]: newStart
    //                     }
    //                 },
    //                 {
    //                     end_time: {
    //                         [Op.lte]: newEnd,
    //                         [Op.gt]: newStart
    //                     }
    //                 },
    //                 {
    //                     start_time: {
    //                         [Op.lte]: newStart
    //                     },
    //                     end_time: {
    //                         [Op.gte]: newEnd
    //                     }
    //                 }
    //             ]
    //         }
    //     });
    //     if (conflict) {
    //         throw new AppError('面试时间冲突，请检查开始和结束时间', 409, 'SESSION_CONFLICT');
    //     }
    // }

    // 更新面试节点
    const updatedSession = await session.update(data);
    return {sessions: updatedSession};
}

/**
 * @description 删除面试节点
 * @param {number} id - 面试节点ID
 * @returns {Promise<void>} 无返回值
 */
exports.deleteSession = async (id) => {
    // 检查面试节点是否存在
    const session = await Session.findByPk(id);
    if (!session) {
        throw new AppError('面试节点不存在', 404, 'SESSION_NOT_FOUND');
    }
    // 软删除面试节点
    await session.destroy();
}