'use strict';
const config = require('./config');

const ROOM_ID  = config.roomId;
const TOKEN   = config.token;

const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';
const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const SERVER_PREFIX_URL = "http://127.0.0.1:5000";
const SERVER_DEPLOY_URL = `${SERVER_PREFIX_URL}/deploy`;
const SERVER_HOWDOI_PREFIX_URL = `${SERVER_PREFIX_URL}/howdoi?query=`;
const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;
const CHATROOM_URL = `https://api.gitter.im${CHATROOM_SUFFIX_URL}`;
const JOKES_API_URL = 'http://api.icndb.com/jokes/random';

const BOT_MENTION_NAME = "@osdc-bot";
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  HOWDOI: 'howdoi'
};

module.exports = {
  META_HANDSHAKE_SUFFIX_URL,
  FAYE_CLIENT_URL,
  SERVER_PREFIX_URL,
  SERVER_DEPLOY_URL,
  SERVER_HOWDOI_PREFIX_URL,
  CHATROOM_SUFFIX_URL,
  CHATROOM_URL,
  JOKES_API_URL,
  BOT_MENTION_NAME,
  BOT_ACTIONS,
  ROOM_ID,
  TOKEN
};
