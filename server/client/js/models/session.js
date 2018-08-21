define(['backbone'], function (Backbone) {
  'use strict';

  var SessionModel = Backbone.Model.extend({

    defaults: {
      logued: false,
      user: null
    }

  })

  return new SessionModel()
})