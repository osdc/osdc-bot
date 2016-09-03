'use strict';
const Faye = require('faye');
const request = require('request');

const constants = require('./constants');
const joker = require('./services/jokeService.js');

const DEPLOY_FLAG = process.env.DEPLOY || false;

// Authentication extension
let ClientAuthExt = function() {};

ClientAuthExt.prototype.outgoing = (message, callback) => {
  if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
    if (!message.ext) { message.ext = {}; }
    message.ext.token = constants.TOKEN;
  }
  callback(message);
};

ClientAuthExt.prototype.incoming = (message, callback) => {
  if(message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
    if(message.successful) {
      console.log('Successfuly subscribed to room: ', constants.ROOM_ID);
      if (DEPLOY_FLAG) {
        send("Deployment Successful");
      }
    } else {
      console.log('Something went wrong: ', message.error);
    }
  }
  callback(message);
};

// Faye client
const client = new Faye.Client(constants.FAYE_CLIENT_URL, {
  timeout: 60,
  retry: 5,
  interval: 1
});

// Add Client Authentication extension
client.addExtension(new ClientAuthExt());

// A dummy handler to echo incoming messages
const messageHandler = (msg) => {
  if (msg.model && msg.model.fromUser) {
    console.log("Message: ", msg.model.text);
    console.log("From: ", msg.model.fromUser.displayName);

    reply_to_user(msg.model.fromUser, msg.model.text);
  }
};

function _getStartsWith(parsedMessage) {
  let result = null;
  if (!parsedMessage) {
    return result;
  }
  for (let botAction in constants.BOT_ACTIONS) {
    if (parsedMessage.startsWith(constants.BOT_ACTIONS[botAction])) {
      result = constants.BOT_ACTIONS[botAction];
      console.log(`[INFO] In loop ${result}`);
      break;
    }
  }
  return result;
}

function _getBotHelp() {
  let resultString = "You can:";
  for (let botAction in constants.BOT_ACTIONS) {
    resultString += `\n- ${constants.BOT_ACTIONS[botAction]}`;
  }
  return resultString;
}

function reply_to_user(user, message) {
  const displayName = user.displayName;
  const username = user.username;

  if (message.startsWith(constants.BOT_MENTION_NAME)) {
    const parsedMessage = message.slice(constants.BOT_MENTION_NAME.length + 1);
    console.log(parsedMessage);
    const startsWithString = _getStartsWith(parsedMessage);
    if (startsWithString === constants.BOT_ACTIONS.HELP) {
      send(_getBotHelp(), username);
    }

    if (startsWithString === constants.BOT_ACTIONS.JOKE) {
      joker.getJoke(send, username);
    }

    if (startsWithString === constants.BOT_ACTIONS.DEPLOY) {
      request({
        url: constants.SERVER_DEPLOY_URL,
        method: "GET"
      }, (error, response, body) => {
        console.log(response);
      });
    }

    if (startsWithString === constants.BOT_ACTIONS.HOWDOI) {
      const query = encodeURIComponent(parsedMessage.slice(7, parsedMessage.length));
      request({
        url: constants.SERVER_HOWDOI_PREFIX_URL + query,
        method: "GET"
      }, (error, response, body) => {
        send(body);
      });
    }
  }
}

function _postOnChat(message) {
  request({
    url: constants.CHATROOM_URL,
    headers: {
      Authorization : `Bearer ${constants.TOKEN}`
    },
    method: "POST",
    json: true,
    body: {
      text: message
    }
  }, (error, response, body) => {
    console.log(response);
  });
}

function send(message, username) {
  _postOnChat(username ? `@${username} ${message}` : message);
}

client.subscribe(`/api${constants.CHATROOM_SUFFIX_URL}`, messageHandler, {});

module.exports = {
  getStartsWith: _getStartsWith,
  getBotActions: () => (constants.BOT_ACTIONS)
};
