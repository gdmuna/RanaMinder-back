const ResultService = require('../services/result');
const AppError = require('../utils/AppError');

/**
 * @description 结果控制器
 * @module controllers/result
 */

// 获取所有结果
exports.getAllResults = async (req, res, next) => {
    try {
         if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限删除面试节点', 403, 'NO_PERMISSION');
        }
        const result = await ResultService.getAllResults(req);
        if (!result || result.results.length === 0) {
            return res.success(result,'没有查询到相关结果', 'RESULT_NOT_FOUND');
        }
        console.log(11111)
        return res.success(result,'查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 获取当前用户的结果
exports.getCurrentUserResults = async (req, res, next) => {
    try {
        const result = await ResultService.getCurrentUserResults(req);
        if (!result || result.length === 0) {
            return res.success(result,'没有查询到相关结果', 'RESULT_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 修改结果
exports.updateResult = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限修改结果', 403, 'NO_PERMISSION');
        }
        const resultId = req.body.result_id;
        const data = req.body;
        const updatedResult = await ResultService.updateResult(resultId, data);
        return res.success(updatedResult, '结果更新成功', 'RESULT_UPDATED');
    } catch (error) {
        next(error);
    }
};