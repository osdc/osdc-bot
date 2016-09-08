'use strict';
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const request = require('request');
const constants = require('../constants');
const jokeService = require('../services/jokeService');

describe('Module jokeService', () => {
  chai.use(spies);

  it('should fetch the joke correctly from the api', () => {
    request.get(constants.JOKES_API_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).value).to.have.property('joke');
    });
  });

  it('should check for the callback', (done) => {
    const USERNAME = 'username';
    const callback = (joke, username) => {
      expect(username).to.equal(USERNAME);
      expect(joke).to.exist;
      done();
    };
    const spy = chai.spy(callback);
    jokeService.getJoke(spy, USERNAME);
  });
});
