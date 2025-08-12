var express = require('express');
var router = express.Router();

const applicationRouter = require('./application');
const campaignRouter = require('./campaign');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/application', applicationRouter);
router.use('/campaign', campaignRouter);
module.exports = router;
