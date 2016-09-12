'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getWeather: (callback, username, cityname) => {
    request(
      constants.WEATHER_API_PREFIX_URL + encodeURIComponent(cityname),
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const weatherData = JSON.parse(body);
          let message = `Humidity: ${weatherData.main.humidity}%\n`;
          const maxTempCelcius = (
            (weatherData.main.temp_max - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          const minTempCelcius = (
            (weatherData.main.temp_min - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          message += `Max Temperature: ${maxTempCelcius}C`;
          message += `\nMin Temperature: ${minTempCelcius}C`;
          return callback(message, username);
        }
      }
    );
  }
};
