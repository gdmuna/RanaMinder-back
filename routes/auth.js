const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/**
 * @description 认证路由
 * @module routes/auth
 */

// 跳转casdoor登录页面
router.get('/login',authController.getLoginUrl);

// 处理casdoor登录回调
router.post('/callback',authController.handelCallback);

// 刷新Token
router.post('/refresh-token',authController.refreshToken);

// 获取用户信息
router.get('/user-info', authController.getUserInfo);

module.exports = router;
