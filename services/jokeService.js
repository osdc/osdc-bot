const request = require('request');

module.exports = {
  getJoke: function(callback, username) {
    request('http://api.icndb.com/jokes/random', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        return callback(data.value.joke, username);
      }
    });
  }
}

