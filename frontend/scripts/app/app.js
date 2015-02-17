(function() {
  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.result',
      'app.search',
      'app.dashboard'
    ])
    .config(config)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY');

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

  function run($rootScope) {
    $rootScope.T = T;
  }
})();