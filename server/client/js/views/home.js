define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/users', 
  'views/rooms', 
  'views/auth/buttons', 
  'collections/users',
  'collections/rooms',
  'events',
  'services/socket'
], 
function ($, _, Backbone, UsersView, RoomsView, AuthButtons, users, rooms, events, io) {
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

      // on logued connect socket with jwt
      events.on('logued', _ => io.reset())

    },

  })

  return HomeView
})