const multer = require('multer');

// 使用内存存储，最大文件限制1GB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 1024 } // 1GB
});

module.exports = upload;