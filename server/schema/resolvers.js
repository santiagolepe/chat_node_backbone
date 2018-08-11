const User = require('../models/user'),
         _ = require('lodash'),
      auth = require('./auth')

const resolvers = {
  Query: {
    me (parent, args, { user }) {
      if (!user) throw new Error("token required")
      return User.findById(user._id)
    },
  },
  Mutation: {
    login (parent, args) {
      return User.findOne({email: args.email}).exec()
      .then(user => {
        if (!user) throw new Error('Incorrect email or password')
        if (user.auth(args.password)) {
          let token = auth.createToken({_id: user._id, role: user.role})
          return { token }
        } else {
          throw new Error('Incorrect password')
        } 
      })
    },
    signup (parent, args) {
      return User.create(args)
      .then(user => {
        let token = auth.createToken({_id: user._id, role: user.role})
        return { token }
      })
    },    
  },
}

module.exports = resolvers