define([
  'jquery', 
  'underscore', 
  'backbone', 
  'models/room', 
  ],
  function ($, _, Backbone, RoomModel) {
  'use strict';

  var RoomCollection = Backbone.Collection.extend({
    
    model: RoomModel,

  })

  return new RoomCollection()
})