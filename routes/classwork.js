const express = require('express');
const router = express.Router();
const classworkController = require('../controllers/classwork');

// POST /classwork/user-names
router.post('/names', classworkController.getUserNamesByTitles);

module.exports = router;
