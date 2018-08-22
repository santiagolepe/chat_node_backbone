define(['jquery', 'underscore', 'backbone', 'text!views/user.html', 'events'], 
  function ($, _, Backbone, template, events) {
  'use strict';

  var UserView = Backbone.View.extend({

    tagName:  'li',

    template: _.template(template),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render)
    },

    events: {
      'click .li-user': 'selectUser'
    },

    render () {
      this.$el.html(this.template(this.model.toJSON()))
      return this
    },

    selectUser: function (e) {
      events.trigger('selectChat', this.model.toJSON())
    }

  })

  return UserView
})