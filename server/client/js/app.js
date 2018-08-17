'use strict';

// initial configuration for requirejs
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '/scripts/jquery',
    underscore: '/scripts/underscore',
    backbone: '/scripts/backbone',
    text: '/scripts/text'
  }
});

require([
  'backbone',
  'views/home',
], function (Backbone, HomeView) {
  // Initialize the home view
  new HomeView()
})
