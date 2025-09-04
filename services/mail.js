const { transporter } = require("../config/mailConfig");
const { User, Result, Application, Campaign } = require("../models");
const fs = require("fs");
const path = require("path");
const { renderHtmlTemplate } = require("../utils/templateRenderer");


/**
 * @description 邮件服务
 * @module services/mail
 * @requires config/nodemailer
 * @returns {Promise<Object>} 返回邮件发送结果
 */

// 发送测试邮件
exports.sendTestEmail = async (to) => {
    const mailOptions = {
        from: `"系统通知" <${process.env.MAIL_USER}>`, // 发件人
        to: to,
        subject: "测试邮件",
        text: "这是一封测试邮件，请勿回复！",
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    return info;
};

// 发送结果邮件
/**
 * 通过 resultId 查询 application 并发送邮件
 * @param {number|string} resultId
 * @param {string} subject 邮件主题
 * @param {string} content 邮件正文
 */
exports.sendResultMail = async (resultId, subject) => {
    console.log("发送结果邮件，resultId:", resultId, "subject:", subject);
    // 支持单个或多个 id
    const ids = Array.isArray(resultId) ? resultId : [resultId];
    const results = [];

    for (const resultId of ids) {
        // 查询 result 及其关联的 application
        const result = await Result.findByPk(resultId, {
            include: [
                {
                    model: Application,
                    as: "application",
                },
            ],
        });
        if (!result || !result.application) {
            results.push({ resultId, success: false, error: "未找到对应的申请记录" });
            continue;
        }

        const { email, name: username } = result.application.information;

        // 组织 association/department/role 字符串
        const associationStr = Array.isArray(result.association)
            ? result.association.map(item => item.label || item).join(' ')
            : (result.association || '');
        const departmentStr = Array.isArray(result.department)
            ? result.department.map(item => item.label || item).join(' ')
            : (result.department || '');
        const roleStr = Array.isArray(result.role)
            ? result.role.map(item => item.label || item).join(' ')
            : (result.role || '');

        // 查询 campaign 名称
        let campaignName = '';
        if (result.campaign_id) {
            const campaign = await Campaign.findByPk(result.campaign_id);
            campaignName = campaign ? campaign.title : '';
        }

        // 根据状态选择模板
        let templateFile;
        if (result.status === 'approved') {
            templateFile = path.join(__dirname, '../approvedEmail.html');
        } else if (result.status === 'rejected') {
            templateFile = path.join(__dirname, '../rejectedEmail.html');
        } else if (result.status === 'pending') {
            results.push({ resultId, success: false, error: "结果状态为待定，无法发送邮件" });
            continue;
        } else {
            results.push({ resultId, success: false, error: "未知的结果状态，无法发送邮件" });
            continue;
        }

        // 渲染模板
        const html = renderHtmlTemplate(
            templateFile,
            {
                username,
                campaignName,
                association: associationStr,
                department: departmentStr,
                role: roleStr
            }
        );

        const mailOptions = {
            from: `"系统通知" <${process.env.MAIL_USER}>`,
            to: email,
            subject,
            html
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            results.push({ resultId, success: true, info });
        } catch (error) {
            results.push({ resultId, success: false, error: error.message });
        }
    }

    return results;
};