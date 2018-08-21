define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/auth/login.html', 
  'services/auth',
  'bootstrap'], 
  function ($, _, Backbone, template, auth) {
  'use strict';

  var LoginView = Backbone.View.extend({

    el: '#modal-el',

    events: {
      'submit': 'submit'
    },

    template: _.template(template),

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      return this
    },

    show: function () {
      $('#modal').modal('show')
    },

    submit: function (e) {
      e.preventDefault()
      var email = $('#email').val()
      var password = $('#password').val()
      auth.login(email, password)
        .then(_ => {
          this.undelegateEvents()
          $('#modal').modal('hide')
        })
        .catch(alert)
    }

  })

  return LoginView
})