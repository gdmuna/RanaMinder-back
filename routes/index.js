var express = require('express');
var router = express.Router();

const applicationRouter = require('./application');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/application', applicationRouter);
module.exports = router;
