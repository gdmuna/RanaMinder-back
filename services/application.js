const { Application,User , Result, sequelize } = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 申请表服务
 * @module services/application
 * @requires models/Application
 * @requires utils/AppError
 * @returns {Promise<Object>} 返回申请表数据
 */

exports. getAllApplications = async (req) => {

    const query = req.query || {};
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;


    const condition = {
        order: [['createdAt', 'DESC']],
        offset,
        limit: pageSize,
    };

    const { count, rows }  = await Application.findAndCountAll(condition);

    const totalPages = Math.ceil(count / pageSize);
    const applications = rows;

    if (!applications || applications.length === 0) {
      throw new AppError('没有查询到申请表',401, 'NO_APPLICATION');
    }

    return {
        pagination: {
            currentPage,             // 当前页
            pageSize,                // 每页记录数
            totalRecords: count,     // 总记录数
            totalPages,              // 总页数   
        },
        applications
    };
}

exports.creatNewApplication = async (data, stu_id) => {

    const user_id = await User.findOne({
        where: { stu_id: stu_id },
        attributes: ['id'],
    }).then(user => user ? user.id : null);
    if (!user_id) {
        throw new AppError('用户不存在', 404,'USER_NOT_FOUND');
    }

     data.user_id = user_id;
     data.stu_id = stu_id;

    return await sequelize.transaction(async (t) => {
        const existingApplication = await Application.findOne({
            where: {
                user_id,
                campaign_id: data.campaign_id,
            },
            transaction: t
        });

        if (existingApplication) {
            throw new AppError('你已提交过该活动的申请表',409, 'APPLICATION_EXISTS');
        }

        const newApplication = await Application.create(data, { transaction: t });
        if (!newApplication) {
            throw new AppError('申请表创建失败',500, 'APPLICATION_CREATION_FAILED');
        }

        await newApplication.createResult({
            application_id: newApplication.id,
            campaign_id: newApplication.campaign_id,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        }, { transaction: t });

        return newApplication;
    });
}