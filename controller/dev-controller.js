'use strict';

const Dev = require('../model/dev');

module.exports = exports = {};

exports.createDev = function(body, user) {

  body.userID = user._id;
  return new Dev(body).save()
  .then(dev => dev)
  .catch(err => body.status(err.status).send(err.message));
};

exports.fetchAllDevs = function(res) {
  return Dev.find()
  .then(devs => devs)
  .catch(err => res.status(err.status).send(err.message));
};

exports.fetchDev = function(id, res) {

  return Dev.findById(id)
  .then( dev => dev)
  .catch(err => res.status(err.status).send(err.message));
};

exports.updateDev = function(req, res, id) {
  return Dev.findByIdAndUpdate(id, req.body, {new:true})
  .then(dev => dev)
  .catch(err => res.status(err.status).send(err.message));
};

exports.deleteDev = function(req,res, id) {
  Dev.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};
