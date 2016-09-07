'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  define: (callback, username, term) => {
    request({
      url: constants.DEFINE_API_URL + '?term=' + term,
      headers: {
        "X-Mashape-Key": "MRn5Ke2MMTmshHp839whoCom3Nx2p1Fsdo5jsnBBhSTxU3Zdo2"
      },
      method: "GET"
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var message = "\n";
        body = JSON.parse(body);
        for(var i = 0; i < body.list.length; i++) {
          message += '* ' + body.list[i].definition + '\n';
          message += 'by **' + body.list[i].author + '** ';
          message += ' :thumbsup: ' + body.list[i].thumbs_up.toString() + ' ';
          message += ' :thumbsdown: ' + body.list[i].thumbs_down.toString() + '\n';
        }
        return callback(message, username);
      }
    });
  }
};

