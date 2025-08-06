const authService = require('../services/auth');
const AppError = require('../utils/AppError');

/**
 * @description 认证控制器
 * @module controllers/authController
 */

// 获取casdoor登录页面的URL
exports.getLoginUrl = async (req, res) => {
  try {
    const loginUrl = await authService.getLoginUrl();
    console.log('登录地址:', loginUrl);
    res.redirect(loginUrl);
  } catch (error) {
    next(error);
  }
};