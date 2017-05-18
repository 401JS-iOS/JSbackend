'use strict';

const bearerAuth = require('../lib/bearer-auth-midd.js');
const createError = require('http-errors');
const npoController = require('../controller/npo-controller');

//unauthed get all npos to pass to filtered npo list
module.exports = function(router) {
  router.get('/npolist', (req, res) => {
    npoController.fetchAllNpos()
    .then(devs => res.json(devs))
    .catch(err => res.status(err.status).send(err.message));
  });

  //req.user should be a individual user which the bearer auth will identify
  router.post('/npo', bearerAuth, (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'Please log in as a Npoeloper'));

    //req.body will be values from the form they fill out on angular front-end
    npoController.createNpo(req.body, req.user)
    .then(npo => res.json(npo))
    .catch(err => res.status(err.status).send(err.message));

  });

  router.get('/npo/:id', (req, res) => {
    //if(!req.user.isNpo) return next(createError(401, 'please log in as a npoelopr'));

    npoController.fetchNpo(req.params.id)
    .then(npo => {
      if(npo.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User ID');
      }
      res.json(npo);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/npo/:id', bearerAuth, (req, res) => {
    npoController.updateNpo(req, res, req.params.id)
    .then(npo => res.json(npo))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/npo/:id', bearerAuth, (req, res) => {
    npoController.deleteNpo(req, res, req.params.id);
  });

  return router;
};
