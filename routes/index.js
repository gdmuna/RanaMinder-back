var express = require('express');
var router = express.Router();

const applicationRouter = require('./application');


router.use('/application', applicationRouter);
module.exports = router;
