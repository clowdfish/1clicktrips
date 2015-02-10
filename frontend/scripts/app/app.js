(function() {
  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.result',
      'app.search'
    ])
    .config(config);

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();