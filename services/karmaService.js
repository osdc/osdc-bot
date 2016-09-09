'use strict';
const sqlite3 = require('sqlite3');
const config = require('../config');
const db = new sqlite3.Database(config.dbFilePath);

const _parseAllUserKarma = (callback, rows) => {
  let msg = 'Karma Table: \n';
  for (let row in rows) {
    msg += `${rows[row].username}: ${rows[row].totalKarma}\n`;
  }
  callback(msg);
};

const _getUserKarma = (username, callback, message) => {
  db.each(
    'SELECT SUM(point) as totalKarma FROM karma WHERE username = ?', username,
    (error, row) => {
      if (!error) {
        return callback(message + row.totalKarma);
      }
    });
};

module.exports = {
  getKarma: (callback) => {
    db.all(
      ('SELECT SUM(point) as totalKarma, username FROM karma' +
       'GROUP BY username ORDER BY totalKarma DESC'),
      (error, rows) => {
        if (!error) {
          _parseAllUserKarma(callback, rows);
        }
      });
  },
  giveKarma: (callback, username, value) => {
    if ([-1, 1].indexOf(value) > -1) {
      // Insert into DB
      db.serialize(function() {
        db.run(
         'INSERT INTO karma (username, point) VALUES($username, $point)', {
           $username: username,
           $point: value
         });
        let message = `Karma of ${username} is: `;
        _getUserKarma(username, callback, message);
      });
    }
  }
};
