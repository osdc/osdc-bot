'use strict';
const request = require('request');
const WIKI_PREFIX_URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=4&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

module.exports = (callback, username, input) => {
  let apiOptions = {
    url : `${WIKI_PREFIX_URL}${input}`,
    method : 'GET',
    json : {}
  };
  request(apiOptions,(err, response, data) => {
    if (!err && response.statusCode === 200){
      let result = '', dataArr = [];
      if (data.query) {
        for(let key in data.query.pages){
          if (data.query.pages.hasOwnProperty(key))
            dataArr[data.query.pages[key].index - 1] = data.query.pages[key]; //counting sort .
        }
      }
      dataArr.forEach((curr, index) => {
        result += `\n ### ${index+1}[${curr.title}](https://en.wikipedia.org/?curid=${curr.pageid})\n ${curr.extract}\n`;
      });
      callback(result, username);
    }
    else {
      callback(err ? err.message : 'Unable to Connect to Wikipedia', username);
    }
  });
};
