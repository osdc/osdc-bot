'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getJoke: (callback, username) => {
    const index = Math.floor(Math.random() * constants.JOKES_API_URL.length);
    const randomQuote =  constants.JOKES_API_URL[index];
    request(randomQuote, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (index === 0) {
          return callback(JSON.parse(body).value.joke, username);
        } else {
          return callback(JSON.parse(body).joke, username);      
        }
      }
    });
  }
};
