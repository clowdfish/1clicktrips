(function() {
  angular
    .module('app.dashboard')
    .service('bookingService', bookingService);

  function bookingService($http, $q, date) {

    var _this = this;

    this.getBookedTrips = getBookedTrips;
    this.callBookingApi = callBookingApi;
    this.transformResponseData = transformResponseData;

    function getBookedTrips() {
      var deferred = $q.defer();
      this
        .callBookingApi()
        .then(function(data) {
          var transformedData = _this.transformResponseData(data);
          deferred.resolve(transformedData);
        }, function() {
          deferred.reject();
        });
      return deferred.promise;
    }

    function callBookingApi() {
      var deferred = $q.defer();
      $http
        .get('/api/account/bookings')
        .success(function(response) {
          deferred.resolve(response);
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