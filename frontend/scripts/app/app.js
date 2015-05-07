(function() {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.core',
      'app.booking',
      'app.index',
      'app.auth',
      'app.result',
      'app.search',
      'app.dashboard',
      'app.settings',
      'app.templates'
    ])
    .config(config)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY')
    .run(run);

  function config($interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
    //$locationProvider.html5Mode(true);
  }

  function run(browser) {
    if (browser.isMobileDevice()) {
      FastClick.attach(document.body);
    }
  }

})();

