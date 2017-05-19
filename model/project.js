'use strict';

let mongoose = require('mongoose');
const Npo = require('../model/npo');

let projectSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
  service: {type: String},
  dev: {type: String},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
  desc: {type: String},
  projStatus: {type: String},
  dateStart: {type: Date},
  dateEnd: {type: Date},
});

projectSchema.pre('save', function(next) {
  Npo.findById(this.npoID)
  .then(npo => {
    npo.projects.push(this._id.toString());
    return npo.save();
  })
  .then(() => next())
  .catch(next);
});
module.exports = mongoose.model('project', projectSchema);
