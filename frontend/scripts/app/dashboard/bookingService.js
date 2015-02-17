(function() {
  angular
    .module('app.dashboard')
    .service('bookingService', bookingService);

  function bookingService($http, $q) {
    var _this = this;

    this.getBookedTrips = getBookedTrips;

    function getBookedTrips() {
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

    return this;
  }
})();