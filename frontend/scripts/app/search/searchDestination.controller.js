(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchDestinationFormCtrl', searchDestinationFormCtrl);

	function searchDestinationFormCtrl ($scope,
                                      $q,
                                      $rootScope,
                                      suggestionAdapter,
                                      googleMap) {

    /**
     * Initial data.
     */
    $scope.destination = $scope.$parent.destination;
    $scope.destinationLocation = $scope.$parent.destinationLocation;

    $scope.setDestination({
      description: $scope.destination,
      location: $scope.destinationLocation
    });

		$scope.getSuggestion = getSuggestion;
		$scope.selectDestinationSuggestion = selectDestinationSuggestion;

    $scope.$watch('destination', function(destination) {
      if (_.isEmpty(destination)) {
        $scope.setDestination(null);
      }
    });

    /**
     * Get suggestion for text input.
     *
     * @param {string} val - input source
     * @return {promise} - return a promise for typeahead
     */
    function getSuggestion(val) {
      return suggestionAdapter.getAddressSuggestion(val);
    }

    /**
     * Select suggestion and display on map.
     *
     * @param {object|string} $item - Suggestion object
     */
    function selectSuggestion($item) {
      var deferred = $q.defer();

      googleMap
        .geocode($item.description)
        .then(function(location) {
          deferred.resolve(location);
        });

      return deferred.promise;
    }

    function selectDestinationSuggestion($item) {
      selectSuggestion($item).then(function(location) {
        $scope.setDestination({
          description: $scope.destination,
          location: location
        });
        focusOnStartDate();
      }, function() {
      	$scope.setDestination(null);
      });
    }

    function focusOnStartDate() {
      $rootScope.$broadcast('openStartDatePicker');
    }
	}
})();
