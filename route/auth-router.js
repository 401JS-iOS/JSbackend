'use strict'

let Router = require('express').Router
let basicAuth = require('../lib/basic-auth-midd.js')
let User = require('../model/user.js')
let createError = require('http-errors')
let jsonParser = require('body-parser').json()

let router = module.exports = new Router()

//posts a new user with their information
router.post('/api/signup', jsonParser, (req, res, next) => {
  let user = new User(req.body)

  user.generatePasswordHash(user.password)
  .then(user  => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next)
})

//sends the users token if they log in successfully
router.get('/api/login', basicAuth, (req, res, next) => {

  User.findOne({username: req.auth.username})
  .then(user => {
    if(!user) return Promise.reject(next(createError(401)))
    return user.comparePasswordHash(req.auth.password)
  })
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next)
})
