define([
  'backbone', 
  'models/message', 
  ],
  function (Backbone, MessageModel) {
  'use strict';

  var MessageCollection = Backbone.Collection.extend({
    
    model: MessageModel,

  })

  return MessageCollection
})