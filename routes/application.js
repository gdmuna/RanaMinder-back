const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

/**
 * @description 申请表路由
 * @module routes/application
 */

// 获取所有申请表
router.get('/', applicationController.getAllApplications);


module.exports = router;