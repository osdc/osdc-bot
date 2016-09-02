const Faye = require('faye');
const request = require('request');

const config = require('./config');
const joker = require('./services/jokeService.js');

const ROOM_ID  = config.roomId;
const TOKEN   = config.token;

const DEPLOY_FLAG = process.env.DEPLOY || false;

const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';
const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const SERVER_PREFIX_URL = "http://127.0.0.1:5000";
const SERVER_DEPLOY_URL = `${SERVER_PREFIX_URL}/deploy`;
const SERVER_HOWDOI_PREFIX_URL = `${SERVER_PREFIX_URL}/howdoi?query=`;
const SEND_TO_CHAT_URL = `https://api.gitter.im/v1/rooms/${ROOM_ID}/chatMessages`;

const BOT_MENTION_NAME = "@osdc-bot";
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  HOWDOI: 'howdoi'
};

// Authentication extension
var ClientAuthExt = function() {};

ClientAuthExt.prototype.outgoing = (message, callback) => {
  if (message.channel === META_HANDSHAKE_SUFFIX_URL) {
    if (!message.ext) { message.ext = {}; }
    message.ext.token = TOKEN;
  }
  callback(message);
};

ClientAuthExt.prototype.incoming = (message, callback) => {
  if(message.channel === META_HANDSHAKE_SUFFIX_URL) {
    if(message.successful) {
      console.log('Successfuly subscribed to room: ', ROOM_ID);
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
const clientOptions =  {
  timeout: 60,
  retry: 5,
  interval: 1
};
const client = new Faye.Client(FAYE_CLIENT_URL, clientOptions);

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
  var result = null;
  for (var botAction in BOT_ACTIONS) {
    if (parsedMessage.startsWith(BOT_ACTIONS[botAction])) {
      result = BOT_ACTIONS[botAction];
      console.log(`[INFO] In loop {result}`);
      break;
    }
  }
}

function reply_to_user(user, message) {
  const displayName = user.displayName;
  const username = user.username;

  if (message.startsWith(BOT_MENTION_NAME)) {
    const parsedMessage = message.slice(BOT_MENTION_NAME.length + 1);
    console.log(parsedMessage);
    const startsWithString = _getStartsWith(parsedMessage);
    if (startsWithString === BOT_ACTIONS.HELP) {
      send("You can:\n- joke\n- deploy\n", username);
    }

    if (startsWithString === BOT_ACTIONS.JOKE) {
      joker.getJoke(send, username);
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
        send(body);
      });
    }
  }
}

function _postOnChat(message) {
  request({
    url: SEND_TO_CHAT_URL,
    headers: {
      Authorization : `Bearer ${TOKEN}`
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

client.subscribe(`/api/v1/rooms/${ROOM_ID}/chatMessages`, messageHandler, {});
