const time_slotController = require('../controllers/time_slot.js');
const express = require('express');
const router = express.Router();

/**
 * @description 时间段路由
 * @module routes/time_slot
 */

// 获取seesion时间段
router.get('/:seesion_id', time_slotController.getTimeSlotsBySeesionId);
// 创建新的时间段
router.post('/', time_slotController.createNewTimeSlot);
// // 更新时间段信息
// router.put('/:id', time_slotController.updateTimeSlot);
// 删除时间段
router.delete('/:id', time_slotController.deleteTimeSlot);
module.exports = router;