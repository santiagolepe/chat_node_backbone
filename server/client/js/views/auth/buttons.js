define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/auth/buttons.html', 
  'views/auth/login'], 
  function ($, _, Backbone, template, Login) {
  'use strict';

  var LoginView = Backbone.View.extend({

    el: '.buttons-auth',

    template: _.template(template),

    events: {
      'click #login-btn': 'login',
      'click #signin-btn': 'signin'
    },

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      return this
    },

    login: function () {
      new Login().show()
    }

  })

  return LoginView
})