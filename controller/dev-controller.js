'use strict';

const Dev = require('../model/dev');

module.exports = exports = {};

exports.createDev = function(body, user) {

  body.userID = user._id;
  return new Dev(body).save()
  .then(dev => dev)
  .catch(err => body.status(err.status).send(err.message));
};

exports.fetchDev = function(id, res) {

  return Dev.findById(id)
  .then( dev => dev)
  .catch(err => res.status(err.status).send(err.message));
};
