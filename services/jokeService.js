var request = require('request');

module.exports = {
  getJoke: function() {
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(data.value.joke);
        return data.value.joke;
      }
    });
  }
}

