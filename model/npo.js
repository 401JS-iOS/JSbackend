'use strict';

let mongoose = require('mongoose');

let npoSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  username: {type: String, ref: 'users'},
  org: {type: String, required: true, unique: true}, //organization name
  orgDesc: {type: String},
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  email: {type: String},
  profilePic: {type: String},
  websites: [{type: String}],
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
});

module.exports = mongoose.model('npos', npoSchema);
