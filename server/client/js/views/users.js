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

  var UsersView = Backbone.View.extend({

    el: '.list-users',

    initialize: function () {

      io.sync('all_users', users => {
        this.collection.reset(users)
        this.render()
      }) 

      io.sync('join', user => {
        if (session.get('_id') === user._id) return
        this.collection.add(user)
      }) 

      io.sync('user_disconnect', socket => {
        this.collection.remove(this.collection.where({'socket': socket}))
      }) 

      this.listenTo(this.collection, 'add', this.addUser)
      this.listenTo(this.collection, 'remove', this.render)
    },

    render: function () {
      this.$el.html('')
      this.collection.each(this.addUser, this)
    },

    addUser: function (user) {
      var userView = new UserView({model: user})
      this.$el.append(userView.render().el)
    }

  })

  return UsersView
})