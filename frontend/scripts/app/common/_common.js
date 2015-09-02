/**
* This module contains shared directive, filter, and service across the App
*/
(function() {

  'use strict';

  angular
    .module('app.common', ['ngFileUpload'])
    .config(httpConfig)
    .run(run);

  function httpConfig($httpProvider) {
    $httpProvider.interceptors.push('spinnerInterceptor');
  }

  function run($rootScope) {

  }

})();