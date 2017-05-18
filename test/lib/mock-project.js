'use strict';

const Project = require('../../model/project');
const debug = require('debug')('DEVolunteer:mock-project');
const mockUser = require('./mock-user');

module.exports = function() {
  debug('mock-project');

  new Project({
    service: 'web app',
    desc: 'single page web app',
    userID: mockUser._id,
  });
};
