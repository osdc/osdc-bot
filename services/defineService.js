'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  define: (callback, username, term) => {
    console.log(`${constants.DEFINE_API_URL}?term=${term}`);
    request({
      url: `${constants.DEFINE_API_URL}?term=${term}`,
      headers: {
        "X-Mashape-Key": constants.DEFINE_API_KEY
      },
      method: "GET"
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(response.data);
        let message = "\n";
        const body = JSON.parse(body);
        body.list.forEach(function(listItem) {
          message += `* ${listItem.definition}\n by *${listItem.author}*  `
          message += `:thumbsup: ${listItem.thumbs_up.toString()} :thumbsdown: ${listItem.thumbs_down.toString()}\n`;
        });
        return callback(message, username);
      }
    });
  }
};

