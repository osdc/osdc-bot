'use strict';
const expect = require("chai").expect;
const request = require("request");
const constants = require('../constants');
const howdoiService = require('../services/howdoiService');

describe("Module howdoiService", function() {
  it("should correctly call the howdoi service api", () => {
    const sampleQueries = [
      'howdoi convert mp4 to mp3',
      'howdoi declare array in python',
      'howdoi abc xyz',
    ];
    sampleQueries.forEach(function(query) {
      request.get(constants.SERVER_HOWDOI_PREFIX_URL + query, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.be.a('string');
      });
    });
  });
});
