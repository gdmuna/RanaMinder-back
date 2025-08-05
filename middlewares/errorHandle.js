/**
 * @description 全局错误处理中间件
 * @param {Error} err - 错误对象
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @param {NextFunction} next - 下一个中间件函数
 */
function errorHandler(err, req, res, next) {
    console.log(err); // 打印错误信息到控制台
  // 默认错误响应
  let errorResponse = {
    success: false,
    data:{
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  };

  let statusCode = 500; // 默认状态码

  // 根据错误类型设置不同的状态码和响应
  switch (true) {
    // 自定义应用错误
    case err.isOperational:
      statusCode = err.statusCode || 400;
      break;
      
    // 验证错误 (如Joi, express-validator)
    case err.name === 'ValidationError':
    case Array.isArray(err.errors):
      statusCode = 422; // Unprocessable Entity
      errorResponse.message = 'Validation Error';
      errorResponse.code = 'VALIDATION_ERROR';
      errorResponse.errors = err.errors || err.details;
      break;
      
    // 未找到资源
    case err.name === 'NotFoundError':
    case err.code === 'ENOENT':
      statusCode = 404;
      errorResponse.code = 'NOT_FOUND';
      break;
      
    // 认证错误
    case err.name === 'JsonWebTokenError':
    case err.name === 'TokenExpiredError':
    case err.name === 'UnauthorizedError':
      statusCode = 401;
      errorResponse.code = 'UNAUTHORIZED';
      errorResponse.message = err.message || 'Authentication failed';
      break;
      
    // 禁止访问
    case err.name === 'ForbiddenError':
      statusCode = 403;
      errorResponse.code = 'FORBIDDEN';
      errorResponse.message = err.message || 'Forbidden';
      break;
      
    // 数据库错误
    case err.name === 'MongoError':
    case err.name === 'SequelizeDatabaseError':
      statusCode = 500;
      errorResponse.code = 'DATABASE_ERROR';
      errorResponse.message = 'Database operation failed';
      break;
      
    // 请求超时
    case err.code === 'ETIMEDOUT':
      statusCode = 504;
      errorResponse.code = 'TIMEOUT';
      errorResponse.message = 'Request timeout';
      break;
      
  }

  // 发送错误响应
  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;