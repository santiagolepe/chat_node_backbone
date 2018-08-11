'use strict';

const express = require('express'),
  mongoose = require('mongoose'),
  config = require('./config'),
  cors = require('cors'),
  { ApolloServer } = require('apollo-server-express'),
  typeDefs = require('./schema/typeDefs'),
  resolvers = require('./schema/resolvers'),
  path = require('path'),
  auth = require('./schema/auth'),
  http = require('http')

const app = express()

// Connect mongo database
mongoose.Promise = global.Promise
mongoose.connect(config.db, config.db_conn)

mongoose.connection.once('open', _ => {
  console.log('Database connected ', config.db)
  // seeds
  if (config.env === 'development') require('./seed')
})

//add cors for all development request
if (config.env !== 'production') app.use(cors())

//public path
app.use(express.static('public'))

app.use(auth.jwt)

const graphql = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => ({
    user: req.user
  })
})
graphql.applyMiddleware({ app })

let server = app.listen(config.port, config.host, _ => {
  console.log('App running: ', server.address())
})

// config socket.io
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/ws'
})
require('./ws')(socketio)

module.exports = app
