define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/users', 
  'views/rooms', 
  'views/messages', 
  'views/auth/buttons', 
  'collections/users',
  'collections/rooms',
  'collections/messages',
  'events',
  'services/socket',
  'views/sendView',
  'views/createRoomView'
], 
function ($, _, Backbone, UsersView, RoomsView, MessagesViews, AuthButtons, users, 
  rooms, Messages, events, io, SendView, CreateRoomView) {
  'use strict';

  var HomeView = Backbone.View.extend({

    el: '#app',

    initialize: function () {

      // initialize login and signin buttons
      new AuthButtons()

      // initialize user and rooms chats
      var usersView = new UsersView({collection: users})
      usersView.render()

      var roomsView = new RoomsView({collection: rooms})
      roomsView.render()

      // initialize messages panel, with default room
      new MessagesViews()

      // initialize send message and create room form
      new SendView()
      new CreateRoomView()

      // on logued connect socket with jwt
      events.on('logued', _ => io.reset())

    },

  })

  return HomeView
})