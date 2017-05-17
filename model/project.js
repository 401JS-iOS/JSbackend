'use strict';

let mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
  service: {type: String},
  devs: [{type: mongoose.Schema.Types.ObjectId, ref: 'devs'}],
  rating: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
  description: {type: String},
});


module.exports = mongoose.model('project', projectSchema);
