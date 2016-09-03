'use strict';
const config = require('../config');
const postOnChat = require('../services/postOnChat');

const ROOM_ID  = config.roomId;
const TOKEN   = config.token;

const DEPLOY_FLAG = process.env.DEPLOY || false;

const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';

class ClientAuthExt {
  outgoing(message, callback) {
    if (message.channel === META_HANDSHAKE_SUFFIX_URL) {
      if (!message.ext) { message.ext = {}; }
      message.ext.token = TOKEN;
    }
    callback(message);
  }

  incoming(message, callback) {
    if (message.channel === META_HANDSHAKE_SUFFIX_URL) {
      if(message.successful) {
        console.log('Successfuly subscribed to room: ', ROOM_ID);
        if (DEPLOY_FLAG) {
          postOnChat.send("Deployment Successful");
        }
      } else {
        console.log('Something went wrong: ', message.error);
      }
      callback(message);
    }
  }
}

module.exports = {
  ClientAuthExt: () => {
    return new ClientAuthExt();
  }
};

