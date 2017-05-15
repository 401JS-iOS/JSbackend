'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-midd');
const authCntrl = require('../controller/auth-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('POST /signup');

    authCntrl.createUser(req, res, req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    console.log(req.auth);
    authCntrl.fetchUser(res, req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(res.status).send(err));
  });
  return router;
};
