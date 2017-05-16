'use strict';

let mongoose = require('mongoose');

let npoSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  username: {type: String, ref: 'users'},
  org: {type: String, required: true, unique: true}, //organization name
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  email: {type: String},
  profilepic: {type: String},
  website: [{type: String}],
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
});

module.exports = mongoose.model('npos', npoSchema);
