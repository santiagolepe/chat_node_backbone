define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/users', 
  'views/auth/buttons', 
  'collections/users',
  'events',
  'services/socket'
], 
function ($, _, Backbone, UsersView, AuthButtons, userCollection, events, io) {
  'use strict';

  var HomeView = Backbone.View.extend({

    el: '#app',

    initialize: function () {

      // initialize login and signin buttons
      new AuthButtons()

      var usersView = new UsersView({collection: userCollection})
      usersView.render()

      // on logued connect socket with jwt
      events.on('logued', _ => io.reset())

    }

  })

  return HomeView
})