const applicationService = require('../services/application');

/** 
 * @description 申请表控制器
 * @module controllers/application
 */

// 获取所有申请表
exports.getAllApplications = async (req, res, next) => {
  try {
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
}