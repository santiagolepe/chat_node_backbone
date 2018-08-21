define(['socket', 'services/auth'], 
  function (io, auth) {
  'use strict';

  var socket = io({
    'query': 'token=' + auth.getToken(),
    path: '/ws'
  })

  socket.on('connect', _ => {
    console.log('connect socket')
  })

  return {

    socket: socket,

    reset: function () {
      this.socket.io.opts.query = 'token=' + auth.getToken()
      this.socket.disconnect()
      this.socket.connect()
    },

    sync: function (type, cb) {
      this.socket.on(type, res => cb(res))
    },

    unsync: function (type) {
      this.socket.removeAllListeners(type)
    }

  }

})
