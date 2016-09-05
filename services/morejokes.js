const request = require('request');

module.exports = {
  getMorejokes: function(callback, username) {
    request('http://tambal.azurewebsites.net/joke/random', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
	console.log(data);
        return callback(data.joke, username);
      }
    });
  }
}

