const request = require('request');
const constants = require('../constants');

module.exports = {
  getWeather: (callback, username, cityname) => {
    request(
      constants.WEATHER_API_PREFIX_URL + encodeURIComponent(cityname),
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const weatherData = JSON.parse(body);
          const maxTempCelcius = (
            (weatherData.main.temp_max - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          const minTempCelcius = (
            (weatherData.main.temp_min - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          return callback(
            `Humidity: ${weatherData.main.humidity}%\nMax Temperature: ${maxTempCelcius}C\nMin Temperature: ${minTempCelcius}C`, // eslint-disable-line max-len
            username);
        }
      }
    );
  }
};
