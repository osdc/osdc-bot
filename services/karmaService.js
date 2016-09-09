'use strict';
const sqlite3 = require('sqlite3');
const config = require('../config');
const db = new sqlite3.Database(config.dbFilePath);

function _getUserKarma(username, callback, message) {
  db.each("SELECT SUM(point) as totalKarma FROM karma WHERE username = ?", username,
    function(err, row) {
      return callback(message + row.totalKarma);
  });
}

module.exports = {
  getKarma: (callback) => {
    return true;
  },
  giveKarma: (callback, username, value) => {
    if ([-1,1].indexOf(value) > -1) {
      // Insert into DB
      db.serialize(function() {
        db.run("INSERT INTO karma (username, point) VALUES($username, $point)", {
          $username: username,
          $point: value,
        });
        let message = `Karma of ${username} is: `;
        _getUserKarma(username, callback, message);
      });
    }
  },
};
