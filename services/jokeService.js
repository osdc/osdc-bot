const request = require('request');
const JOKES_API_URL = 'http://api.icndb.com/jokes/random';

module.exports = {
  getJoke: (callback, username) => {
    request(JOKES_API_URL, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        return callback(JSON.parse(body).value.joke, username);
      }
    });
  }
};

