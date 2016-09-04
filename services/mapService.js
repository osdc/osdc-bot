const request = require('request');
const PLACES_API_KEY = 'AIzaSyC25RQflehd0mWD6mTTxWs_AcH6Gq1o4Q8';

module.exports = {
  getPlaces: (callback, username, cityName) => {
	const PLACES_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=establishment&key=${PLACES_API_KEY}`;

    request(PLACES_API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return callback(JSON.parse(body).predictions[0].description, username);
      }
    });
  }
}
