(function() {

  'use strict';

  angular
    .module('app.result')
    .service('tripApi', tripApi);

  function tripApi($http, $q) {
    var _this = this;

    _this.getAvailableItineraries = getAvailableItineraries;
    _this.getTripDetails = getTripDetails;
    _this.getAvailableHotels = getAvailableHotels;

    /**
     *
     *
     * @param searchObject
     * @returns {*}
     */
    function getAvailableItineraries(searchObject) {
      var deferred = $q.defer();

      $http
        .post('/api/search/trips', searchObject, {
          activeMessages: [
            {
              title: "Searching for alternatives...",
              time: 3000
            },
            {
              title: "Creating routes...",
              time: 3000
            },
            {
              title: "Searching for flights...",
              time: 10000
            },
            {
              title: "Adding pricing information...",
              time: 3000
            },
            {
              title: "Adding timing information...",
              time: 3000
            },
            {
              title: "Optimizing routes...",
              time: 8000
            }
          ]
        })
        .success(function(response) {
          // returns an array of trips
          var result = response.map(function(itinerary) {
            return itinerary;
          });

          deferred.resolve(result);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /**
     * Calls the REST API to get the details for one specific itinerary.
     *
     * @param searchObject
     * @returns {*}
     */
    function getTripDetails(searchObject) {
      var deferred = $q.defer();

      $http
        .post('/api/search/trip-details', searchObject, {
          activeMessages: [
            {
              title: "Getting data from external resources...",
              time: 6000
            },
            {
              title: "Adding pricing information...",
              time: 2000
            },
            {
              title: "Adding timing information...",
              time: 2000
            },
            {
              title: "Optimizing routes...",
              time: 8000
            }
          ]
        })
        .success(function(response) {
          // returns one trip object
          deferred.resolve(response);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /**
     * Calls the REST API to get all available hotels.
     */
    function getAvailableHotels(searchObject) {
      var deferred = $q.defer();

      $http
        .post('/api/search/hotels', searchObject, {
          activeMessages: [
            {
              title: "Getting hotel data...",
              time: 3000
            },
            {
              title: "Filtering and prioritizing hotels...",
              time: 5000
            }
          ]
        })
        .success(function(hotels) {
          deferred.resolve(hotels);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }
})();
