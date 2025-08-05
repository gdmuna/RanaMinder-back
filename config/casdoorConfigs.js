const { SDK } = require('casdoor-nodejs-sdk');
const fs = require('fs');
require('dotenv').config();

//读取casdoor证书
const certificate = fs.readFileSync('casdoorCertificate/cert.pem', 'utf8');

const casdoorConfig={
  endpoint: process.env.CASDOOR_ENDPOINT,
  clientId: process.env.CASDOOR_CLIENT_ID,
  clientSecret: process.env.CASDOOR_CLIENTSECRET,
  certificate: certificate,
  organizationName: process.env.CASDOOR_ORGNAME,
  applicationName: process.env.CASDOOR_APPNAME,

};

const casdoor = new SDK(casdoorConfig);

module.exports = casdoor;