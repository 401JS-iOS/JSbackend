//let Router = require('express').Router;
let bearerAuth = require('../lib/bearer-auth-midd.js');
let basicAuth = require('../lib/basic-auth-midd.js');
let createError = require('http-errors');
let Npo = require('../model/npo');
//let jsonParser = require('body-parser').json();
const NpoController = require('../controller/npo-controller');

//let router = module.exports = new Router();

//unauthed get all npos to pass to filtered npo list
module.exports = function(router) {
  router.get('/npoList', basicAuth, (req, res, next) => {
    Npo.find()
    .then(allNposObj => {
      res.send(allNposObj);
    })
    .catch(next);
  });

  //req.user should be a individual user which the bearer auth will identify
  router.post('/npo', bearerAuth, (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'Please log in as a Npoeloper'));

    //req.body will be values from the form they fill out on angular front-end
    NpoController.createNpo(req.body, req.user)
    .then(npo => res.json(npo))
    .catch(err => res.status(err.status).send(err.message));

  });

  router.get('/npo/:id', bearerAuth, (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'please log in as a npoelopr'));

    NpoController.fetchNpo(req.params.id)
    .then(npo => {
      if(npo.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User ID');
      }
      res.json(npo);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/npo/:id', bearerAuth, (req, res) => {
    NpoController.updateNpo(req, res, req.params.id)
    .then(npo => res.json(npo))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/npo/:id', bearerAuth, (req, res) => {
    NpoController.deleteNpo(req, res, req.params.id);
  });

  return router;
};
