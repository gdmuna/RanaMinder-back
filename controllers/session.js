const sessionService = require('../services/session');
const AppError = require('../utils/AppError'); // 添加这一行

//查询面试节点
exports.getAllSessions = async (req, res, next) => {
    try {
        const stage_id = req.params.stage_id;
        const result = await sessionService.getSessionByStageId(stage_id);
        if (!result.sessions || result.sessions.length === 0) {
            return res.success(result, '没有查询到相关面试节点', 'SESSION_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

//创建面试节点
exports.createNewSession = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限创建面试节点', 403, 'NO_PERMISSION');
        }
        const data = req.body;
        const newSession = await sessionService.createNewSession(data);
        return res.success(newSession, '面试节点创建成功', 'SESSION_CREATED');
    } catch (error) {
        next(error);
    } 
};

//更新面试节点
exports.updateSession = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限更新面试节点', 403, 'NO_PERMISSION');
        }
        const sessionId = req.params.id;
        const data = req.body;
        const updatedSession = await sessionService.updateSession(sessionId, data);
        return res.success(updatedSession, '面试节点更新成功', 'SESSION_UPDATED');
    } catch (error) {
        next(error);
    }
};

//删除面试节点
exports.deleteSession = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency' || g === 'gdmu/Nekorify-admin')) {
            throw new AppError('您没有权限删除面试节点', 403, 'NO_PERMISSION');
        }
        const sessionId = req.params.id;
        await sessionService.deleteSession(sessionId);
        return res.success(null, '面试节点删除成功', 'SESSION_DELETED');
    }
    catch (error) {
        next(error);
    }
};