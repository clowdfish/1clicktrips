(function() {

  'use strict';

  angular
    .module('app.booking')
    .service('bookingApi', bookingApi);

  function bookingApi($http, $q, $sessionStorage, date) {

    var _this = this;

    /**
    * Get booked trips
    */
    this.getBookedTrips = getBookedTrips;

    /**
    * Format data from getBookedTrips
    */
    this.formatBookingItem = formatBookingItem;

    /**
    * Store trip data
    */
    this.setShareTripData = setShareTripData;

    /**
    * Get trip data from session storage
    */
    this.getShareTripData = getShareTripData;

    /**
    * Get booking detail by id
    */
    this.getBookingById = getBookingById;

    function setShareTripData(trip, searchData) {
      var key = makeStorageKey(trip.id);
      $sessionStorage[key] = {};
      $sessionStorage[key]['trip'] = trip;
      $sessionStorage[key]['search'] = searchData;
    }

    function getShareTripData() {
      var key = makeStorageKey();
      if (typeof($sessionStorage[key]) !== 'undefined') {
        return $sessionStorage[key];
      }
      return null;
    }

    function makeStorageKey() {
      return 'shareTripData';
    }

    /**
    * Get booked trips
    */
    function getBookedTrips() {
      var deferred = $q.defer();
      $http
        .get('/api/account/bookings')
        .success(function(data) {
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var item = _this.formatBookingItem(data[i]);
            result.push(item);
          }
          deferred.resolve(result);
        })
        .error(function() {
          deferred.reject();
        });
      return deferred.promise;
    }

    /**
    * Convert datetime string to datetime type
    * @params {Object} response - Raw response data
    * @return {Object}
    */
    function formatBookingItem(bookingItem) {
      bookingItem.startDate = date.stringToDate(bookingItem.startDate);
      bookingItem.endDate = date.stringToDate(bookingItem.endDate);

      for (var participantId = 0;
            participantId < bookingItem.participants.length;
            participantId++) {
        var arrivalTime = bookingItem.participants[participantId].arrivalTime;
        bookingItem.participants[participantId].arrivalTime = date.stringToDate(arrivalTime);
      }

      return bookingItem;
    }

    function getBookingById(bookingId) {
      return $q(function(resolve, reject) {
        $http
          .get('/api/account/bookings/' + bookingId)
          .success(function(data) {
            resolve(_this.formatBookingItem(data));
          })
          .error(function(data, status){
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    return this;
  }

})();
