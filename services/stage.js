const { Stage, sequelize } = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 阶段服务
 * @module services/stage
 * @requires models/Stage
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回阶段数据
 */

exports.getAllStages = async (req) => {
    let stages;
    // 支持两种方式：query 参数和 path 参数
    const campaign_id = req.params.campaign_id;
    console.log('获取所有阶段，campaign_id：' + campaign_id);
    
    if (campaign_id) {
        // 如果提供了campaign_id，则只查询该campaign的阶段
        stages = await Stage.findAll({
            where: { campaign_id },
            order: [['createdAt', 'DESC']],
        })
    } else {
        stages = await Stage.findAll({
            order: [['createdAt', 'ASC']],
        });
    }
    return {
        stages
    };
}

/**
 * @description 创建新的阶段
 * @param {Object} data - 阶段数据
 * @returns {Promise<Object>} 返回新创建的阶段数据
 */

exports.createNewStage = async (data) => {
    const { title, description, campaign_id,sort_order,is_required } = data;

    // 检查必填字段
    if (!title || !campaign_id || !description || !sort_order) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }

    // 检查阶段标题是否已存在
    // const existingStage = await Stage.findOne({
    //     where: {
    //         title,
    //         campaign_id,
    //     },
    // });
    // if (existingStage) {
    //     throw new AppError('阶段标题已存在，请使用其他标题', 400, 'STAGE_TITLE_EXISTS');
    // }

    // 检查campaign_id是否存在
    const campaignExists = await sequelize.models.Campaign.findByPk(campaign_id);
    if (!campaignExists) {
        throw new AppError('指定的campaign_id不存在', 404, 'CAMPAIGN_NOT_FOUND');
    }

    // 创建新阶段
    const newStage = await Stage.create({
        campaign_id,
        title,
        description,
        sort_order: data.sort_order || 1, // 默认排序为1
        is_required: data.is_required || true,
    });

    return {stages: newStage};
}

/**
 * @description 更新阶段信息
 * @param {number} id - 阶段ID
 * @param {Object} data - 更新数据
 * @returns {Promise<Object>} 返回更新后的阶段数据
 */

exports.updateStage = async (id, data) => {
    const stage = await Stage.findByPk(id);
    if (!stage) {
        throw new AppError('阶段不存在', 404, 'STAGE_NOT_FOUND');
    }

    // 检查必填字段
    if (!data.title && !data.campaign_id && !data.description && !data.sort_order && !data.is_required) {
        throw new AppError('参数缺失，必须要填写更新参数', 400, 'MISSING_REQUIRED_FIELDS');
    }
    const updatedStage = await stage.update(data);
    return {stages: updatedStage};
}

/**
 * @description 删除阶段
 * @param {number} id - 阶段ID
 * @returns {Promise<void>} 无返回值
 */
exports.deleteStage = async (id) => {
    const stage = await Stage.findByPk(id);
    if (!stage) {
        throw new AppError('阶段不存在', 404, 'STAGE_NOT_FOUND');
    }

    // 删除阶段
    await stage.destroy();
    return;
}