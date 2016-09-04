'use strict';
const Faye = require('faye');
const request = require('request');

const constants = require('./constants');
const utils = require('./utils');
const api = require('./api');

const joker = require('./services/jokeService');
const howdoi = require('./services/howdoiService');
const deployer = require('./services/deployService');

const DEPLOY_FLAG = process.env.DEPLOY || false;

// Authentication extension
let ClientAuthExt = function() {};

const replyToUser = (user, message) => {
  const displayName = user.displayName;
  const username = user.username;

  if (message.startsWith(constants.BOT_MENTION_NAME)) {
    const parsedMessage = message.slice(constants.BOT_MENTION_NAME.length + 1);
    console.log(parsedMessage);
    const startsWithString = utils.getStartsWith(parsedMessage);

    if (startsWithString === constants.BOT_ACTIONS.HELP) {
      api.postBotReply(utils.generateBotHelp(), username);
    }

    if (startsWithString === constants.BOT_ACTIONS.JOKE) {
      joker.getJoke(api.postBotReply, username);
    }

    if (startsWithString === constants.BOT_ACTIONS.DEPLOY) {
      deployer.deployToProd();
    }

    if (startsWithString === constants.BOT_ACTIONS.HOWDOI) {
      const query = encodeURIComponent(parsedMessage.slice(7));
      howdoi.getHowdoiResult(api.postBotReply, query);
    }
  }
};

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
        api.postBotReply("Deployment Successful");
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

    replyToUser(msg.model.fromUser, msg.model.text);
  }
};

client.subscribe(`/api${constants.CHATROOM_SUFFIX_URL}`, messageHandler, {});
