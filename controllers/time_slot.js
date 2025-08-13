const time_slotService = require('../services/time_slot.js');
const express = require('express');

// 获取seesion时间段
exports.getTimeSlotsBySeesionId = async (req, res,next) => {
    try {
        const seesion_id = req.params.seesion_id;
        const result = await time_slotService.getTimeSlotsBySeesionId(seesion_id);
        if (!result.time_slots || result.time_slots.length === 0) {
            return res.success(result, '没有查询到相关时间段', 'TIME_SLOT_NOT_FOUND');
        }
        return res.success(result, '查询成功', 'SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 创建新的时间段
exports.createNewTimeSlot = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限创建seesion', 403, 'NO_PERMISSION');
        }
        const data = req.body;
        const newTimeSlot = await time_slotService.createNewTimeSlot(data);
        return res.success(newTimeSlot, '时间段创建成功', 'TIME_SLOT_CREATED');
    } catch (error) {
        next(error);
    }
};

//删除时间段
exports.deleteTimeSlot = async (req, res, next) => {
    try {
        if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
            throw new AppError('您没有权限删除时间段', 403, 'NO_PERMISSION');
        }
        const timeSlotId = req.params.id;
        const result = await time_slotService.deleteTimeSlot(timeSlotId);
        return res.success(result, '时间段删除成功', 'TIME_SLOT_DELETED');
    } catch (error) {
        next(error);
    }
};