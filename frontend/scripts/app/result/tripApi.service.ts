/// <reference path="../../_all.ts" />
module Result {

  'use strict';

  export class TripApi{
    constructor(private $http, 
                private $q: ng.IQService) {        
    }
    

    /**
     *
     *
     * @param searchObject
     * @returns {*}
     */
    getAvailableItineraries(searchObject) {
      var deferred = this.$q.defer();

      this
        .$http
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
        .success((response: any) => {
          // returns an array of trips
          var result = response.map((itinerary) => {
            return itinerary;
          });

          deferred.resolve(result);
        })
        .error((err) => {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /**
     *
     *
     * @param searchObject
     * @returns {*}
     */
    getTripUpdate(searchObject) {

      var deferred = this.$q.defer();

      this
        .$http
        .post('/api/search/trip-update', searchObject, {
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
        .success((response) => {
          // returns one trip object
          deferred.resolve(response);
        })
        .error((err) => {
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
    getTripDetails(searchObject) {
      var deferred = this.$q.defer();

      this
        .$http
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
        .success((response) => {
          // returns one trip object
          deferred.resolve(response);
        })
        .error((err) => {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /**
     * Calls the REST API to get all available hotels.
     */
    getAvailableHotels(searchObject) {
      var deferred = this.$q.defer();

      this
        .$http
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
        .success((hotels) => {
          deferred.resolve(hotels);
        })
        .error((err) => {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }
};
