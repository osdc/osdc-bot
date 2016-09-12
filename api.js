'use strict';
const request = require('request');
const constants = require('./constants');
const TEST_FLAG = process.env.TEST;

const postBotReply = (message, username, test) => {
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

module.exports = {
  postBotReply
};
