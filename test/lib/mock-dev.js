'use strict';

const Dev = require('../../model/dev');
const debug = require('debug')('DEVolunteer:mock-dev');
const mockUser = require('./mock-user');

module.exports = function() {
  debug('mock-user');

  new Dev({
    username: mockUser.username,
    userID: mockUser._id,
  });
};
