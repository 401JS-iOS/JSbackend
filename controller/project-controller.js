'use strict';

const Project = require('../model/project');
const Npo = require('../model/npo');
const Promise = require('bluebird');

module.exports = exports = {};

exports.createProject = function(req) {

  return Npo.findById(req.params.id)
  .then(() => {
    let projData = {
      userID: req.user._id,
      npoID: req.params.id,
      projStatus: req.body.projStatus,
      service: req.body.service,
      desc: req.body.desc,
    };
    return new Project(projData).save();
  })
  .then(proj => proj)
  .catch(err => Promise.reject(err.message));
};

exports.fetchAllProjects = function(res) {
  return Project.find()
  .then(proj => proj)
  .catch(err => res.status(err.status).send(err.message));
};

exports.fetchProject = function(id, res) {

  return Project.findById(id)
  .then( proj => proj)
  .catch(err => res.status(err.status).send(err.message));
};

exports.updateProject = function(req, res, id) {
  return Project.findByIdAndUpdate(id, req.body, {new:true})
  .then(proj => proj)
  .catch(err => res.status(err.status).send(err.message));
};

exports.deleteProject = function(req,res, id) {
  Project.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err.message));
};

// exports.findDevAndUpdateProject = function(req, res, id) {
//   let foundDev = Dev.findById(req.params.id);
//   console.log('this is found dev', foundDev);
//   let devProject = Project.findById(id);
//   devProject.dev = foundDev._id;
//   console.log('this is the devproject something', devProject.dev);
//   console.log('this is the found dev something', foundDev._id);
//   return devProject;
//   // let foundDevId;
//   // Dev.findById(req.params.id);
//   //   foundDevId = ;
//   //   let devProject = Project.findById(id);
//   //   console.log('this is the devProject', devProject);
//   //   console.log('this is the found dev id', foundDevId);
//   //   devProject.dev = foundDevId._id;
//   //   return devProject;
//   //
//   //.catch(err => res.status(err.status).send(err.message));
// };
