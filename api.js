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

const message_parse = (query) => {
   request({
        url: constants.SERVER_MESSAGE_PARSER_URL + query,
        method: 'GET'
      }, (error, response, body) => {
        console.log(body + error + response);
        return body;
      });   
};

module.exports = {
  postBotReply,
  message_parse
};
