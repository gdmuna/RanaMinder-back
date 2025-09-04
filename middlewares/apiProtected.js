const casdoor = require('../config/casdoorConfigs');
const { User } = require('../models');

// 路由白名单
const whiteList = [
  { method: 'GET', path: /^\/api\/auth/ },
  { method: 'POST', path: /^\/api\/auth/ },

];

// 白名单函数
function isWhiteListed(method, path) {
  return whiteList.some(item =>
    item.method === method && item.path.test(path)
  );
}

// 鉴权中间件
module.exports = async (req, res, next) => {
  try {
    // 判断是否在白名单
    if (isWhiteListed(req.method, req.path)) {
      return next();
    }

    // 获取 Authorization 头
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: '未授权认证'
      });
    }

    // Bearer token 格式
    const token = authHeader.replace('Bearer ', '');
    let userInfo = await casdoor.parseJwtToken(token);

    // 检查用户信息是否存在
    if (!userInfo) {
      return res.status(401).json({
        success: false,
        error: '无效的认证令牌'
      });
    }

    const user = await User.findOne({ where: { stu_id: userInfo.name } });
    if (!user) {
      // 如果用户不存在，创建新用户
      await User.create({
        stu_id: userInfo.name,
        name: userInfo.displayName,
        sso_id: userInfo.id,
        avatar_url: userInfo.avatar,
        last_signin_time: new Date(),
      });
    }
      // 将用户信息存储在请求对象中
      req.user = userInfo;
      next();
    } catch (error) {
      console.error({
        success: false,
        '鉴权失败': error
      });
      res.status(500).json({
        success: false,
        error: '鉴权失败 无效Token'
      });
    }
  } 