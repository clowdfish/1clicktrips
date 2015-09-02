(function() {

  'use strict';

  angular
    .module('app.search')
    .factory('suggestionAdapter', suggestionAdapter);

  function suggestionAdapter($q) {

    this.getAddressSuggestion = getAddressSuggestion;

    /**
    * Get address suggestion.
     *
    * @param {string} address - The input text to get suggestion
    * @return {string[]|Object[]} - array of suggestion
    */
    function getAddressSuggestion(address) {

      var deferred = $q.defer();
      var service = new google.maps.places.AutocompleteService();

      service.getQueryPredictions({input: address}, function(response, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          deferred.resolve(response);
        } else {
          deferred.reject();
        }
      });

      return deferred.promise;
    }

    return this;
  }
})();
