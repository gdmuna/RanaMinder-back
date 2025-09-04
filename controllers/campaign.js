const campaignService = require('../services/campaign');
const AppError = require('../utils/AppError'); // 添加这一行

/**
 * @description 面试控制器
 * @module controllers/campaign
 */

// 获取所有面试
exports.getAllCampaigns = async (req, res, next) => {
    try {
        const result = await campaignService.getAllCampaigns(req);
        if (!result.campaigns || result.campaigns.length === 0) {
            return res.success(result, '没有查询到相关面试', 'CAMPAIGN_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 创建新的面试
exports.createNewCampaign = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限创建面试', 403, 'NO_PERMISSION');
        }
        const data = req.body;
        const newCampaign = await campaignService.createNewCampaign(data);
        return res.success(newCampaign, '面试创建成功', 'CAMPAIGN_CREATED');
    } catch (error) {
        next(error);
    }
};

// 更新面试信息
exports.updateCampaign = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限更新面试', 403, 'NO_PERMISSION');
        }
        const campaignId = req.params.id;
        const data = req.body;
        console.log('123456789', data);
        
        const updatedCampaign = await campaignService.updateCampaign(campaignId, data);
        return res.success(updatedCampaign, '面试更新成功', 'CAMPAIGN_UPDATED');
    } catch (error) {
        next(error);
    }
};

// 删除面试
exports.deleteCampaign = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限删除面试', 403, 'NO_PERMISSION');
        }
        const campaignId = req.params.id;
        await campaignService.deleteCampaign(campaignId);
        return res.success(null, '面试删除成功', 'CAMPAIGN_DELETED');
    } catch (error) {
        next(error);
    }
}