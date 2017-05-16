'use strict';

const Npo = require('../model/npo');

module.exports = exports = {};

exports.createNpo = function(body, user) {

  body.userID = user._id;
  return new Npo(body).save()
  .then(npo => npo)
  .catch(err => body.status(err.status).send(err.message));
};

exports.fetchNpo = function(id, res) {

  return Npo.findById(id)
  .then( npo => npo)
  .catch(err => res.status(err.status).send(err.message));
};

exports.updateNpo = function(req, res, id) {
  return Npo.findByIdAndUpdate(id, req.body, {new:true})
  .then(npo => npo)
  .catch(err => res.status(err.status).send(err.message));
};

exports.deleteNpo = function(req,res, id) {
  Npo.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};
