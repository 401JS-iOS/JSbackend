'use strict';

const User = require('../model/user');

module.exports = exports = {};

exports.createUser = function(user) {

  let tempPassword = user.password;
  user.password = null;
  delete user.password;

  let newUser = new User(user);

  user.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(err => (err.status).send(err.message));
};

exports.fetchUser = function(user) {
  return User.findOne({username: user.username})
  .catch(err => (err.status).send(err.message));
};
