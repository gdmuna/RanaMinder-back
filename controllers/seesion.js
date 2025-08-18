const seesionService = require('../services/seesion');
const AppError = require('../utils/AppError'); // 添加这一行

//查询面试节点
exports.getAllSeesions = async (req, res, next) => {
    try {
        const stage_id = req.params.stage_id;
        const result = await seesionService.getSeesionByStageId(stage_id);
        if (!result.seesions || result.seesions.length === 0) {
            return res.success(result, '没有查询到相关面试节点', 'SEESION_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

//创建面试节点
exports.createNewSeesion = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限创建面试节点', 403, 'NO_PERMISSION');
        }
        const data = req.body;
        const newSeesion = await seesionService.createNewSeesion(data);
        return res.success(newSeesion, '面试节点创建成功', 'SEESION_CREATED');
    } catch (error) {
        next(error);
    } 
};

//更新面试节点
exports.updateSeesion = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限更新面试节点', 403, 'NO_PERMISSION');
        }
        const seesionId = req.params.id;
        const data = req.body;
        const updatedSeesion = await seesionService.updateSeesion(seesionId, data);
        return res.success(updatedSeesion, '面试节点更新成功', 'SEESION_UPDATED');
    } catch (error) {
        next(error);
    }
};

//删除面试节点
exports.deleteSeesion = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限删除面试节点', 403, 'NO_PERMISSION');
        }
        const seesionId = req.params.id;
        await seesionService.deleteSeesion(seesionId);
        return res.success(null, '面试节点删除成功', 'SEESION_DELETED');
    }
    catch (error) {
        next(error);
    }
};