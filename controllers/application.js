const applicationService = require('../services/application');
const AppError = require('../utils/AppError'); // 添加这一行

/** 
 * @description 申请表控制器
 * @module controllers/application
 */

// 获取所有申请表
exports.getAllApplications = async (req, res, next) => {
  try {
    if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
      throw new AppError('您没有权限查看申请表', 403, 'NO_PERMISSION');
    }
    // 管理员获取面试的申请表
    const result = await applicationService.getAllApplications(req);
    if (!result.applications || result.applications.length === 0) {
      return res.success(result, '没有查询到相关文章', 'ARTICLE_NOT_FOUND');
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
    stu_id = req.user.name;
    const file=req.file;
    const newApplication = await applicationService.creatNewApplication(data, stu_id,file);
    return res.success(newApplication, '申请表创建成功', 'APPLICATION_CREATED');
  } catch (error) {
    next(error);
  }
};

//查询当前用户的申请表
exports.getCurrentUserApplications = async (req, res, next) => {
  try {
    const stuId = req.user.name; // 从鉴权中间件获取用户信息
    const result = await applicationService.getCurrentUserApplications(stuId);
    if (!result.applications || result.applications.length === 0) {
      return res.success(result, '没有查询到相关申请表', 'APPLICATION_NOT_FOUND');
    }
    return res.success(result, '查询成功', 'SUCCESS');
  } catch (error) {
    next(error);
  }
}

// 删除申请表
exports.deleteApplication = async (req, res, next) => {
  try {
    const applicationId = req.params.id;
    const stuId = req.user.name; 
    await applicationService.deleteApplication(applicationId, stuId);
    return res.success(null, '申请表删除成功', 'APPLICATION_DELETED');
  } catch (error) {
    next(error);
  }
}