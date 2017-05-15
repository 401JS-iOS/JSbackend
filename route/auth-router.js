'use strict';

let basicAuth = require('../lib/basic-auth-midd.js');
let authController = require('../controller/auth-controller');
let Router = require('express').Router;
let router = module.exports = new Router();

//posts a new user with their information
router.post('/api/signup', (req, res) => {
  authController.createUser(req.body)
  .then(token => res.json(token))
  .catch(err => res.status(err).send(err.message));
});

//sends the users token if they log in successfully
router.get('/api/login', basicAuth, (req, res) => {

  authController.fetchUser(req.auth)
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => res.status(err.status).send(err.message));
});
