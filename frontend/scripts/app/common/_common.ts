/// <reference path="../../_all.ts" />

/**
* This module contains shared directive, filter, and service across the App
*/
module Common {

  'use strict';

  angular
    .module('app.common', ['ngFileUpload'])
    .constant('requestSpinnerEvents', {
      show: 'showRequestSpinner',
      hide: 'hideRequestSpinner'
    })
    .directive('button', Button.Factory())
    .directive('mapMarker', MapMarker.Factory())
    .directive('waitingAnimation', WaitingAnimation.Factory())
    .directive('dropzone', Dropzone.Factory())
    .service('spinnerInterceptor', SpinnerIntercepter.Factory())
    .filter('currencyFormatter', currencyFormatter)
    .filter('dateFormatter', dateFormatter)
    .filter('durationFormatter', durationFormatter)
    .filter('vehicleTypeToIcon', vehicleTypeToIcon)
    .service('browser', Browser)
    .service('currency', Currency)
    .service('googleMap', GoogleMap)
    .factory('language', Language.Factory())
    .service('inactivityDetector', InactivityDetector)
    .service('compatibilityChecker', CompatibilityChecker.Factory())
    .config(httpConfig)
    .run(run);

  function httpConfig($httpProvider) {
    $httpProvider.interceptors.push('spinnerInterceptor');
  }

  function run($rootScope) {

  }
}
