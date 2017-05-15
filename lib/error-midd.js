'use strict'

const createError = require('http-errors')

module.exports = function(err, req, res, next) {
  console.error('err.message : ', err.message)

  err = createError(err.status, err.message)
  res.status(err.status).send(err.name)
  next()
}
