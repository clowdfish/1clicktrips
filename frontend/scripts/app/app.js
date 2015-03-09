(function() {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.index',
      'app.auth',
      'app.result',
      'app.search',
      'app.dashboard',
      'app.settings',
      'ngSanitize'
    ])
    .config(config)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY');

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

})();

