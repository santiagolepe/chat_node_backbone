define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/auth/buttons.html', 
  'views/auth/login',
  'views/auth/signin',
  'events'
  ], 
  function ($, _, Backbone, template, Login, Signin, events) {
  'use strict';

  var LoginView = Backbone.View.extend({

    el: '.buttons-auth',

    template: _.template(template),

    events: {
      'click #login-btn': 'login',
      'click #signin-btn': 'signin'
    },

    initialize: function () {
      events.on('logued', _ => this.$el.html(''))
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      return this
    },

    login: function () {
      new Login().show()
    },

    signin: function () {
      new Signin().show()
    },

  })

  return LoginView
})