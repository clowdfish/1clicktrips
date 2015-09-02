(function() {

  'use strict';

  angular
    .module('app.info', [
      'app.core',
      'app.common'
    ])
    .config(interpolateConfig);

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
