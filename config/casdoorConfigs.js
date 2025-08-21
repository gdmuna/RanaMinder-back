const { SDK } = require('casdoor-nodejs-sdk');
const fs = require('fs');
require('dotenv').config();
const { CASDOOR_ENDPOINT, CASDOOR_CLIENT_ID, CASDOOR_CLIENTSECRET, CASDOOR_ORGNAME, CASDOOR_APPNAME } = process.env;
//读取casdoor证书
const certificate = fs.readFileSync('casdoorCertificate/cert.pem', 'utf8');

const casdoorConfig={
  endpoint: CASDOOR_ENDPOINT,
  clientId: CASDOOR_CLIENT_ID,
  clientSecret: CASDOOR_CLIENTSECRET,
  certificate: certificate,
  organizationName: CASDOOR_ORGNAME,
  applicationName: CASDOOR_APPNAME,

};

const casdoor = new SDK(casdoorConfig);

module.exports = casdoor;