var express = require('express');
var router = express.Router();

const applicationRouter = require('./application');
const campaignRouter = require('./campaign');
const stageRouter = require('./stage');
const seesionRouter = require('./seesion');
const time_slotRouter = require('./time_slot');
const authRouter = require('./auth');


router.use('/auth', authRouter);
router.use('/application', applicationRouter);
router.use('/campaign', campaignRouter);
router.use('/stage', stageRouter);
router.use('/seesion', seesionRouter);
router.use('/time_slot', time_slotRouter);

module.exports = router;
