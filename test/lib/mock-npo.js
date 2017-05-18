'use strict';

const Npo = require('../../model/npo');
const debug = require('debug')('DEVolunteer:mock-npo');
const mockUser = require('./mock-user');

module.exports = function() {
  debug('mock-npo');

  new Npo({
    username: mockUser.username,
    userID: mockUser._id,
  });
};
