(function() {

  'use strict';

  angular
    .module('app.result')
    .service('tripCache', tripCache);

  /**
  * Cache trip by using location.hash
  */
  function tripCache($sessionStorage, $location) {

    this.storeTrip = storeTrip;
    this.getCachedTrip = getCachedTrip;

    function storeTrip(tripData) {
      if (_.isEmpty(tripData)) {
        throw new Error('Invalid trip data.');
      }

      var key = makeKey($location.url());
      $sessionStorage[key] = tripData;
    }

    function getCachedTrip() {
      var key = makeKey($location.url());

      if (!_.isEmpty($sessionStorage[key])) {
        return $sessionStorage[key];
      }
      return null;
    }

    function makeKey(locationString) {
      return 'trip_cache_' + locationString;
    }
  }
})();
