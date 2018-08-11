'use strict';

const config = require('../config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user')

exports.createToken = data => {
  return jwt.sign(data, config.secret, { expiresIn: '2h' })
}

exports.jwt = (req, res, next) => {
  let token = false

  if (req.headers.authorization) {
    token = req.headers.authorization.split('Bearer ')[1]
  } else if(req.query.token) {
    token = req.query.token
  } else {
    return next()
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(401).json(err)
    User.findById(decoded._id, '-salt -password').exec()
    .then(user => {
      if (!user) return next()
      req.user = user
      next()
    })
    .catch(err => res.status(401).json(err))
  })
}
