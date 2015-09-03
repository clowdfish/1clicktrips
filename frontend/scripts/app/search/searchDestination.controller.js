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

		$scope.getSuggestion = getSuggestion;
		$scope.selectDestinationSuggestion = selectDestinationSuggestion;

    $scope.$watch('destination', function(destination) {
      if (_.isEmpty(destination)) {
        setDestination(null);
      }
    });

    /**
     *
     *
     * @param options
     */
    function setDestination(options) {

      if(options == null) {
        $scope.$parent.schedule.destinationAddress = null;
        $scope.$parent.schedule.destination = null;
      }
      else {
        $scope.$parent.schedule.destinationAddress = options.description;
        $scope.$parent.schedule.destination = options.location;
      }
    }

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

    /**
     *
     *
     * @param $item
     */
    function selectDestinationSuggestion($item) {

      selectSuggestion($item).then(function(location) {

        setDestination({
          description: $scope.destination,
          location: location
        });

        focusOnTimeSelection();
      }, function() {
      	setDestination(null);
      });
    }

    function focusOnTimeSelection() {
      //$rootScope.$broadcast('openTimePicker');
    }
	}
})();
