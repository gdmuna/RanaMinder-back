const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign');

// 用户查询当前可用面试
router.get('/user', campaignController.getAllCampaigns);
// 管理员创建新的面试
router.post('/create', campaignController.createNewCampaign);
// 管理员更新面试信息
router.put('/:id', campaignController.updateCampaign);

module.exports = router;
