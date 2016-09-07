'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  deployToProd: () => {
    request({
      url: constants.SERVER_DEPLOY_URL,
      method: "GET"
    });
  }
};
