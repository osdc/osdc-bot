'use strict';
const config = require('./config');

const ROOM_ID  = config.roomId;
const TOKEN   = config.token;

const BOT_MENTION_NAME = "@osdc-bot";
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  QUOTE: 'quote',
  HOWDOI: 'howdoi',
  WIKI: 'wiki',
  WEATHER: 'weather',
  PLACES: 'locate'
};

const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';
const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;
const CLIENT_SUBSCRIBE_URL = `/api${CHATROOM_SUFFIX_URL}`;
const CHATROOM_URL = `https://api.gitter.im${CHATROOM_SUFFIX_URL}`;
const SERVER_PREFIX_URL = "http://127.0.0.1:5000";
const SERVER_DEPLOY_URL = `${SERVER_PREFIX_URL}/deploy`;
const SERVER_HOWDOI_PREFIX_URL = `${SERVER_PREFIX_URL}/howdoi?query=`;
const JOKES_API_URL =[ 'http://api.icndb.com/jokes/random','http://tambal.azurewebsites.net/joke/random'];

module.exports = {
  BOT_MENTION_NAME,
  BOT_ACTIONS,
  ROOM_ID,
  TOKEN,
  META_HANDSHAKE_SUFFIX_URL,
  FAYE_CLIENT_URL,
  CHATROOM_SUFFIX_URL,
  CLIENT_SUBSCRIBE_URL,
  CHATROOM_URL,
  SERVER_PREFIX_URL,
  SERVER_DEPLOY_URL,
  SERVER_HOWDOI_PREFIX_URL,
  JOKES_API_URL
};
