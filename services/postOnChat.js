'use strict';
const request = require('request');

const config = require('../config');
const TOKEN   = config.token;
const ROOM_ID  = config.roomId;

const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;
const CHATROOM_URL = `https://api.gitter.im${CHATROOM_SUFFIX_URL}`;


const _postOnChat = (message) => {
  request({
    url: CHATROOM_URL,
    headers: {
      Authorization : `Bearer ${TOKEN}`
    },
    method: "POST",
    json: true,
    body: {
      text: message
    }
  }, (error, response, body) => {
    console.log(response);
  });
};

module.exports = {
  send: (message, username) => {
    _postOnChat(username ? `@${username} ${message}` : message);
  }
};

