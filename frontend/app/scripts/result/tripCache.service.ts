/// <reference path="../_all.ts" />

module Result {

  'use strict';

  /**
  * Cache trip by using location.hash
  */
  export class TripCache {

    constructor(private $sessionStorage,
                private $location: ng.ILocationService) {

    }

    /**
     *
     *
     * @param tripKey
     * @param tripData
     */
    storeTrip(tripData, tripKey?) {
      if (_.isEmpty(tripData)) {
        throw new Error('Invalid trip data.');
      }

      var cacheKey = tripKey || this.$location.url();
      var key = TripCache.makeKey(cacheKey);
      this.$sessionStorage[key] = tripData;
    }

    /**
     *
     *
     * @param tripKey
     * @returns {any}
     */
    getCachedTrip(tripKey?) {

      var cacheKey = tripKey || this.$location.url();
      var key = TripCache.makeKey(cacheKey);

      if (!_.isEmpty(this.$sessionStorage[key])) {
        return this.$sessionStorage[key];
      }
      return null;
    }

    /**
     *
     *
     * @param locationString
     * @returns {string}
     */
    static makeKey(locationString) {
      return 'trip_cache_' + locationString;
    }

    clearCache() {
      var key = TripCache.makeKey(this.$location.url());
      delete this.$sessionStorage[key];
    }
  }
}
