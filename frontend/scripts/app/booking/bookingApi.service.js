(function() {

  'use strict';

  angular
    .module('app.booking')
    .service('bookingApi', bookingApi);

  function bookingApi($http, $q, $sessionStorage, date) {

    var _this = this;
    /**
    * Available api:
    */

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

    this.removeShareTripData = removeShareTripData;

    /**
    * Get booking detail by id
    */
    this.getBookingById = getBookingById;

    /**
    * Real Booking. Non-deletable
    */
    this.requestRealBooking = requestRealBooking;

    /**
    * Just store the booking. Deletable
    */
    this.storeBooking = storeBooking;

    /**
    * Delete deletable booking
    */
    this.deleteBooking = deleteBooking;

    function setShareTripData(trip, searchData) {
      var key = makeStorageKey();
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

    function removeShareTripData() {
      var key = makeStorageKey();
      delete $sessionStorage[key];
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
        .get('/api/bookings')
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

      if(bookingItem.participants)
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
          .get('/api/booking/' + bookingId)
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

    function requestRealBooking(bookingData) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/booking/request', bookingData, {
            waitingMessage: 'Request booking...'
          })
          .success(function() {
            resolve();
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            })
          });
      });
    }

    function storeBooking(bookingData) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/booking/', bookingData, {
            waitingMessage: 'Save booking...'
          })
          .success(function() {
            resolve();
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            })
          });
      });
    }

    function deleteBooking(booking) {
      return $q(function(resolve, reject) {
        if (booking.booked) {
          reject();
        }
        $http
          .delete('/api/booking/' + booking.id)
          .then(function() {
            resolve();
          }, function() {
            reject();
          });
      });
    }

    return this;
  }

})();
