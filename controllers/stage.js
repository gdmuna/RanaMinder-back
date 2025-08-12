const satgeService = require('../services/stage');
const express = require('express');

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