const sessionController = require('../controllers/session.js');
const express = require('express');
const router = express.Router();

//查询面试节点
router.get('/:stage_id', sessionController.getAllSessions);
//创建面试节点
router.post('/', sessionController.createNewSession);
// //更新面试节点
router.put('/:id', sessionController.updateSession);
// //删除面试节点
router.delete('/:id', sessionController.deleteSession);

module.exports = router;