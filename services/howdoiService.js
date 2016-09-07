'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getHowdoiResult: (callback, query) => {
    request({
      url: constants.SERVER_HOWDOI_PREFIX_URL + query,
      method: "GET"
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(body);
      }
    });
  }
};
