'use strict';

var env = process.env.NODE_ENV || 'development'
var config = require(`./${env}`)
config.secret = 'secret_key'

module.exports = config