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
    .directive('mapMarker', MapMarker.Factory())
    .directive('waitingAnimation', WaitingAnimation.Factory())
    .directive('dropzone', Dropzone.Factory())
    .directive('timeline', Timeline.Factory())
    .directive('timelineSegment', TimelineSegment.Factory())
    .directive('languageDropdown', languageDropdown)
    .directive('currencyDropdown', currencyDropdown)
    .service('spinnerInterceptor', SpinnerIntercepter.Factory())
    .filter('currencyFormatter', currencyFormatter)
    .filter('dateFormatter', dateFormatter)
    .filter('durationFormatter', durationFormatter)
    .filter('titleExtractor', titleExtractor)
    .filter('vehicleTypeToIcon', vehicleTypeToIcon)
    .service('browser', Browser)
    .service('googleMap', GoogleMap)
    .factory('currency', Currency.Factory())
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
