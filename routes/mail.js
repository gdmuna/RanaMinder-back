const mailController = require('../controllers/mail');
const express = require('express');
const router = express.Router();

// 发送测试邮件
router.post('/send-test-email', mailController.sendTestEmail);
// 发送结果邮件
router.post('/send-result-email', mailController.sendResultMail);

module.exports = router;