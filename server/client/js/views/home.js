define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/users', 
  'views/auth/buttons', 
  'collections/users'
], 
function ($, _, Backbone, UsersView, AuthButtons, userCollection) {
  'use strict';

  var HomeView = Backbone.View.extend({

    el: '#app',

    initialize: function () {

      // initialize login and signin buttons
      new AuthButtons()

      userCollection.add([{_id: 2, name: 'Jaimico'}, {_id: 3, name: 'Chamuco'}])
      var usersView = new UsersView({collection: userCollection})
      usersView.render()

    }

  })

  return HomeView
})