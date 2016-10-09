'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getJoke: (callback, username) => {
    const index = Math.floor(Math.random() * constants.JOKES_API_INFO.length);
    const randomJokeObject = constants.JOKES_API_INFO[index];
    request(randomJokeObject.url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(randomJokeObject.getJokeText(body), username);
      }
    });
  }
};
