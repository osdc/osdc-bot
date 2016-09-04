'use strict';
const request = require('request');
const constants = require('./constants');

const _postBotReply = (message, username) => {
  request({
    url: constants.CHATROOM_URL,
    headers: {
      Authorization : `Bearer ${constants.TOKEN}`
    },
    method: "POST",
    json: true,
    body: {
      text: (username ? `@${username} ${message}` : message)
    }
  });
};

module.exports = {
  postBotReply: _postBotReply
};
