/// <reference path="../_all.ts" />

module Search {

  'use strict';
  
  export class SuggestionAdapter {

    constructor(private $q) {
      
    }

    /**
     *
     *
     * @param address
     * @returns {IPromise<T>}
     */
    public getAddressSuggestion(address) {

      var deferred = this.$q.defer();
      var service = new google.maps.places.AutocompleteService();

      service.getQueryPredictions({input: address}, (response, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          return deferred.resolve(response);
        } else {
          return deferred.reject();
        }
      });

      return deferred.promise;
    }

    public static Factory() {

      var service = ($q) => {
        return new SuggestionAdapter($q);
      };

      service['$inject'] = ['$q'];
      return service;
    }
  }
}
