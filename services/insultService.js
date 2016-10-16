'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  insult: (callback, username) => {
    request(constants.INSULTS_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(JSON.parse(body).insult, username);
      }
    });
  }
};
