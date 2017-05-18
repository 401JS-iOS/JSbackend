'use strict';

const User = require('../../model/user');
const debug = require('debug')('DEVolunteer:mock-user');


module.exports = function(done) {
  debug('mock-user');

  new User({
    username: 'jimmy',
    email: 'email@jimmy.com',
    password: 'password',
  })
  .generatePasswordHash('password')
  .then(user => user.save())
  .then(user => {
    this.tempUser = user;
    return user.generateToken();
  })
  .then(token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
