/**
* This module contains shared directive, filter, and service across the App
*/
(function() {

  'use strict';

  angular
    .module('app.common', [])
    .config(httpConfig);

  function httpConfig($httpProvider) {
    $httpProvider.interceptors.push('spinnerInterceptor');
  }

})();
