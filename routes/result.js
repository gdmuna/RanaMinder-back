const resultController = require('../controllers/result');
const express = require('express');
const router = express.Router();

// 获取所有结果
router.get('/', resultController.getAllResults);
// 获取当前用户的结果
router.get('/me', resultController.getCurrentUserResults);
// 修改结果
router.put('/', resultController.updateResult);

module.exports = router;