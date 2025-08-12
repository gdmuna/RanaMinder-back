const seesionService = require('../services/seesion');
const express = require('express');

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