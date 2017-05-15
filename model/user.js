'use strict'

//just for auth process
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const createError = require('http-errors')

const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true },
  password: {type: String},
  isDev: {type: Boolean, default: false},
  isNPO: {type: Boolean, default: false},
})

//when signing up, the user can validate the isDev vs isNPO flag that is toggled by a view button (are you signing up as a dev or as an NPO?)

//npos and dev models are essentially profiles with schema properties to be rendered on DOM

//allows for all logic to be handled in the authRouter, no duplicate code (devRouter and npoRouter with similiar auth process but abstracted to two places)

//might make templating front end easier...look for .isDev vs .isNPO as opposed to querystrings or other work arounds

userSchema.methods.generatePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err)
      this.password = hash
      resolve(this)
    })
  })
}

//sign in - take in the pw they sign in with and compares against the property saved on the user object via .compare
userSchema.methods.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err)
      if(!valid) return reject(createError(401, 'wrong password'))
      resolve(this)
    })
  })
}

userSchema.methods.generateToken = function() {
  return new Promise ((resolve, reject) => {
    let token = jwt.sign({id: this._id}, process.env.SECRET || 'DEV')
    if(!token) {
      reject('could not generate token')
    }
    resolve(token)
  })
}

module.exports = mongoose.model('users', userSchema)
