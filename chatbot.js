const Faye = require('faye');
const request = require('request');

const config = require('./config');
const joker = require('./services/jokeService.js');

const ROOM_ID  = config.roomId;
const TOKEN   = config.token;
const DEPLOY_FLAG = process.env.DEPLOY || false;

// Authentication extension
var ClientAuthExt = function() {};

ClientAuthExt.prototype.outgoing = (message, callback) => {
  if (message.channel == '/meta/handshake') {
    if (!message.ext) { message.ext = {}; }
    message.ext.token = TOKEN;
  }

  callback(message);
};

ClientAuthExt.prototype.incoming = (message, callback) => {
  if(message.channel == '/meta/handshake') {
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
const client = new Faye.Client('https://ws.gitter.im/faye', {timeout: 60, retry: 5, interval: 1});

// Add Client Authentication extension
client.addExtension(new ClientAuthExt());

// A dummy handler to echo incoming messages
var messageHandler = (msg) => {
  if (msg.model && msg.model.fromUser) {
    console.log("Message: ", msg.model.text);
    console.log("From: ", msg.model.fromUser.displayName);

    reply_to_user(msg.model.fromUser, msg.model.text);
  }
};


function reply_to_user(user, message) {
  const displayName = user.displayName;
  const username = user.username;

  if (message.lastIndexOf("@osdc-bot") === 0) {
    const data = message.slice(10, message.length);
    if (data.lastIndexOf("help") === 0) {
      // list all commands
      console.log("[INFO] In help loop");
      send("You can:\n- joke\n- deploy\n", username);
    }

    if (data.lastIndexOf("joke") === 0) {
      console.log("[INFO] In joke loop");
      joker.getJoke(send, username);
    }

    if (data.lastIndexOf("deploy") === 0) {
      console.log("[INFO] Deploy");
      request({
        url: "http://127.0.0.1:5000/deploy",
        method: "GET"
      }, (error, response, body) => {
        console.log(response);
      });
    }

    if (data.lastIndexOf("howdoi") === 0) {
      const query = encodeURIComponent(data.slice(7, data.length));
      console.log("[INFO] howdoi");
      request({
        url: "http://127.0.0.1:5000/howdoi?query=" + query,
        method: "GET"
      }, (error, response, body) => {
        console.log('HowdoI request successful');
        console.log(body);
        // send(body);
        sendHowDoI(body);
      });
    }
  }
}


function sendHowDoI(output) {
  request({
    url: "https://api.gitter.im/v1/rooms/" + ROOM_ID + "/chatMessages",
    headers: {
      "Authorization" : "Bearer " + TOKEN
    },
    method: "POST",
    json: true,
    body: {text: output}
  }, (error, response, body) => {
    console.log(response);
  });
}


function send(message, username) {
  var text = message;

  if (username) {
    text = "@" + username + " " + text;
  }

  const body = {
    text
  };

  request({
    url: "https://api.gitter.im/v1/rooms/" + ROOM_ID + "/chatMessages",
    headers: {
      "Authorization" : "Bearer " + TOKEN
    },
    method: "POST",
    json: true,
    body: body
  }, (error, response, body) => {
    console.log(response);
  });
}

client.subscribe('/api/v1/rooms/' + ROOM_ID + '/chatMessages', messageHandler, {});
