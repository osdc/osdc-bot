const request = require('request');
const QUOTES_API_URL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

module.exports = {
  getQuote: (callback, username) => {
    request(QUOTES_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(JSON.parse(body)[0].content.replace(/<\/?p>/g, ''), username);
      }
    });
  }
}

