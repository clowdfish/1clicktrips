(function() {
  angular
    .module('app.search')
    .factory('suggestionAdapter', suggestionAdapter);

  function suggestionAdapter($http, $q, SUGGESTION_TYPES) {
    this.getSuggestionType = getSuggestionType;
    this.getSuggestion = getSuggestion;

    /**
    * Get suggestion types
    */
    function getSuggestionType() {
      return [
        SUGGESTION_TYPES.address,
        SUGGESTION_TYPES.events,
        SUGGESTION_TYPES.meetingSpace
      ]
    }

    /**
    * Get suggestion
    * @param {string} address - The address to get suggestion
    * @param {number} type - Suggestion type: address, event, meeting space, company, hotel
    * @return {Object[]} - array of object contains latitude and longitude of locations
    */
    function getSuggestion(text, type) {
      switch(type) {
        case SUGGESTION_TYPES.address:
          return getAddressSuggestion(text);
          break;
        case SUGGESTION_TYPES.events:
          return getEventSuggestion(text);
          break;
        case SUGGESTION_TYPES.meetingSpace:
          return getMeetingSpaceSuggestion(text);
          break;
        default:
          throw new Error("Invalid suggestion type");
          break;
      }
    }

    /**
    * Get address suggestion
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

    function getEventSuggestion(text) {
      var deferred = $q.defer();
      $http
        .get('/suggestion/event/' + text)
        .success(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function getMeetingSpaceSuggestion(text) {
      var deferred = $q.defer();
      $http
        .get('/suggestion/meeting_space/' + text)
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function(){
          deferred.reject()
        });
      return deferred.promise;
    }

    return this;

  }
})();