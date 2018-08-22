define(['backbone'], function (Backbone) {
  'use strict';

  var RoomModel = Backbone.Model.extend({

    defaults: {
      _id: 0,
      name: 'Public',
      active: false,
      socket: 'room_public',
      count: 0
    }

  })

  return RoomModel
})