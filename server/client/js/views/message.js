define([
  'jquery', 
  'underscore', 
  'backbone', 
  'text!views/message.html', 
  'events'], 
  function ($, _, Backbone, template, events) {
  'use strict';

  var MessageView = Backbone.View.extend({

    tagName:  'div',

    template: _.template(template),

    render () {
      this.$el.html(this.template(this.model.toJSON()))
      return this
    }

  })

  return MessageView
})