(function() {

  'use strict';

  angular
    .module('app', [
      'app.index',
      'app.common',
      'app.result',
      'app.search',
      'app.dashboard',
      'app.settings',
      'pascalprecht.translate'
    ])
    .config(config)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY');

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

})();

