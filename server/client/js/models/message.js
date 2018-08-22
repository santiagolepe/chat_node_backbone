define(['backbone'], function (Backbone) {
  'use strict';

  var MessageModel = Backbone.Model.extend({

    defaults: {
      _id: '',
      date: new Date(),
      user: '',
      text: '',
      from: '',
      to: '',
    }

  })

  return MessageModel
})