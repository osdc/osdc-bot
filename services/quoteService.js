const request = require('request')

module.exports = {
    getQuote: function(callback, username){
        request('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', (error, response, body) => {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              console.log(data,body);
              return callback(data[0].content.replace(/<\/?p>/g,''), username);
           }
           else console.log(response.statusCode);
          });
        }
    }
