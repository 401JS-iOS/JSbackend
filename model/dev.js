'use strict';

let mongoose = require('mongoose');
const Dev = require('../model/dev');

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

devSchema.pre('save', function(next) {
  Dev.findById(this.devID)
  .then(dev => {
    dev.projects.push(this._id.toString());
    return dev.save();
  })
  .then(() => next())
  .catch(next);
});
module.exports = mongoose.model('devs', devSchema);
