/// <reference path="../_all.ts" />

module app {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.booking',
      'app.index',
      'app.search',
      'app.result',
      'app.info',
      'app.templates'
    ])
    .config(routeConfig)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY')
    .run(run);

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>'
    });
  }

  function run() {
    console.log("App started...");
  }
}

