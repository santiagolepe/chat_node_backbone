define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/createRoomView.html', 
  'services/socket', 
  'models/session',
  ], 
  function ($, _, Backbone, template, io, session) {
  'use strict';

  var CreateRoomView = Backbone.View.extend({

    el: '#new-room-box',

    template: _.template(template),

    initialize: function () {
      this.render()
    },

    events: {
      'submit': 'createRoom'
    },

    render: function () {
      this.$el.html(this.template())
    },

    createRoom: function (e) {
      e.preventDefault()
      var input = $(e.target[0])
      io.socket.emit('room', { room: input.val() })
      input.val('')
    }

  })

  return CreateRoomView
})