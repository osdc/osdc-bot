'use strict';
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const request = require('request');
const constants = require('../constants');
const insultService = require('../services/insultService');

describe('Module insultService', () => {
  chai.use(spies);

  it('should fetch the insult correctly from the api', () => {
    request.get(constants.INSULTS_API_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).insult).to.be.a('string');
      expect(error).to.equal(null);
    });
  });

  it('should check for the callback', (done) => {
    const USERNAME = 'username';
    const callback = (insult, username) => {
      expect(username).to.equal(USERNAME);
      expect(insult).to.be.a('string');
      done();
    };
    const spy = chai.spy(callback);
    insultService.getInsult(spy, USERNAME);
  });
});
