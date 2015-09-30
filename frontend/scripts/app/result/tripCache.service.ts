/// <reference path="../../_all.ts" />

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
     * @param tripData
     */
    storeTrip(tripData) {
      if (_.isEmpty(tripData)) {
        throw new Error('Invalid trip data.');
      }

      var key = this.makeKey(this.$location.url());
      this.$sessionStorage[key] = tripData;
    }

    /**
     *
     *
     * @returns {any}
     */
    getCachedTrip() {
      var key = this.makeKey(this.$location.url());

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
    makeKey(locationString) {
      return 'trip_cache_' + locationString;
    }
  }
}
