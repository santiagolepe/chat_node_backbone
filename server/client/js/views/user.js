define(['jquery', 'underscore', 'backbone', 'text!views/user.html'], 
  function ($, _, Backbone, template) {
  'use strict';

  var UserView = Backbone.View.extend({

    tagName:  'li',

    template: _.template(template),

    initialize: function () {
    },

    events: {
      'click .li-user': 'selectUser'
    },

    render () {
      this.$el.html(this.template(this.model.toJSON()))
      return this
    },

    selectUser: function (e) {
      console.log(e.target.textContent)
    }

  })

  return UserView
})