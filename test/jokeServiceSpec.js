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
    constants.JOKES_API_INFO.forEach((jokeInfo) => {
      request.get(jokeInfo.url, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(jokeInfo.getJokeText(body)).to.be.a('string');
        expect(error).to.equal(null);
      });
    });
  });

  it('should check for the callback', (done) => {
    const USERNAME = 'username';
    const callback = (joke, username) => {
      expect(username).to.equal(USERNAME);
      expect(joke).to.be.a('string');
      done();
    };
    const spy = chai.spy(callback);
    jokeService.getJoke(spy, USERNAME);
  });
});
