const upload = require('../middlewares/multer');
const { Application, User, Campaign, Result, sequelize } = require('../models');
const { uploadPicture } = require('../services/upload');
const AppError = require('../utils/AppError');
const { Op } = require('sequelize');

/**
 * @description 申请表服务
 * @module services/application
 * @requires models/Application
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回申请表数据
 */

//获取所有申请表，支持分页和多条件查询
exports.getAllApplications = async (req) => {
    const query = req.query || {};
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    const condition = {
        order: [['createdAt', 'DESC']],
        offset,
        limit: pageSize,
        where: {}
    };

    // 先收集基本查询条件
    ['id', 'user_id', 'campaign_id', 'stu_id'].forEach(field => {
        if (query[field]) {
            condition.where[field] = query[field];
        }
    });

    // 增加 information 字段的模糊查询
    let keyword = query.infoKeyword;
    if (keyword) {
        // 使用 Op.and 组合条件
        condition.where = {
            ...condition.where,
            [Op.and]: [
                sequelize.where(
                    sequelize.fn('LOWER', sequelize.cast(sequelize.col('information'), 'CHAR')),
                    { [Op.like]: `%${keyword.toLowerCase()}%` }
                )
            ]
        };
    }

    const { count, rows } = await Application.findAndCountAll(condition);

    const totalPages = Math.ceil(count / pageSize);
    const applications = rows;

    if (!applications || applications.length === 0) {
        throw new AppError('没有查询到申请表', 404, 'APPLICATION_NOT_FOUND');
    }

    return {
        pagination: {
            currentPage,
            pageSize,
            totalRecords: count,
            totalPages,
        },
        applications
    };
}

//创建新的申请表
exports.creatNewApplication = async (data, stu_id, file) => {
    // 保证 information 是对象
    if (typeof data.information === 'string') {
        try {
            data.information = JSON.parse(data.information);
        } catch (err) {
            throw new AppError('information 字段格式错误，必须是有效的 JSON 字符串', 400, 'INVALID_INFORMATION_FORMAT');
        }
    }
    if (!data.information) {
        data.information = {};
    }

    const user_id = await User.findOne({
        where: { stu_id: stu_id },
        attributes: ['id'],
    }).then(user => user ? user.id : null);
    if (!user_id) {
        throw new AppError('用户不存在', 404, 'USER_NOT_FOUND');
    }

    // 检查面试是否存在
    const campaign = await Campaign.findByPk(data.campaign_id);
    if (!campaign) {
        throw new AppError('面试不存在', 404, 'CAMPAIGN_NOT_FOUND');
    }
    if (campaign.is_active === false) {
        throw new AppError('该面试尚未开始报名', 403, 'CAMPAIGN_NOT_STARTED');
    }

    data.user_id = user_id;
    data.stu_id = stu_id;

    // 上传照片
    if (file) {
        const type = 'photo';
        const photoUrl = await uploadPicture(file, type);
        data.information.photo = photoUrl.url;
    }

    return await sequelize.transaction(async (t) => {
        const existingApplication = await Application.findOne({
            where: {
                user_id,
                campaign_id: data.campaign_id,
            },
            transaction: t
        });

        if (existingApplication) {
            throw new AppError('你已提交过该面试的申请表', 409, 'APPLICATION_EXISTS');
        }

        const newApplication = await Application.create(data, { transaction: t });
        if (!newApplication) {
            throw new AppError('申请表创建失败', 500, 'APPLICATION_CREATION_FAILED');
        }

        await newApplication.createResult({
            user_id: user_id,
            application_id: newApplication.id,
            campaign_id: newApplication.campaign_id,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        }, { transaction: t });

        return { applications: newApplication };
    });
}

//获取当前用户的申请表
exports.getCurrentUserApplications = async (stuId) => {
    const user = await User.findOne({
        where: { stu_id: stuId },
        attributes: ['id'],
        raw: true
    });
    if (!user) {
        throw new AppError('用户不存在', 404, 'USER_NOT_FOUND');
    }
    const applications = await Application.findAll({
        where: { user_id: user.id },
        order: [['createdAt', 'DESC']],
    });
    return { applications };
}

//删除申请表
exports.deleteApplication = async (applicationId, stuId) => {

    const userId = await User.findOne({
        where: { stu_id: stuId },
        attributes: ['id'],
    }).then(user => user ? user.id : null);

    return await sequelize.transaction(async (t) => {
        // 查询申请表并校验归属
        const application = await Application.findByPk(applicationId, { transaction: t });
        if (!application) {
            throw new AppError('申请表不存在', 404, 'APPLICATION_NOT_FOUND');
        }
        if (application.user_id !== userId) {
            throw new AppError('无权限删除该申请表', 403, 'NO_PERMISSION');
        }

        // 删除对应的结果表
        await Result.destroy({
            where: { application_id: applicationId },
            transaction: t
        });

        // 删除申请表
        await application.destroy({ transaction: t });

        return { message: '申请表删除成功' };
    });
}