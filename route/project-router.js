'use strict';

const bearerAuth = require('../lib/bearer-auth-midd');
const projectController = require('../controller/project-controller');
const createError = require('http-errors');

module.exports = function(router) {
  router.post('/npo/:id/project', bearerAuth, (req, res) => {

    projectController.createProject(req)
    .then(proj => res.json(proj))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/projectlist', (req, res) => {
    projectController.fetchAllProjects()
    .then(proj => res.json(proj))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/npo/:id/project/:id', (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'please log in as a npoelopr'));

    projectController.fetchProject(req.params.id)
    .then(proj => {
      if(proj.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid ID');
      }
      res.json(proj);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/npo/:id/project/:id', bearerAuth, (req, res) => {
    projectController.updateProject(req, res, req.params.id)
    .then(proj => res.json(proj))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/npo/:id/project/:id', bearerAuth, (req, res) => {
    projectController.deleteProject(req, res, req.params.id);
  });

  // router.put('/npo/:id/project/:id/devproject', bearerAuth, (req, res) => {
  //   projectController.findDevAndUpdateProject(req, res)
  //   .then(proj => res.json(proj))
  //   //.catch(err => res.status(err.status).send(err.message));
  // });

  return router;
};
