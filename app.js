const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


// 自定义中间件
const errorHandlerMiddleware = require('./middlewares/errorHandle');
const successResponse = require('./middlewares/successResponse');
const apiProtected = require('./middlewares/apiProtected');


const app = express();

// 成功响应中间件
app.use(successResponse);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



const router = require('./routes/index');
// 鉴权中间件
app.use(apiProtected);
// 接口路由
app.use('/api', router);
// 错误处理中间件
app.use(errorHandlerMiddleware);



module.exports = app;
