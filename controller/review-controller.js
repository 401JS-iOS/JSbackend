'use strict';

const Review = require('../model/review');
const Project = require('../model/project');
const Promise = require('bluebird');

module.exports = exports = {};

exports.createReview = function(req) {
  console.log('req', req);
  // req.userID = user._id;

  return Project.findById(req.params.id)
  .then(() => {
    let reviewData = {
      userID: req.user._id,
      projectID: req.params.id,
      desc: req.body.desc,
    };
    return new Review(reviewData).save();
    //console.log('this is the project instance', projectInstance);
  })
  .then(review => review)
  .catch(err => Promise.reject(err.message));

};

exports.fetchAllReviews = function(res) {
  return Review.find()
  .then(review => review)
  .catch(err => res.status(err.status).send(err.message));
};

exports.fetchReview = function(id, res) {

  return Review.findById(id)
  .then( review => review)
  .catch(err => res.status(err.status).send(err.message));
};

exports.updateReview = function(req, res, id) {
  return Review.findByIdAndUpdate(id, req.body, {new:true})
  .then(review => review)
  .catch(err => res.status(err.status).send(err.message));
};

exports.deleteReview = function(req,res, id) {
  Review.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};
