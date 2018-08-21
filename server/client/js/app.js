'use strict';

// initial configuration for requirejs
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery', 'popper']
    }
  },
  paths: {
    jquery: '/scripts/jquery',
    underscore: '/scripts/underscore',
    backbone: '/scripts/backbone',
    popper: '/popper',
    bootstrap: '/scripts/bootstrap',
    text: '/scripts/text',
    socket: '/scripts/socket.io'
  }
});

require([
  'backbone',
  'views/home',
], function (Backbone, HomeView) {
  // Initialize the home view
  new HomeView()
})
