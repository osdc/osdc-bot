'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getQuote: (callback, username) => {
    request(constants.QUOTES_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return (
          callback(
            JSON.parse(body)[0].content.replace(/<\/?p>/g, ''), username));
      }
    });
  }
};
