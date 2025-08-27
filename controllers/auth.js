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

/**
 * 处理casdoor登录回调
 * @route POST /api/auth/callback
 * @param {string} code - 授权码（query参数）
 * @param {string} state - 状态参数（query参数）
 * @returns {object} 登录成功后的用户信息和token
 */
exports.handelCallback = async (req, res, next) => {
    try {
        const { code } = req.query;
        if (!code) {
            return next(new AppError('缺少授权码', 400, 'MISSING_CODE'));
        }
        console.log('登录回调参数:', { code });
        const result = await authService.handleCallback(code);
        return res.success(result, '登录成功', 'LOGIN_SUCCESS');
    } catch (error) {
        next(error);
    }
};

/**
 * 刷新Token
 * @route POST /api/auth/refresh
 * @param {string} refreshToken - 刷新令牌（body参数）
 * @returns {object} 新的token信息
 */
exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return next(new AppError('缺少刷新令牌', 400, 'MISSING_REFRESH_TOKEN'));
        }
        const result = await authService.refreshToken(refreshToken);
        return res.success(result, '刷新令牌成功', 'REFRESH_SUCCESS');
    } catch (error) {
        next(error);
    }
};

/**
 * 获取用户信息
 * @route GET /api/auth/user-info
 * @returns {object} 用户信息
 * @security BearerAuth
 * @throws {401} 未授权
 * @throws {500} 服务器错误
 * */
exports.getUserInfo = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            return next(new AppError('未授权', 401, 'UNAUTHORIZED'));
        }
        const userInfo = await authService.getUserInfo(accessToken);
        return res.success(userInfo, '获取用户信息成功', 'USER_INFO_SUCCESS');
    } catch (error) {
        next(error);
    }
}
