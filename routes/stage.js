const stageController = require('../controllers/stage.js');
const express = require('express');
const router = express.Router();

// 获取阶段
router.get('/', stageController.getAllStages);
// 创建新的阶段
router.post('/', stageController.createNewStage);
// 更新阶段信息
router.put('/:id', stageController.updateStage);
// 删除阶段
router.delete('/:id', stageController.deleteStage);

module.exports = router;