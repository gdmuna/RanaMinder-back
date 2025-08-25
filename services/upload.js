const { s3Client, bucket, PutObjectCommand } = require('../config/ossConfig');
const uuid = require('uuid').v4;
const AppError = require('../utils/AppError');
const path = require('path');

/**
 * 通用文件上传服务
 * @param {Object} file - multer解析后的文件对象
 * @param {string} type - 文件业务类型
 * @returns {Promise<Object>} 上传结果
 */
exports.uploadFile = async (file, type) => {
    if (!file) {
        throw new AppError('未检测到上传文件', 400, 'NO_FILE');
    }
    if (!type) {
        throw new AppError('缺少type参数', 400, 'MISSING_TYPE');
    }

    const { originalname, mimetype, buffer, size } = file;

    // 获取文件后缀
    const ext = path.extname(originalname) || '';
    // 生成新文件名
    const newFileName = `${uuid()}${ext}`;

    // 类型、大小、路径限制
    let allowedTypes, maxSize, keyPrefix;
    switch (type) {
        case 'course':
            allowedTypes = ['video/mp4', 'video/mov', 'video/avi'];
            maxSize = 1024 * 1024 * 1024; // 1GB
            keyPrefix = 'course/';
            break;
        case 'announcement':
            allowedTypes = ['text/markdown'];
            maxSize = 10 * 1024 * 1024; // 10MB
            keyPrefix = 'announcement/';
            break;
        case 'article':
            allowedTypes = ['text/markdown', 'text/x-markdown', 'application/octet-stream'];
            maxSize = 10 * 1024 * 1024; // 10MB
            keyPrefix = 'article/';
            break;
        default:
            throw new AppError('不支持的上传类型', 400, 'INVALID_TYPE');
    }
    if (!allowedTypes.includes(mimetype)) {
        throw new AppError('文件类型不被允许', 400, 'INVALID_FILE_TYPE');
    }
    if (size > maxSize) {
        throw new AppError(`文件大小不能超过${maxSize / 1024 / 1024}MB`, 400, 'FILE_TOO_LARGE');
    }

    const key = `${keyPrefix}${Date.now()}_${newFileName}`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'public-read'
    });
    await s3Client.send(command);
    const fileUrl = `${process.env.OSS_RETURN_ENDPOINT}/p/${bucket}/${key}`;
    return { url: fileUrl };
};

// 封面上传接口
exports.uploadPicture = async (file, type) => {
    if (!file) {
        throw new AppError('未检测到上传文件', 400, 'NO_FILE');
    }
    if (!type) {
        throw new AppError('缺少type参数', 400, 'MISSING_TYPE');
    }

    const { originalname, mimetype, buffer, size } = file;
    const ext = path.extname(originalname) || '';
    const newFileName = `${uuid()}${ext}`;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    // 根据type判断封面类型
    let keyPrefix;
    switch (type) {
        case 'course':
            keyPrefix = 'course/cover/';
            break;
        case 'article':
            keyPrefix = 'article/cover/';
            break;
        case 'announcement':
            keyPrefix = 'announcement/cover/';
            break;
        case 'photo':
            keyPrefix = 'photo/';
            break;
        case 'avatar':
            keyPrefix = 'avatar/';
            break;
        default:
            throw new AppError('不支持的封面类型', 400, 'INVALID_COVER_TYPE');
    }

    if (!allowedTypes.includes(mimetype)) {
        throw new AppError('封面文件类型不被允许', 400, 'INVALID_FILE_TYPE');
    }
    if (size > maxSize) {
        throw new AppError(`封面文件大小不能超过${maxSize}MB`, 400, 'FILE_TOO_LARGE');
    }

    const key = `${keyPrefix}${Date.now()}_${newFileName}`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'public-read'
    });
    await s3Client.send(command);
    const fileUrl = `${process.env.OSS_RETURN_ENDPOINT}/p/${bucket}/${key}`;
    return { url: fileUrl };
};


