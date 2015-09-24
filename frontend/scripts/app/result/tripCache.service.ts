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
    
    storeTrip(tripData) {
      if (_.isEmpty(tripData)) {
        throw new Error('Invalid trip data.');
      }

      var key = this.makeKey(this.$location.url());
      this.$sessionStorage[key] = tripData;
    }

    getCachedTrip() {
      var key = this.makeKey(this.$location.url());

      if (!_.isEmpty(this.$sessionStorage[key])) {
        return this.$sessionStorage[key];
      }
      return null;
    }

    makeKey(locationString) {
      return 'trip_cache_' + locationString;
    }
  }
};
