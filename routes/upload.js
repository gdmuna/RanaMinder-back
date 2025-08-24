const uploadController = require('../controllers/upload');
const upload = require('../middlewares/multer');
const express = require('express');
const router = express.Router();

/**
 * @description 文件上传路由
 * @module routes/upload
 * 获取预签名URL
 */

// 上传文件
router.post('/file' ,upload.single('file'),uploadController.uploadFile);
// 上传封面
router.post('/picture', upload.single('file'), uploadController.uploadPicture);

module.exports = router;