const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { OSS_BUCKET, OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_ENDPOINT } = process.env;


const s3Client = new S3Client({
    region: OSS_REGION,
    credentials: {
        accessKeyId: OSS_ACCESS_KEY_ID,
        secretAccessKey: OSS_ACCESS_KEY_SECRET,
    },
    endpoint: OSS_ENDPOINT,
    forcePathStyle: true,
});

module.exports = {
    s3Client,
    getSignedUrl,
    bucket: OSS_BUCKET,
    PutObjectCommand
};