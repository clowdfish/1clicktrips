/// <reference path="../../_all.ts" />

module Booking {

  'use strict';

  export class BookingApi {

		constructor(private $http,
								private $q,
								private $sessionStorage) {
		}

    /**
    * Store trip data
    */
    public setBookingData = (searchParams, selection, tripDetail) => {
      var key = BookingApi._makeStorageKey();
      this.$sessionStorage[key] = {};
      this.$sessionStorage[key]['trip'] = tripDetail;
      this.$sessionStorage[key]['searchParams'] = searchParams;
      this.$sessionStorage[key]['selection'] = selection;
    };

    /**
    * Get trip data from session storage
    */
    public getBookingData = () => {
      var key = BookingApi._makeStorageKey();
      if (typeof(this.$sessionStorage[key]) !== 'undefined') {
        return this.$sessionStorage[key];
      }
      return null;
    };

    public removeBookingData = () => {
      var key = BookingApi._makeStorageKey();
      delete this.$sessionStorage[key];
    };

    private static _makeStorageKey() {
      return 'bookingData';
    }
    
  }
}
