define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
  'use strict';

  var UserModel = Backbone.Model.extend({

    defaults: {
      _id: 1,
      name: 'Octavio',
      active: false,
      socket: '',
      count: 0
    }

  })

  return UserModel
})