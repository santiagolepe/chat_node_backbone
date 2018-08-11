'use strict';
const config = require('../config'),
  User = require('../models/user')

// map of connected users and rooms chats
let users = []
let rooms = ['room_public']

// on disconnect socket, delete from list and notify to all users connected
function onDisconnect(socket, io) {
  users = users.filter(user => user.socket !== socket.id)
  io.emit('user_disconnect', socket.id)
  console.log(`${users.length} connected users`)
}

function onConnect(socket, io) {
  let _id = socket.decoded_token._id

  //get user information
  User.findById(_id)
    .then(user => {
      if (user) {
        let data = {
          socket: socket.id,
          name: user.name,
          _id: user._id,
          active: false,
          count: 0,
        }
        // store user data
        users.push(data)
        socket.username = user.name

        // in the first conection join to default public chat
        socket.join(rooms[0])
        io.to(rooms[0]).emit('join', data)
        socket.emit('all_users', users)
        console.log(`${users.length} connected users`)
      }
    })

  // get message
  socket.on('message', message => {
    message.user = socket.username
    message._id = socket._id
    message.from = socket.id
    // if comes from room
    if (message.to.includes('room_')) {
      io.to(message.to).emit('get_message', message)
    // private message
    } else {
      socket.emit('get_message', message)
      socket.broadcast.to(message.to).emit('get_message', message)
    }
  }) 

  // on create new room
  socket.on('room', data => {
    let rm = `room_${data.room}`
    rooms.push(data.room)
    socket.join(rm)
    let room = {name: data.room, active: false, socket: rm, count: 0}
    io.to(rm).emit('new_room', room)
  })

  // someone invite to room chat
  socket.on('invite_room', data => {
    let room = {name: data.room.split('room_')[1], active: false, socket: data.room, count: 0}
    socket.broadcast.to(data.socket).emit('invite_room', room)
  })
  // someone accept the invitation
  socket.on('join_room', data => {
    socket.join(data.socket)
  })  
}

let WS = function(socketio) {

  socketio.use(require('socketio-jwt').authorize({
    secret: config.secret,
    handshake: true
  }))

  socketio.on('connection', socket => {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`

    socket.connectedAt = new Date()
    socket._id = socket.decoded_token._id

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}] id: ${socket.id} `, ...data)
    }

    socket.on('disconnect', _ => {
      onDisconnect(socket, socketio)
      socket.log('DISCONNECTED')
    })

    onConnect(socket, socketio)
    socket.log('CONNECTED')
  })
}

module.exports = WS
