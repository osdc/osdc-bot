'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getJoke: (callback, username) => {
    request(constants.JOKES_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(JSON.parse(body).value.joke, username);
      }
    });
  }
};
