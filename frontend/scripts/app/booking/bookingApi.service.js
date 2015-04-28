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
    this.transformResponseData = transformResponseData;

    /**
    * Store trip data
    */
    this.setShareTripData = setShareTripData;

    /**
    * Get trip data from session storage
    */
    this.getShareTripData = getShareTripData;

    function setShareTripData(trip) {
      $sessionStorage.shareTripData = trip;
    }

    function getShareTripData() {
      return $sessionStorage.shareTripData;
    }

    /**
    * Get booked trips
    */
    function getBookedTrips() {
      var deferred = $q.defer();
      $http
        .get('/api/account/bookings')
        .success(function(data) {
          var transformedData = _this.transformResponseData(data);
          deferred.resolve(transformedData);
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
    function transformResponseData(response) {
      for (var bookingId = 0; bookingId < response.length; bookingId++ ) {
        response[bookingId].startDate = date.stringToDate(response[bookingId].startDate);
        response[bookingId].endDate = date.stringToDate(response[bookingId].endDate);

        for (var participantId = 0;
              participantId < response[bookingId].participants.length;
              participantId++) {
          var arrivalTime = response[bookingId].participants[participantId].arrivalTime;
          response[bookingId].participants[participantId].arrivalTime = date.stringToDate(arrivalTime);
        }
      }
      return response;
    }

    return this;
  }

})();
