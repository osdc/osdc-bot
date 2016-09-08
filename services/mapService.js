'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getPlaces: (callback, username, cityName) => {
    request(
      constants.PLACES_API_PREFIX_URL + cityName, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          return (
            callback(JSON.parse(body).predictions[0].description, username));
        }
      }
    );
  }
};
