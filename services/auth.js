const casdoorUtils = require('../utils/casdoorUtils');

exports.getLoginUrl = () => {
    return process.env.CASDOOR_ENDPOINT + '/login/oauth/authorize' +
        `?client_id=${process.env.CASDOOR_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${process.env.CASDOOR_REDIRECT_URL}` +
        `&scope=read` +
        `&state=${process.env.CASDOOR_STATE}`;
};