const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/**
 * @description 认证路由
 * @module routes/auth
 */

// 跳转casdoor登录页面
router.get('/login',authController.getLoginUrl);
