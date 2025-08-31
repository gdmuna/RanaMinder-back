const mailService = require('../services/mail');

// 发送测试邮件
exports.sendTestEmail = async (req, res, next) => {
    try {
        // if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
        //     throw new AppError('您没有权限发送邮件', 403, 'NO_PERMISSION');
        // }
        const { to } = req.body;
        const result = await mailService.sendTestEmail(to);
        res.success(result, '邮件发送成功', 'MAIL_SEND_SUCCESS');
    } catch (error) {
        next(error);
    }
};

// 发送结果邮件
exports.sendResultMail = async (req, res, next) => {
    try {
        // if (!req.user.groups.some(g => g === 'gdmu/ACM-presidency' || g === 'gdmu/NA-presidency')) {
        //     throw new AppError('您没有权限发送邮件', 403, 'NO_PERMISSION');
        // }
        const { resultId, subject, content } = req.body;
        const result = await mailService.sendResultMail(resultId, subject, content);
        res.success(result, '结果邮件发送成功', 'RESULT_MAIL_SEND_SUCCESS');
    } catch (error) {
        next(error);
    }
}