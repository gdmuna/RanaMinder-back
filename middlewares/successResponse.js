function successResponse(req, res, next) {
  res.success = function (data = null, message = '操作成功', code = 'SUCCESS') {
    res.status(200).json({
      success: true,
      data: {
        message,
        code,
        data: data
      }
    });
  };
  next();
}

module.exports = successResponse;