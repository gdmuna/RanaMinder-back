const seesionController = require('../controllers/session.js');
const express = require('express');
const router = express.Router();

//查询面试节点
router.get('/:stage_id', seesionController.getAllSeesions);
//创建面试节点
router.post('/', seesionController.createNewSeesion);
// //更新面试节点
router.put('/:id', seesionController.updateSeesion);
// //删除面试节点
router.delete('/:id', seesionController.deleteSeesion);

module.exports = router;