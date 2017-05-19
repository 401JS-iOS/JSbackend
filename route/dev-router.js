'use strict';

const bearerAuth = require('../lib/bearer-auth-midd.js');
const createError = require('http-errors');
const devController = require('../controller/dev-controller');

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

  router.delete('/dev/:id', bearerAuth, (req, res) => {
    devController.deleteDev(req, res, req.params.id);
  });

  return router;
};
