//let Router = require('express').Router;
let bearerAuth = require('../lib/bearer-auth-midd.js');
let basicAuth = require('../lib/basic-auth-midd.js');
let createError = require('http-errors');
let Dev = require('../model/dev');
//let jsonParser = require('body-parser').json();
const devController = require('../controller/dev-controller');

//let router = module.exports = new Router();

//unauthed get all devs to pass to filtered dev list
module.exports = function(router) {
  router.get('/devList', basicAuth, (req, res, next) => {
    Dev.find()
    .then(allDevsObj => {
      res.send(allDevsObj);
    })
    .catch(next);
  });

  //req.user should be a individual user which the bearer auth will identify
  router.post('/dev', bearerAuth, (req, res) => {
    //if(!req.user.isDev) return next(createError(401, 'Please log in as a Developer'));

    //req.body will be values from the form they fill out on angular front-end
    devController.createDev(req.body, req.user)
    .then(dev => res.json(dev))
    .catch(err => res.status(err.status).send(err.message));

  });

  router.get('/dev/:id', bearerAuth, (req, res) => {
    //if(!req.user.isDev) return next(createError(401, 'please log in as a developr'));

    devController.fetchDev(req.params.id)
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
