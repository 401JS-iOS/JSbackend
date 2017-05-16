'use strict';

let mongoose = require('mongoose');
// let createError = require('http-errors')

//review model will be used for npos and devs
let reviewSchema = mongoose.Schema({
  projectID: {type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  devID: {type: mongoose.Schema.Types.ObjectId, ref: 'devs' },
  npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
  stars: {type: Number, min:0, max: 5},
  desc: {type: String},
  dateStart: {type: Date},
  dateEnd: {type: Date},
});

module.exports = mongoose.model('reviews', reviewSchema);
