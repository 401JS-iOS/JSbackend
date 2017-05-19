'use strict';

const Review = require('../../model/review');
const debug = require('debug')('DEVolunteer:mock-review');
// const mockProject = require('./mock-project');

module.exports = function() {
  debug('mock-review');

  new Review({
    stars: 4,
    desc: 'yay',
    // projectID: mockProject._id,
  });
};
