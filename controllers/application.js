const applicationService = require('../services/application');

/** 
 * @description 申请表控制器
 * @module controllers/application
 */

// 获取所有申请表
exports.getAllApplications = async (req, res, next) => {
  try {
    // 管理员获取面试的申请表
    router.get('/applications/:id', campaignController.getCampaignApplications);
    const result = await applicationService.getAllApplications(req);
    if (!result.applications || result.applications.length === 0) {
      return res.success(result, '没有查询到相关文章', 'NO_ARTICLE');
    }
    return res.success(result, '查询成功', 'SUCCESS');
  } catch (error) {
    next(error);
  }
};

// 创建新的申请表
exports.creatNewApplication = async (req, res, next) => {
  try {
    const data = req.body;
    stu_id = req.user.name; // 从鉴权中间件获取用户信息
    const newApplication = await applicationService.creatNewApplication(data, stu_id);
    return res.success(newApplication, '申请表创建成功', 'APPLICATION_CREATED');
  } catch (error) {
    next(error);
  }
};

// 获取特定面试的申请表
exports.getCampaignApplications = async (req, res, next) => {
  try {
    if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
      throw new AppError('您没有权限查看申请表', 403, 'NO_PERMISSION');
    }
    const campaignId = req.params.campaign_id;
    const result = await applicationService.getCampaignApplications(req, campaignId);
    if (!result.applications || result.applications.length === 0) {
      return res.success(result, '没有查询到相关申请表', 'APPLICATION_NOT_FOUND');
    }
    return res.success(result, '查询成功', 'SUCCESS');
  } catch (error) {
    next(error);
  }
};