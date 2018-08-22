define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/message', 
  'services/socket', 
  'models/session',
  'collections/messages',
  'events'
  ], 
  function ($, _, Backbone, MessageView, io, session, Messages, events) {
  'use strict';

  var currentChat = 'room_public'
  let chatsMessages = {
    room_public: new Messages()
  }

  var MessagesView = Backbone.View.extend({

    el: '#messages-box',

    initialize: function () {
      // set default room
      this.collection = chatsMessages[currentChat]

      // custom event select chat
      events.on('selectChat', model => {
        if (model.socket !== currentChat) {
          currentChat = model.socket
          if (chatsMessages[currentChat]) {
            this.collection = chatsMessages[currentChat]
          } else {
            this.collection = chatsMessages[currentChat] = new Messages()
          }
          this.render()
        }
      })

      // sync socket
      io.sync('get_message', message => {
        var to
        if (message.to.includes('room_')) {
          to = message.to
        } else {
          to = message._id === session.get('_id') ? message.to : message.from
        }

        if (to === currentChat) {
          this.collection.add(message)
        // create new messages colections if not exist
        } else if (chatsMessages[to]) {
          chatsMessages[to].add(message)
        } else {
          chatsMessages[to] = new Messages(message)
        }
        this.render()
      }) 
    },

    render: function () {
      this.$el.html('')
      this.collection.each(this.addMessage, this)
      var box_messages = document.getElementById('messages-box')
      box_messages.scrollTop = box_messages.scrollHeight
    },

    addMessage: function (message) {
      var messageView = new MessageView({model: message})
      this.$el.append(messageView.render().el)
    }

  })

  return MessagesView
})