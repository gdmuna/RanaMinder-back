const casdoorUtils = require('../utils/casdoorUtils');

/**
 * 获取 Casdoor 登录授权链接（根据请求头动态设置 redirect_uri）
 * @param {object} req - Express 请求对象（可选）
 * @returns {string} 登录授权 URL
 */
exports.getLoginUrl = (req) => {
    let redirectUri = process.env.CASDOOR_REDIRECT_URL ;
    console.log('headers:', req);
    // 如果传入了 req 参数且包含 headers，则尝试获取 origin
    if (req && req.headers) {
        const origin =
            req.headers.origin ||
            (req.headers.referer ? new URL(req.headers.referer).origin : null);

        // 如果能识别到 origin，就替换成它的 loginCallback 路径
        if (origin) {
            redirectUri = `${origin}/loginCallback`;
        }
    }

    return (
        process.env.CASDOOR_ENDPOINT +
        "/login/oauth/authorize" +
        `?client_id=${process.env.CASDOOR_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=read` +
        `&state=${process.env.CASDOOR_STATE}`
    );
};

/**
 * 处理 Casdoor 登录回调
 * @param {string} code - 授权码
 * @returns {Promise<object>} 用户信息和 token
 */
exports.handleCallback = async (code) => {
    return await casdoorUtils.handleCallBack(code);
};

/**
 * 刷新 AccessToken
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise<object>} 新的 token 信息
 */
exports.refreshToken = async (refreshToken) => {
    return await casdoorUtils.refreshToken(refreshToken);
};

/** * 获取用户信息
 * @param {string} accessToken - 访问令牌
 * @return {Promise<object>} 用户信息
 */
exports.getUserInfo = async (accessToken) => {
    return await casdoorUtils.getUserInfo(accessToken);
}
