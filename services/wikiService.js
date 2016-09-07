'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = (callback, username, input) => {
  let apiOptions = {
    url : constants.WIKI_API_PREFIX_URL + input,
    method : 'GET',
    json : {}
  };
  request(apiOptions, (err, response, data) => {
    if (!err && response.statusCode === 200) {
      let result = '', dataArr = [];
      if (data.query) {
        for(let key in data.query.pages) {
          if (data.query.pages.hasOwnProperty(key)) {
            dataArr[data.query.pages[key].index - 1] = data.query.pages[key]; // counting sort.
          }
        }
      }
      dataArr.forEach((curr, index) => {
        result += `\n#### ${index + 1}. [${curr.title}](${constants.WIKI_ARTICLE_PREFIX_URL}${curr.pageid})\n${curr.extract}\n`; // eslint-disable-line max-len
      });
      callback(result, username);
    } else {
      callback(err ? err.message : 'Unable to Connect to Wikipedia', username);
    }
  });
};
