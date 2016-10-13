'use strict';
/* eslint-disable no-console */

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
const karma = require('./services/karmaService.js');

const DEPLOY_FLAG = process.env.DEPLOY;
const TEST_FLAG = process.env.TEST;


const getBotReply = (username, message, parsedMessage) => {
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
  } else if (utils.getStartsWith(parsedMessage) === constants.BOT_ACTIONS.KARMA) {
    const msgBody = parsedMessage.split(' ');
    const karmaUser = msgBody[1];
    if (karmaUser === "all") {
      karma.getKarma(api.postBotReply);
    } else if (msgBody[2] === "++") {
      karma.giveKarma(api.postBotReply, karmaUser, 1);
    } else if (msgBody[2] === "--") {
      karma.giveKarma(api.postBotReply, karmaUser, -1);
    }
  } else {
    api.postBotReply(message, username);
  }
};

// Main function which handles the user input and decides what needs to be done.
const replyToUser = (user, message) => {
  const username = user.username;
  const parsedMessage = message.slice(constants.BOT_MENTION_NAME.length + 1);
  if (message.startsWith(constants.BOT_MENTION_NAME)) {
    const query = encodeURIComponent(parsedMessage);
    api.getParsedMessage(query, getBotReply, username, parsedMessage);
  }
};

const getClientAuthExt = () => {
  const incoming = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (message.successful) {
        console.log('Successfuly subscribed to room: ', constants.ROOM_ID);
        if (DEPLOY_FLAG) {
          api.postBotReply('Deployment Successful');
        }
      } else {
        console.log('Something went wrong: ', message.error);
      }
    }
    callback(message);
  };

  const outgoing = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (!message.ext) { message.ext = {}; }
      message.ext.token = constants.TOKEN;
    }
    callback(message);
  };

  return {
    outgoing,
    incoming
  };
};

if (TEST_FLAG) {
  // Run like an REPL for local testing.
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  const readFromStdin = () => {
    console.log(
      'Server running successfully. Type "@osdc-bot help" to get started..');
    rl.on('line', (line) => {
      replyToUser('testUser', line);
    });
  };
  readFromStdin();
} else {
  // Faye client
  const Faye = require('faye');
  const client = new Faye.Client(constants.FAYE_CLIENT_URL, {
    timeout: 60,
    retry: 5,
    interval: 1
  });
  // Create and add the Client Authentication extension.

  client.addExtension(getClientAuthExt());
  client.subscribe(constants.CLIENT_SUBSCRIBE_URL, (msg) => {
    if (msg.model && msg.model.fromUser) {
      console.log('Message: ', msg.model.text);
      console.log('From: ', msg.model.fromUser.displayName);

      replyToUser(msg.model.fromUser, msg.model.text);
    }
  }, {});
}
