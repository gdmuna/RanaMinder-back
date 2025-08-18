const { Campaign, User, Application, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const application = require('../models/application');

/**
 * @description 面试服务
 * @module services/campaign
 * @requires models/Campaign
 * @requires models/User
 * @returns {Promise<Object>} 返回面试数据
 **/

// 用户获取当前可用面试
exports.getAllCampaigns = async (req) => {

    const query = req.query || {};
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    let  condition = {
            order: [['createdAt', 'DESC']],
            offset,
            limit: pageSize,
        };


    const { count, rows } = await Campaign.findAndCountAll(condition);
    const totalPages = Math.ceil(count / pageSize);
    const campaigns = rows;

    if (!campaigns || campaigns.length === 0) {
        throw new AppError('没有查询到申请表', 404, 'NO_APPLICATION');
    }

    return {
        pagination: {
            currentPage,             // 当前页
            pageSize,                // 每页记录数
            totalRecords: count,     // 总记录数
            totalPages,              // 总页数   
        },
        campaigns
    };
}

// 创建新的面试
exports.createNewCampaign = async (data) => {
    return await sequelize.transaction(async (t) => {
        // 检查是否有重复的面试
        const existingCampaign = await Campaign.findOne({
            where: {
                start_date: {
                    [Op.lte]: data.end_date,
                },
                end_date: {
                    [Op.gte]: data.start_date,
                },
            },
        });
        if (existingCampaign) {
            throw new AppError('面试时间冲突，请检查开始和结束时间', 409, 'CAMPAIGN_CONFLICT');
        }
        // 检查字段
        if (!data.title || !data.description || !data.start_date || !data.end_date) {
            throw new AppError('缺少必要的字段', 400, 'MISSING_FIELDS');
        }
        // 创建新的面试
        const newCampaign = await Campaign.create(data, { transaction: t });
        return newCampaign;
    });
}

// 更新面试信息
exports.updateCampaign = async (campaignId, data) => {
    return await sequelize.transaction(async (t) => {
        // 检查面试是否存在
        const campaign = await Campaign.findByPk(campaignId);
        if (!campaign) {
            throw new AppError('面试不存在', 404, 'CAMPAIGN_NOT_FOUND');
        }
        // 检查是否有重复的面试
        const existingCampaign = await Campaign.findOne({
            where: {
                id: {
                    [Op.ne]: campaignId, // 排除当前面试
                },
                start_date: {
                    [Op.lte]: data.end_date,
                },
                end_date: {
                    [Op.gte]: data.start_date,
                },
            },
            transaction: t
        });
        if (existingCampaign) {
            throw new AppError('面试时间冲突，请检查开始和结束时间', 409, 'CAMPAIGN_CONFLICT');
        }
        // 检查字段
        if (!data.title || !data.description || !data.start_date || !data.end_date) {
            throw new AppError('缺少必要的字段', 400, 'MISSING_FIELDS');
        }
        // 更新面试信息
        const updatedCampaign = await campaign.update(data, { transaction: t });
        return updatedCampaign;
    });
}

// 删除面试
exports.deleteCampaign = async (campaignId) => {
    return await sequelize.transaction(async (t) => {
        // 检查面试是否存在
        const campaign = await Campaign.findByPk(campaignId);
        if (!campaign) {
            throw new AppError('面试不存在', 404, 'CAMPAIGN_NOT_FOUND');
        }
        // 软删除面试
        await campaign.destroy({campaignId},{ transaction: t });
        return;
    });
}