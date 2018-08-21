define(['backbone'], function (Backbone) {
  'use strict';

  var SessionModel = Backbone.Model.extend({

    defaults: {
      logued: false,
      name: '',
      _id: ''
    }

  })

  return new SessionModel()
})