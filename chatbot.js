'use strict';
const Faye = require('faye');
const request = require('request');

const config = require('./config');
const clientAuthExt = require('./classes/clientAuthExt');
const joker = require('./services/jokeService');
const postOnChat = require('./services/postOnChat');
const utils = require('./utils');

const ROOM_ID  = config.roomId;

const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const SERVER_PREFIX_URL = "http://127.0.0.1:5000";
const SERVER_DEPLOY_URL = `${SERVER_PREFIX_URL}/deploy`;
const SERVER_HOWDOI_PREFIX_URL = `${SERVER_PREFIX_URL}/howdoi?query=`;
const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;

const BOT_MENTION_NAME = "@osdc-bot";
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  HOWDOI: 'howdoi'
};

function reply_to_user(user, message) {
  const displayName = user.displayName;
  const username = user.username;

  if (message.startsWith(BOT_MENTION_NAME)) {
    const parsedMessage = message.slice(BOT_MENTION_NAME.length + 1);
    console.log(parsedMessage);
    const startsWithString = utils.getStartsWith(parsedMessage);
    if (startsWithString === BOT_ACTIONS.HELP) {
      postOnChat.send(utils.getBotHelp(), username);
    }

    if (startsWithString === BOT_ACTIONS.JOKE) {
      joker.getJoke(postOnChat.send, username);
    }

    if (startsWithString === BOT_ACTIONS.DEPLOY) {
      request({
        url: SERVER_DEPLOY_URL,
        method: "GET"
      }, (error, response, body) => {
        console.log(response);
      });
    }

    if (startsWithString === BOT_ACTIONS.HOWDOI) {
      var query = encodeURIComponent(parsedMessage.slice(7, parsedMessage.length));
      console.log(query);
      request({
        url: SERVER_HOWDOI_PREFIX_URL + query,
        method: "GET"
      }, (error, response, body) => {
        console.log(body);
        postOnChat.send(body);
      });
    }
  }
}

// Faye client
const client = new Faye.Client(FAYE_CLIENT_URL, {
  timeout: 60,
  retry: 5,
  interval: 1
});

// A dummy handler to echo incoming messages
const messageHandler = (msg) => {
  if (msg.model && msg.model.fromUser) {
    console.log("Message: ", msg.model.text);
    console.log("From: ", msg.model.fromUser.displayName);

    reply_to_user(msg.model.fromUser, msg.model.text);
  }
};

// Add Client Authentication extension
client.addExtension(clientAuthExt.ClientAuthExt());
client.subscribe(`/api${CHATROOM_SUFFIX_URL}`, messageHandler, {});

