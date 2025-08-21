const uploadService = require('../services/upload');



exports.uploadFile = async (req, res, next) => {
    try {
        const file = req.file; // 使用 multer 中间件处理上传的文件
        const type = req.body.type; // 获取上传类型
        const result = await uploadService.uploadFile(file, type);
        res.success(result, '上传成功', 'UPLOAD_SUCCESS');
    } catch (error) {
        next(error);
    }
};

exports.uploadCover = async (req, res, next) => {
    try {
        const file = req.file; // 使用 multer 中间件处理上传的文件
        const type = req.body.type; // 获取上传类型
        const result = await uploadService.uploadCover(file, type);
        res.success(result, '封面上传成功', 'COVER_UPLOAD_SUCCESS');
    } catch (error) {
        next(error);
    }
}