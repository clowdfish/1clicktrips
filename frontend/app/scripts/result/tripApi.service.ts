/// <reference path="../_all.ts" />

module Result {

  'use strict';

  export class TripApi {

    constructor(private $http,
                private $q: ng.IQService,
                private $translate) {

    }

    /**
     *
     *
     * @param searchObject
     * @returns {*}
     */
    public getAvailableItineraries = (searchObject) => {
      var deferred = this.$q.defer();

      this.$http
        .post('/api/search/trips', searchObject, {
          activeMessages: [
            {
              title: this.$translate.instant("general.api.search.alternative"),
              time: 3000
            },
            {
              title: this.$translate.instant("general.api.search.routes"),
              time: 3000
            },
            {
              title: this.$translate.instant("general.api.search.flights"),
              time: 10000
            },
            {
              title: this.$translate.instant("general.api.search.pricing"),
              time: 3000
            },
            {
              title: this.$translate.instant("general.api.search.timing"),
              time: 3000
            },
            {
              title: this.$translate.instant("general.api.search.optimizing"),
              time: 8000
            }
          ]
        })
        .success((response: any) => {
          if (_.isEmpty(response)) {
            deferred.reject(this.$translate.instant("general.api.error.empty"));
          }

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
    };

    /**
     *
     *
     * @param searchObject
     * @returns {*}
     */
    public getTripUpdate = (searchObject) => {

      var deferred = this.$q.defer();

      this.$http
        .post('/api/search/trip-update', searchObject, {
          activeMessages: [
            {
              title: this.$translate.instant("general.api.search.data"),
              time: 6000
            },
            {
              title: this.$translate.instant("general.api.search.pricing"),
              time: 2000
            },
            {
              title: this.$translate.instant("general.api.search.timing"),
              time: 2000
            },
            {
              title: this.$translate.instant("general.api.search.optimizing"),
              time: 8000
            }
          ]
        })
        .success((response) => {
          if (_.isEmpty(response)) {
            deferred.reject(this.$translate.instant("general.api.error.empty"));
          }

          // returns one trip object
          deferred.resolve(response);
        })
        .error((err) => {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    /**
     * Calls the REST API to get the details for one specific itinerary.
     *
     * @param searchObject
     * @returns {*}
     */
    public getTripDetails = (searchObject) => {
      var deferred = this.$q.defer();

      this.$http
        .post('/api/search/trip-details', searchObject, {
          activeMessages: [
            {
              title: this.$translate.instant("general.api.search.data"),
              time: 6000
            },
            {
              title: this.$translate.instant("general.api.search.pricing"),
              time: 2000
            },
            {
              title: this.$translate.instant("general.api.search.timing"),
              time: 2000
            },
            {
              title: this.$translate.instant("general.api.search.optimizing"),
              time: 8000
            }
          ]
        })
        .success((response) => {
          if (_.isEmpty(response)) {
            deferred.reject(this.$translate.instant("general.api.error.empty"));
          }

          // returns one trip object
          deferred.resolve(response);
        })
        .error((err) => {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    /**
     * Calls the REST API to get all available hotels.
     */
    public getAvailableHotels = (searchObject) => {
      var deferred = this.$q.defer();

      this.$http
        .post('/api/search/hotels', searchObject, {
          activeMessages: [
            {
              title: this.$translate.instant("general.api.search.hotel"),
              time: 3000
            },
            {
              title: this.$translate.instant("general.api.search.filterhotel"),
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
    };

    /**
    * Create ics file from booking data.
    */
    public downloadTripPlan = (searchObject) => {
      return this.$q((resolve, reject) => {
        return this
          .$http
          .post('/api/search/trip-plan', searchObject, {
            activeMessages: this.$translate.instant("general.api.download.calendarfile")
          })
          .then(() => {
            location.href = '/api/search/trip-plan';
            return resolve();
          }, (err) => {
            return reject(err);
          })
      });
    }
  }
}
