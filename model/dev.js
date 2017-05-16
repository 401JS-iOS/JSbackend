'use strict';

let mongoose = require('mongoose');

//Dev user model
let devSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  username: {type: String, ref: 'users'},
  city: {type: String},
  state: {type: String},
  phone: {type: String},
  email: {type: String},
  profilePic: {type: String},
  websites: [{type: String}],
  languages: [{type: String}],
  services: [{type: String}],
  isAvailable: {type: Boolean},
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
});

module.exports = mongoose.model('devs', devSchema);
