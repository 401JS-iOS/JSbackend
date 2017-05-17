'use strict';

const mongoose = require('mongoose');
const Project = require('./project');

// let createError = require('http-errors')

//review model will be used for npos and devs
let reviewSchema = mongoose.Schema({
  projectID: {type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  devID: {type: mongoose.Schema.Types.ObjectId, ref: 'devs' },
  npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
  stars: {type: Number, min:0, max: 5},
  desc: {type: String},
  date: {type: Date, default: Date.now, required: true},
});

reviewSchema.pre('save', function(next) {
  Project.findById(this.projectID)
  .then(project => {
    project.reviews.push(this._id.toString());
    return project.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('reviews', reviewSchema);
