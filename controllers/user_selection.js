const user_selectionService = require('../services/user_selection.js');
const express = require('express');
const AppError = require('../utils/AppError');

// 获取用户选择
exports.getUserSelections = async (req, res, next) => {
    try {
        const result = await user_selectionService.getUserSelections(req);
        if (!result || result.length === 0) {
            return res.success(result, '没有查询到相关选择', 'SELECTION_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
}