const satgeService = require('../services/stage');
const AppError = require('../utils/AppError'); // 添加这一行

// 获取所有阶段
exports.getAllStages = async (req, res, next) => {
    try {
        const result = await satgeService.getAllStages(req);
        if (!result.stages || result.stages.length === 0) {
            return res.success(result, '没有查询到相关阶段', 'STAGE_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 创建新的阶段
exports.createNewStage = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限创建阶段', 403, 'NO_PERMISSION');
        }
        const data = req.body;
        const newStage = await satgeService.createNewStage(data);
        return res.success(newStage, '阶段创建成功', 'STAGE_CREATED');
    } catch (error) {
        next(error);
    }
};

// 更新阶段信息
exports.updateStage = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限更新阶段', 403, 'NO_PERMISSION');
        }
        const stageId = req.params.id;
        const data = req.body;
        const updatedStage = await satgeService.updateStage(stageId, data);
        return res.success(updatedStage, '阶段更新成功', 'STAGE_UPDATED');
    } catch (error) {
        next(error);
    }
}

// 删除阶段
exports.deleteStage = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限删除阶段', 403, 'NO_PERMISSION');
        }
        const stageId = req.params.id;
        await satgeService.deleteStage(stageId);
        return res.success(null, '阶段删除成功', 'STAGE_DELETED');
    } catch (error) {
        next(error);
    }
}