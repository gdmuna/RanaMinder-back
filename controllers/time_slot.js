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