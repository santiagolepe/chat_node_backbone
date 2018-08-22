define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/auth/signin.html', 
  'services/auth',
  'bootstrap'
  ], 
  function ($, _, Backbone, template, auth) {
  'use strict';

  var SignView = Backbone.View.extend({

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
      var name = $('#name-signin').val()
      var email = $('#username-signin').val()
      var password = $('#password-signin').val()

      auth.signin({email, password, name})
        .then(_ => {
          this.undelegateEvents()
          $('#modal').modal('hide')
        })
        .catch(alert)
    }

  })

  return SignView
})