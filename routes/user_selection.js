const user_selectionController = require('../controllers/user_selection.js');
const express = require('express');
const router = express.Router();

// 获取用户选择
router.get('/', user_selectionController.getUserSelections);
// 获取当前用户的选择
router.get('/me', user_selectionController.getCurrentUserSelection);
// 新建用户选择
router.post('/', user_selectionController.createUserSelection);
// 删除用户选择
router.delete('/:id', user_selectionController.deleteUserSelection);


module.exports = router;