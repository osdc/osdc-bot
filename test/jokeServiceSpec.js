'use strict';
const expect = require("chai").expect;
const request = require("request");
const constants = require('../constants');
const jokeService = require('../services/jokeService');

describe("Module jokeService", function() {
  it("should fetch the joke correctly from the api", () => {
    request.get(constants.JOKES_API_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).value).to.have.property('joke');
    });
  });
});
