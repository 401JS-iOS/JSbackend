'use strict'

const createError = require('http-errors')

module.exports = function(req, res, next) {
  var authHeader = req.headers.authorization
  if(!authHeader) return next(createError(401, 'requires auth header'))

  let base64String = authHeader.split('Basic')[1]
  if(!base64String) return next(createError(401, 'require username and password'))

  let utf8String = new Buffer(base64String, 'base64').toString()
  let authArray = utf8String.split(':')
  req.auth = {
    username: authArray[0], //first split
    password: authArray[1], //after colon
  }
  //should this be more/less specific?
  if(!req.auth.username) return next(createError(401, 'username required'))
  if(!req.auth.password) return next(createError(401, 'password required'))
  next()
}
