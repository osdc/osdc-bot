'use strict';
const request = require('request');
const constants = require('./constants');
const TEST_FLAG = process.env.TEST;

const postBotReply = (message, username) => {
  const text = username ? `@${username} ${message}` : message;
  if (TEST_FLAG) {
    console.log(text);
  } else {
    request({
      url: constants.CHATROOM_URL,
      headers: {
        Authorization : `Bearer ${constants.TOKEN}`
      },
      method: 'POST',
      json: true,
      body: {
        text
      }
    });
  }
};

const getParsedMessage = (query, getBotReply, username, parsedMessage) => {
  console.log(query);
   request({
        url: constants.SERVER_MESSAGE_PARSER_PREFIX_URL + query,
        method: 'GET'
      }, (error, response, body) => {
        console.log(error, body, response);
        getBotReply(username, body, parsedMessage);
      });
};

module.exports = {
  postBotReply,
  getParsedMessage
};
