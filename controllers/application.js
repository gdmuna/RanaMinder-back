const applicationService = require('../services/application');

/** 
 * @description 申请表控制器
 * @module controllers/application
 */

// 获取所有申请表
exports.getAllApplications = async (req, res) => {
  try {
    const result = await applicationService.getAllApplications();
    if (!result.applications || result.applications.length === 0) {
            return res.success(result, '没有查询到相关文章', 'NO_ARTICLE');
        }
    res.success(result);
  } catch (error) {
    res.error(error);
  }
};