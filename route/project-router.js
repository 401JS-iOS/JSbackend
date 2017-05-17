'use strict';

const bearerAuth = require('../lib/bearer-auth-midd');
const projectController = require('../controller/project-controller');
const createError = require('http-errors');

module.exports = function(router) {
  router.post('/npo/:id/project', bearerAuth, (req, res) => {

    projectController.createProject(req)
    .then(proj => res.json(proj))
    .catch(err => res.status(err));
  });

  router.get('/npo/:id/projectlist', (req, res) => {
    projectController.fetchAllProjects()
    .then(proj => res.json(proj))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/npo/:id/project/:id', bearerAuth, (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'please log in as a npoelopr'));

    projectController.fetchProject(req.params.id)
    .then(npo => {
      if(npo.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User ID');
      }
      res.json(npo);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/npo/:id/project/:id', bearerAuth, (req, res) => {
    projectController.updateProject(req, res, req.params.id)
    .then(npo => res.json(npo))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/npo/:id/project/:id', bearerAuth, (req, res) => {
    projectController.deleteProject(req, res, req.params.id);
  });

  return router;
};
