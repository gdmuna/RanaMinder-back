const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const applicationController = require('../controllers/application');

/**
 * @description 申请表路由
 * @module routes/application
 */

// 获取所有申请表
router.get('/', applicationController.getAllApplications);
// 创建新的申请表
router.post('/',upload.single('photo'),applicationController.creatNewApplication);
//查询当前用户的申请表
router.get('/me', applicationController.getCurrentUserApplications);
// 获取特定面试的申请表
router.get('/:campaign_id', applicationController.getCampaignApplications);
// 删除申请表
router.delete('/:id', applicationController.deleteApplication);


module.exports = router;