'use strict';
const config = require('./config');

const ROOM_ID = config.roomId;
const TOKEN = config.token;

const BOT_MENTION_NAME = '@osdc-bot';
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  QUOTE: 'quote',
  HOWDOI: 'howdoi',
  WIKI: 'wiki',
  WEATHER: 'weather',
  PLACES: 'locate',
  DEFINE: 'define',
  KARMA: 'karma'
};

const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';
const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;
const CLIENT_SUBSCRIBE_URL = `/api${CHATROOM_SUFFIX_URL}`;
const CHATROOM_URL = `https://api.gitter.im${CHATROOM_SUFFIX_URL}`;
const SERVER_PREFIX_URL = 'http://127.0.0.1:5000';
const SERVER_DEPLOY_URL = `${SERVER_PREFIX_URL}/deploy`;
const SERVER_HOWDOI_PREFIX_URL = `${SERVER_PREFIX_URL}/howdoi?query=`;
const SERVER_MESSAGE_PARSER_PREFIX_URL = `${SERVER_PREFIX_URL}/message_parser?query=`;
const JOKES_API_INFO = [
  {
    url: 'http://api.icndb.com/jokes/random',
    getJokeText: (body) => (JSON.parse(body).value.joke)
  },
  {
    url: 'http://tambal.azurewebsites.net/joke/random',
    getJokeText: (body) => (JSON.parse(body).joke)
  }
];
const PLACES_API_KEY = 'AIzaSyC25RQflehd0mWD6mTTxWs_AcH6Gq1o4Q8';
const PLACES_API_PREFIX_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=establishment&key=${PLACES_API_KEY}&input=`;
const WEATHER_API_KEY = '5ce8ec77d11e6b31bbca4a128afd3b6d';
const WEATHER_API_PREFIX_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_API_KEY}&q=`;
const QUOTES_API_URL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const WIKI_API_PREFIX_URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=4&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
const WIKI_ARTICLE_PREFIX_URL = 'https://en.wikipedia.org/?curid=';
const KELVIN_CELCIUS_OFFSET = 273;
const DEFINE_API_URL = 'https://mashape-community-urban-dictionary.p.mashape.com/define';
const DEFINE_API_KEY = 'MRn5Ke2MMTmshHp839whoCom3Nx2p1Fsdo5jsnBBhSTxU3Zdo2';

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
  SERVER_MESSAGE_PARSER_PREFIX_URL,
  SERVER_HOWDOI_PREFIX_URL,
  JOKES_API_INFO,
  PLACES_API_PREFIX_URL,
  QUOTES_API_URL,
  WEATHER_API_PREFIX_URL,
  WIKI_API_PREFIX_URL,
  WIKI_ARTICLE_PREFIX_URL,
  KELVIN_CELCIUS_OFFSET,
  DEFINE_API_URL,
  DEFINE_API_KEY
};
