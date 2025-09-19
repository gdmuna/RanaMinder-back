const classworkService = require('../services/classwork');
const AppError = require('../utils/AppError');

/**
 * @description 根据学号数组查询姓名
 * @param {string[]} titles 学号数组
 * @returns {Promise<void>}
 */
exports.getUserNamesByTitles = async (req, res, next) => {
	try {
		const { titles } = req.body;
		const data = await classworkService.getUserNamesByTitles(titles);
		res.json({ data });
	} catch (error) {
		next(error);
	}
}
