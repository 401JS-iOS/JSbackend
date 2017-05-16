'use strict';

let mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
  npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
  service: {type: String},
  devs: [{type: mongoose.Schema.Types.ObjectId, ref: 'devs'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
  description: {type: String},
});

module.exports = mongoose.model('project', projectSchema);
