var express = require('express');
var router = express.Router();

const applicationRouter = require('./application');
const campaignRouter = require('./campaign');
const stageRouter = require('./stage');
const sessionRouter = require('./session');
const time_slotRouter = require('./time_slot');
const user_selectionRouter = require('./user_selection');
const resultRouter = require('./result');
const uploadRouter = require('./upload');
const mailRouter = require('./mail'); 
const authRouter = require('./auth');


router.use('/auth', authRouter);
router.use('/application', applicationRouter);
router.use('/campaign', campaignRouter);
router.use('/stage', stageRouter);
router.use('/session', sessionRouter);
router.use('/time_slot', time_slotRouter);
router.use('/user_selection', user_selectionRouter);
router.use('/result', resultRouter);
router.use('/upload', uploadRouter);
router.use('/mail', mailRouter);

module.exports = router;
