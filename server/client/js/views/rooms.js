define([
  'jquery', 
  'underscore', 
  'backbone', 
  'views/user', 
  'services/socket', 
  'models/session'
  ], 
  function ($, _, Backbone, UserView, io, session) {
  'use strict';

  var RoomsView = Backbone.View.extend({

    el: '.list-rooms',

    initialize: function () {

      // sync socket
      io.sync('new_room', room => {
        this.collection.add(room)
      }) 

      // add Public room
      this.collection.add({})

      this.listenTo(this.collection, 'add', this.addRoom)
    },

    render: function () {
      this.collection.each(this.addRoom, this)
    },

    addRoom: function (room) {
      var userView = new UserView({model: room})
      this.$el.append(userView.render().el)
    }

  })

  return RoomsView
})