const user_selectionController = require('../controllers/user_selection.js');
const express = require('express');
const router = express.Router();

// 获取用户选择
router.get('/', user_selectionController.getUserSelections);

module.exports = router;