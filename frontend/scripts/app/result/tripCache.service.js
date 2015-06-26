(function() {

  'use strict';

  angular
    .module('app.result')
    .service('tripCache', tripCache);

  /**
  * Cache trip by using location.hash
  */
  function tripCache($sessionStorage, $stateParams, $state, $location) {

    this.storeTrip = storeTrip;
    this.getCachedTrip = getCachedTrip;

    function storeTrip(tripData) {
      if (_.isEmpty(tripData)) {
        throw new Error('Invalid trip data');
      }
      var key = makeKey();
      $sessionStorage[key] = tripData;
    }

    function getCachedTrip() {
      var key = makeKey();
      if (!_.isEmpty($sessionStorage[key])) {
        return $sessionStorage[key];
      }
      return null;
    }

    function makeKey() {
      return 'trip_cache_' + $location.url();
    }

  }

})();
