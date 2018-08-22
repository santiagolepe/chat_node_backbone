define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/sendView.html', 
  'services/socket', 
  'models/session',
  'events'
  ], 
  function ($, _, Backbone, template, io, session, events) {
  'use strict';

  var currentChat = 'room_public'

  var SendView = Backbone.View.extend({

    el: '#send-box',

    template: _.template(template),

    initialize: function () {
      
      // customs events
      events.on('selectChat', model => {
        currentChat = model.socket
      })      
      
      this.render()
    },

    events: {
      'submit': 'sendMessage'
    },

    render: function () {
      this.$el.html(this.template())
    },

    sendMessage: function (e) {
      e.preventDefault()
      var input = $(e.target[0])
      io.socket.emit('message', { text: input.val(), to: currentChat  })
      input.val('')
    }

  })

  return SendView
})