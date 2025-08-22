const user_selectionService = require('../services/user_selection.js');
const express = require('express');
const AppError = require('../utils/AppError');

// 获取用户选择
exports.getUserSelections = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限获取', 403, 'NO_PERMISSION');
        }
        const result = await user_selectionService.getUserSelections(req);
        if (!result || result.length === 0) {
            return res.success(result,'没有查询到相关选择', 'SELECTION_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
}

// 获取当前用户的选择 
exports.getCurrentUserSelection = async (req, res, next) => {
    try {
        const result = await user_selectionService.getCurrentUserSelection(req);
        if (!result) {
            return res.success(result,'没有查询到相关选择', 'SELECTION_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
}

// 新建用户选择
exports.createUserSelection = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限创建seesion', 403, 'NO_PERMISSION');
        }
        const result = await user_selectionService.createUserSelection(req.body);
        return res.success(result, '创建成功', 'CREATION_SUCCESS');
    } catch (error) {
        next(error);
    }
}

//删除用户选择
exports.deleteUserSelection = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限删除选择', 403, 'NO_PERMISSION');
        }
        const result = await user_selectionService.deleteUserSelection(req.params.id);
        return res.success(result, '删除成功', 'DELETION_SUCCESS');
    } catch (error) {
        next(error);
    }
}