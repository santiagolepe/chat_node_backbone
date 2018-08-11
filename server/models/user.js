'use strict';

const mongoose = require('mongoose'),
      crypto = require('crypto')

let providers = ['facebook', 'google', 'github', 'twitter']

let required = function () {
  return providers.indexOf(this.provider) === -1 ? true : false
}

var User = new mongoose.Schema({
  name: { type: String, required: 'Name required!!' },
  email: { type: String, lowercase: true, required, unique: true },
  role: { type: String, default: 'user' },
  password: { type: String, required, minlength: [8, 'Min eight characters'] },
  provider:  { type: String, default: 'local' },
  salt: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

// validates post save
User.post('save', function (err, user, next) {
  if (err.name === 'BulkWriteError' && err.code === 11000) {
    next({error: 'email must be unique'})
  } 
  if (err) return next(err)
})

User.pre('save', function (next) {
  if (!this.password) {
    if(providers.indexOf(this.provider) === -1) 
      return next({error: 'password required'})
    else 
      return next()
  }
  this.salt = this.makeSalt()
  this.password = this.encryptPassword(this.password)
  return next()
})

// methods
User.methods = {

  auth (pass, next) {
    return this.password === this.encryptPassword(pass)
  },

  makeSalt () {
    return crypto.randomBytes(16).toString('base64')
  },

  encryptPassword (password) {
    if (!password || !this.salt) return ''
    var salt = new Buffer(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
  }

}

module.exports = mongoose.model('User', User)