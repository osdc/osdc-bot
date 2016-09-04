const request = require('request');

module.exports = {
  getWeather: (callback, username, cityname) => {
    const encodedCityName = encodeURIComponent(cityname);
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&APPID=5ce8ec77d11e6b31bbca4a128afd3b6d`;
    
    request(WEATHER_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const weatherData = JSON.parse(body);
        const KELVIN_CELCIUS_OFFSET = 273;
        const maxTempCelcius = (weatherData.main.temp_max - KELVIN_CELCIUS_OFFSET).toFixed(2);
        const minTempCelcius = (weatherData.main.temp_min - KELVIN_CELCIUS_OFFSET).toFixed(2);
        const message = `Humidity: ${weatherData.main.humidity}%\nMax Temperature: ${maxTempCelcius}C\nMin Temperature: ${minTempCelcius}C`;
        return callback(message, username);
      }
    });
  }
}
