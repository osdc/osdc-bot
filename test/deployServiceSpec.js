'use strict';
const expect = require('chai').expect;
const request = require('request');
const constants = require('../constants');

describe('Module deployService', () => {
  it('should call the deploy api correctly', () => {
    request.get(constants.SERVER_DEPLOY_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Deployed');
    });
  });
});
