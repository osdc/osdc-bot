'use strict';
/* eslint-disable no-console */
const Faye = require('faye');

const constants = require('./constants');
const utils = require('./utils');
const api = require('./api');

const joker = require('./services/jokeService');
const howdoi = require('./services/howdoiService');
const deployer = require('./services/deployService');
const wiki = require('./services/wikiService');
const weather = require('./services/weatherService');
const places = require('./services/mapService');
const quotation = require('./services/quoteService.js');

const DEPLOY_FLAG = process.env.DEPLOY || false;

// Main function which handles the user input and decides what needs to be done.
const replyToUser = (user, message) => {
  const username = user.username;

  if (message.startsWith(constants.BOT_MENTION_NAME)) {
    const parsedMessage = message.slice(constants.BOT_MENTION_NAME.length + 1);
    const startsWithString = utils.getStartsWith(parsedMessage);
    const cityName = parsedMessage.substr(parsedMessage.indexOf(' ') + 1);

    if (startsWithString === constants.BOT_ACTIONS.HELP) {
      api.postBotReply(utils.generateBotHelp(), username);
    } else if (startsWithString === constants.BOT_ACTIONS.JOKE) {
      joker.getJoke(api.postBotReply, username);
    } else if (startsWithString === constants.BOT_ACTIONS.DEPLOY) {
      deployer.deployToProd();
    } else if (startsWithString === constants.BOT_ACTIONS.QUOTE){
      quotation.getQuote(api.postBotReply, username);
    } else if (startsWithString === constants.BOT_ACTIONS.HOWDOI) {
      howdoi.getHowdoiResult(
        api.postBotReply, encodeURIComponent(parsedMessage.slice(7)));
    } else if (startsWithString === constants.BOT_ACTIONS.WIKI) {
      wiki(
        api.postBotReply, username, parsedMessage.slice(5));
    } else if (startsWithString === constants.BOT_ACTIONS.WEATHER) {
      weather.getWeather(api.postBotReply, username, cityName);
    } else if (startsWithString === constants.BOT_ACTIONS.PLACES) {
      places.getPlaces(api.postBotReply, username, cityName);
    }
  }
};

// Authentication extension
let ClientAuthExt = function() {};

ClientAuthExt.prototype = {
  outgoing: (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (!message.ext) { message.ext = {}; }
      message.ext.token = constants.TOKEN;
    }
    callback(message);
  },
  incoming: (message, callback) => {
    if(message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if(message.successful) {
        console.log('Successfuly subscribed to room: ', constants.ROOM_ID);
        if (DEPLOY_FLAG) {
          api.postBotReply('Deployment Successful');
        }
      } else {
        console.log('Something went wrong: ', message.error);
      }
    }
    callback(message);
  }
};

// Faye client
const client = new Faye.Client(constants.FAYE_CLIENT_URL, {
  timeout: 60,
  retry: 5,
  interval: 1
});

// Add Client Authentication extension
client.addExtension(new ClientAuthExt());
client.subscribe(constants.CLIENT_SUBSCRIBE_URL, (msg) => {
  if (msg.model && msg.model.fromUser) {
    console.log('Message: ', msg.model.text);
    console.log('From: ', msg.model.fromUser.displayName);

    replyToUser(msg.model.fromUser, msg.model.text);
  }
}, {});
