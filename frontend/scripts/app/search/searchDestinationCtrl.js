(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchDestinationFormCtrl', searchDestinationFormCtrl);

	function searchDestinationFormCtrl ($scope, $q, SUGGESTION_TYPES, suggestionAdapter, googleMap) {

		$scope.setDestinationType = setDestinationType;
		$scope.getSuggestion = getSuggestion;
		$scope.selectDestinationSuggestion = selectDestinationSuggestion;

		//Destination type: address, event, meeting, company...
    $scope.destinationType = SUGGESTION_TYPES.address;
    $scope.destinationTypeArray = suggestionAdapter.getSuggestionType();

		function setDestinationType(item) {
        $scope.destinationType = item;
    }

    /**
    * Get suggestion for text input
    * @param {string} val - input source
    * @return {promise} - return a promise for typeahead
    */
    function getSuggestion(val) {
      return suggestionAdapter
              .getSuggestion(val, $scope.destinationType);
    }

    /**
    * Select suggestion and display on map
    * @param {object|string} $item - Suggestion object
    */
    function selectSuggestion($item) {
      var deferred = $q.defer();
      switch ($scope.destinationType) {
        case SUGGESTION_TYPES.address:
          googleMap
            .geocode($item.description)
            .then(function(location) {
              deferred.resolve(location);
            });
          break;
        case SUGGESTION_TYPES.events:
          deferred.resolve($item.location);
          break;
        case SUGGESTION_TYPES.meetingSpace:
          deferred.resolve($item.location);
          break;
        default:
          deferred.reject();
      }
      return deferred.promise;
    }

    function selectDestinationSuggestion($item) {
      selectSuggestion($item).then(function(location) {
        $scope.$parent.destinationLocation = location;
        $scope.$parent.isStep1Ready = true;
      }, function() {
      	$scope.$parent.isStep1Ready = false;
      });
    }

	}
})();
