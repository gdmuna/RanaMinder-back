const { User } = require('../models');

/**
 * @description 根据学号数组查询姓名
 * @param {string[]} titles 学号数组
 * @returns {Promise<string[]>}
 */
exports.getUserNamesByTitles = async (titles) => {
	if (titles.length === 0) return [];
	const users = await User.findAll({
		where: { stu_id: titles },
		attributes: ['stu_id', 'name']
	});
	const map = new Map(users.map(u => [u.stu_id, u.name]));
	return titles.map(stu_id => map.get(stu_id) || null);
}