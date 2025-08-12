const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

/**
 * @description 申请表路由
 * @module routes/application
 */

// 获取所有申请表
router.get('/', applicationController.getAllApplications);
// 创建新的申请表
router.post('/', applicationController.creatNewApplication);
// 获取特定面试的申请表
router.get('/:campaign_id', applicationController.getCampaignApplications);


module.exports = router;