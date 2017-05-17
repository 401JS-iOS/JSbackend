'use strict';

const Project = require('../model/project');
const Npo =require('../model/npo');


module.exports = exports = {};

exports.createProject = function(req) {
  console.log('req', req);
  // req.userID = user._id;

  return Npo.findById(req.params.id)
  .then(() => {
    let projData = {
      userID: req.user._id,
      npoID: req.params.id,
      service: req.body.service,
      description: req.body.description,
    };
    return new Project(projData).save();
  })
  .then(proj => proj)
  .catch(err => Promise.reject(err.message));
};
