'use strict';

const bearerAuth = require('../lib/bearer-auth-midd.js');
const createError = require('http-errors');
const devController = require('../controller/dev-controller');
const projController = require('../controller/project-controller');

//unauthed get all devs to pass to filtered dev list
module.exports = function(router) {
  router.get('/devlist', (req, res) => {
    devController.fetchAllDevs()
    .then(devs => res.json(devs))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.post('/dev', bearerAuth, (req, res) => {

    devController.createDev(req.body, req.user)
    .then(dev => res.json(dev))
    .catch(err => res.status(err.status).send(err.message));

  });

  router.get('/dev/:id', (req, res) => {

    devController.fetchDev(req.params.id, res)
    .then(dev => {
      if(dev.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User ID');
      }
      res.json(dev);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/dev/:id', bearerAuth, (req, res) => {
    devController.updateDev(req, res, req.params.id)
    .then(dev => res.json(dev))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/dev/:id/project/:id', bearerAuth, (req, res) => {
    let devProj = [];

    projController.fetchAllProjects()
    .then(proj => {
      devProj.push(proj);
    })
    .catch(err => res.status(err.status).send(err.message));

    let devId = req.url.split('/');
    let updDevProj = [];

    devController.fetchDev(devId[2])
    .then(dev => {
      updDevProj.push(dev);

      res.json(dev);
    });

    devController.updateDev(req, res, devId[2])
    .then(dev => {
      console.log('devProj', devProj[0]);
      console.log('dev', dev);

      dev.projects.push(devProj[0]);

      // res.json(dev);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/dev/:id', bearerAuth, (req, res) => {
    devController.deleteDev(req, res, req.params.id);
  });

  return router;
};
