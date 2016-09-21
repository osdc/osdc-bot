'use strict';
/* eslint-disable no-console */
const Faye = require('faye');
const request = require('request');

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
const define = require('./services/defineService.js');

const DEPLOY_FLAG = process.env.DEPLOY || false;

// Main function which handles the user input and decides what needs to be done.
const replyToUser = (user, message) => {
    const username = user.username;
    const parsedMessage = message.slice(constants.BOT_MENTION_NAME.length + 1);
    if (message.startsWith(constants.BOT_MENTION_NAME)) {
    var query = encodeURIComponent(parsedMessage);
    console.log(query);
      request({
        url: constants.SERVER_GENERAL_URL + query,
        method: "GET"
      }, (error, response, body) => {
        console.log(body);
        callSpecificService(username,body);
      });
    
};

const callSpecificService = (username,message) => {
   const startsWithString = utils.getStartsWith(message);
   const cityName = message.substr(message.indexOf(' ') + 1);
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
        api.postBotReply,
        encodeURIComponent(
          message.slice(constants.BOT_ACTIONS.HOWDOI.length + 1)));
    } else if (startsWithString === constants.BOT_ACTIONS.WIKI) {
      wiki(
        api.postBotReply,
        username,
        message.slice(constants.BOT_ACTIONS.WIKI.length + 1));
    } else if (startsWithString === constants.BOT_ACTIONS.WEATHER) {
      weather.getWeather(api.postBotReply, username, cityName);
    } else if (startsWithString === constants.BOT_ACTIONS.PLACES) {
      places.getPlaces(api.postBotReply, username, cityName);
    } else if (startsWithString === constants.BOT_ACTIONS.DEFINE) {
      define.define(api.postBotReply, username, cityName);
    }
    else{
      api.postBotReply(message,username)
    }
  }
}

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
