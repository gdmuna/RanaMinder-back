const {Result,User} = require('../models');
const AppError = require('../utils/AppError');

/**
 * @description 结果服务
 * @module services/result
 * @requires models/Result
 * @returns {Promise<Object>} 返回结果数据
 **/

// 获取所有结果
exports.getAllResults = async (req) => {
    const query = req.query || {};
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;
    const condition = {
        order: [['createdAt', 'DESC']],
        offset,
        limit: pageSize,
    };

    if(query.campaign_id) {
        condition.where = { campaign_id: query.campaign_id };
    }
    
    const { count, rows } = await Result.findAndCountAll(condition);
    const totalPages = Math.ceil(count / pageSize);
    const results = rows;
    if (!results || results.length === 0) {
        throw new AppError('没有查询到结果', 404, 'NO_RESULT');
    }
    return {
        pagination: {
            currentPage,             // 当前页 
            pageSize,                // 每页记录数
            totalRecords: count,     // 总记录数
            totalPages,              // 总页数
        },
        results
    };
}

//获取当前用户的结果
exports.getCurrentUserResults = async (req) => {
    const user = await User.findOne({
            where: { stu_id: req.user.name },
            attributes: ['id'],
            raw: true
        });

    if (!user) {
        throw new AppError('用户不存在', 404, 'USER_NOT_FOUND');
    }
    console.log(user.id);
    const results = await Result.findAll({
        where: { user_id: user.id },
        order: [['createdAt', 'DESC']],
    });
    if (!results || results.length === 0) {
        throw new AppError('没有查询到结果', 404, 'NO_RESULT');
    }
    return {
        results
    };
}

// 修改结果
exports.updateResult = async (resultId, data) => {
    const { status, association, department, role } = data;
    console .log(data);
    // 检查必填字段
    if (!status) {
        throw new AppError('参数缺失，请检查参数', 400, 'MISSING_REQUIRED_FIELDS');
    }

    // 检查状态是否有效
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
        throw new AppError('无效的状态', 400, 'INVALID_STATUS');
    }

    // 要更新的字段
    const updateFields = { status };
    if (association !== undefined) updateFields.association = association;
    if (department !== undefined) updateFields.department = department;
    if (role !== undefined) updateFields.role = role;

    // 支持批量
    if (Array.isArray(resultId)) {
        // 检查所有 id 是否存在
        const results = await Result.findAll({ where: { id: resultId } });
        if (!results || results.length === 0) {
            throw new AppError('结果不存在', 404, 'RESULT_NOT_FOUND');
        }
        // 批量更新
        await Result.update(updateFields, { where: { id: resultId } });
        // 返回更新后的所有结果
        const updatedResults = await Result.findAll({ where: { id: resultId } });
        return updatedResults;
    } else {
        // 单个
        const result = await Result.findByPk(resultId);
        if (!result) {
            throw new AppError('结果不存在', 404, 'RESULT_NOT_FOUND');
        }
        const updatedResult = await result.update(updateFields);
        return updatedResult;
    }
}