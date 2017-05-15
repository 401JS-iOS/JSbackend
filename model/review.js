'use strict'

let mongoose = require('mongoose')
// let createError = require('http-errors')

//review model will be used for npos and devs
let reviewSchema = mongoose.Schema({
  dev: {type: String, ref: 'devs' },
  npo: {type: String, ref: 'npos'},
  stars: {type: Number, min:0, max: 5},
  desc: {type: String},
  date_start: {type: Date},
  date_end: {type: Date},
})

module.exports = mongoose.model('reviews', reviewSchema)
